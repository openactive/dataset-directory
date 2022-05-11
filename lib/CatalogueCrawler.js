import axios from 'axios'

async function publisherCatalogue(publisherUrl) {
    // console.log("timeout="+process.env.REMOTE_API_RESPONSE_TIMEOUT)
    try {
        const response = await axios.get(publisherUrl, {"timeout": process.env.REMOTE_API_RESPONSE_TIMEOUT});
        return {
            "foo": response.data.foo
        }
    } catch (error) {
        //console.error(error);
        // throw new Error(error)
        return {"error": error}

        //TODO (maybe) handle response timeouts, connection timeout, and http error codes separately?
        //https://stackoverflow.com/questions/36690451/timeout-feature-in-the-axios-library-is-not-working
    }
}

export async function crawl(json) {
    const datasets = json.hasPart.map( async publisherUrl => {
        return await publisherCatalogue(publisherUrl)
    });
    return await Promise.all(datasets)
}
