import 'dotenv/config'
import express from "express";
import axios from 'axios'
import { Handler } from "htmlmetaparser";
import { Parser } from "htmlparser2";

function extractJSONLDfromHTML(url, html) {
    let jsonld = null;

    const handler = new Handler(
        (err, result) => {
            if (!err && typeof result === 'object') {
                const jsonldArray = result.jsonld;
                // Use the first JSON-LD block on the page
                if (Array.isArray(jsonldArray) && jsonldArray.length > 0) {
                    [jsonld] = jsonldArray;
                }
            }
        },
        {
            url, // The HTML pages URL is used to resolve relative URLs. TODO: Remove this
        },
    );

    try {
        // Create a HTML parser with the handler.
        const parser = new Parser(handler, {
            decodeEntities: true,
        });
        parser.write(html);
        parser.end();

        //console.log(jsonld)
        return jsonld;
    }
    catch (error) {
        console.log("Error parsing dataset site: " + url);
    }

}

async function crawl(dataCatalogUrl) {
    console.log('1 Calling ' + dataCatalogUrl)
    try {
        // Get all datasets on load
        const collection = await axios.get(dataCatalogUrl);

        if (collection.data && collection.data.hasPart) {

            const datasetUrls = (await Promise.all(collection.data.hasPart.map(async url => {

                console.log('2 Calling ' + url)
                try {
                    return await axios.get(url, {
                        timeout: 20000
                    });
                }
                catch (error) {
                    console.log("Error getting dataset site catalogue: " + url);
                    return null;
                }
            }))).filter(x => x).flatMap(x => x.data.dataset);

            const datasetSites = (await Promise.all(datasetUrls.map(async url => {
                console.log('3 Calling ' + url)
                try {
                    return extractJSONLDfromHTML(url, (await axios.get(url, {
                        timeout: 20000
                    })).data)
                }
                catch (error) {
                    console.log("Error getting dataset site: " + url);
                }
            })))

            const datasets = datasetSites.flatMap(site => (

                (site?.distribution ?? []).map(x => ({
                    title: site?.name ?? [],
                    datasetsiteurl: site.url,
                    discussionurl: site.discussionUrl,
                    feedtype: x.name,
                    dataurl: x.contentUrl,
                    publishername: site.publisher.name,
                    licenseurl: site.license,
                    publish: true
                })
                )))

           // console.log("Got all dataset sites: " + JSON.stringify(datasets, null, 2));

            return datasets
        }
    }
    catch (error) {
        console.error(error.stack);
        process.exit(1);
    }
}

const app = express()
const port = process.env.PORT || 3000

const axiosInstance = axios.create({
    baseURL: 'https://openactive.io/data-catalogs'
})

app.get('/datasets', async (req, res) => {
    try {
        const response = await crawl("https://openactive.io/data-catalogs/data-catalog-collection.jsonld")
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
