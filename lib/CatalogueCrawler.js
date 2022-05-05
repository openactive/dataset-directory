import axios from 'axios'

async function publisherCatalogue(publisherUrl) {
    try {
        const response = axios.get(publisherUrl);
        return response
    } catch (error) {
        console.error(error);
    }
}

export async function crawl(json) {
    const datasets = json.hasPart.map( async publisherUrl => {
        const res = await publisherCatalogue(publisherUrl)
        return res.data.foo
    });
    return await Promise.all(datasets)
}
