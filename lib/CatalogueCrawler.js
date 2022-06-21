import axios from 'axios'
import {parse} from './DatasetSiteMetadataParser'

async function publisherCatalogue(publisherUrl) {
    try {
        const response = await axios.get(publisherUrl, {"timeout": process.env.REMOTE_API_RESPONSE_TIMEOUT});
        const datasetSites = response.data.dataset.map(datasetSiteUrl => {
                return axios.get(datasetSiteUrl, {"timeout": process.env.REMOTE_API_RESPONSE_TIMEOUT})
            }
        )
        return await Promise.all(datasetSites)
    } catch (error) {
        return {"publisherUrl": publisherUrl,
            "error": "error with publisher catalogue or one of its sub-datasets, probably a timeout: " + error
        }

        //(maybe) handle response timeouts, connection timeout, and http error codes separately?
        //https://stackoverflow.com/questions/36690451/timeout-feature-in-the-axios-library-is-not-working
    }
}

export async function crawl(json) {
    const datasetSites = json.hasPart.map(async publisherUrl => {
        return publisherCatalogue(publisherUrl)
    });
    const resolved = (await Promise.all(datasetSites)).flat()
    return resolved.map(site => (!site.error) ? parse(site.data) : site)
}
