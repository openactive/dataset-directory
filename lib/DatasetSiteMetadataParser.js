import {parseHTML} from 'linkedom';

export function parse(pageSource) {
    const { document } = parseHTML(pageSource);
    const metadataByClass = [...document.getElementsByClassName("metadata")] // trick: use js spread operator to convert HtmlCollection to Array
    const metadataByTag = [...document.getElementsByTagName("meta")] // trick: use js spread operator to convert HtmlCollection to Array

    const metadata = metadataByTag.concat(metadataByClass)
    let metadataObj = {};
    metadata.forEach(item => {
        const prop = item.getAttribute("property") || item.getAttribute("name");
        const content = item.getAttribute("content") || item.textContent

        //special handling for non-standard properties, otherwise read content property
        if (prop == "dcat:keyword") {
            let keywords = metadataObj["dcat:keyword"] || []
            // console.log(item.textContent)
            metadataObj[prop] = keywords.concat(item.textContent)
        } else if (prop == "dcat:distribution") {
            //ignore for now
        } else if (prop) { //ignore nulls, which are non-standard meta tags like 'charset' which don't interest us
            metadataObj[prop] = content
        }
    })
    return metadataObj;
}
