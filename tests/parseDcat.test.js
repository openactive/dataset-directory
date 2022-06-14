import * as filesystem from 'fs';
import {parse} from '../lib/DatasetSiteMetadataParser';
import {test, expect} from "@jest/globals";

test('Extracts dcat and other metadata fields from dataset site response', async () => {
    expect.assertions(1);
    const response = filesystem.readFileSync('./tests/fixtures/DatasetSiteFixture.html', "utf8");
    await expect(parse(response)).toEqual(
        expect.objectContaining(
            {
                Description: "unnamespaced description from content property",
                "Keywords": "List, Of, Keywords, From, Content, Property",
                "dcat:keyword":
                    expect.arrayContaining(["Sessions", "Facilities", "Activities", "Sports", "Physical Activity", "OpenActive",]),
                "dct:accrualPeriodicity": "Every minute",
                "dct:created": "17/05/2022 11:19:46 +00:00",
                "dct:description": "Dct description from textContent",
                "identifier": "https://api.activenewham.org.uk/OpenActive/",
                "language": "English",
                "odrs:contentLicense": "Creative Commons Attribution Licence (CC-BY v4.0)",
                "odrs:dataLicense": "Creative Commons Attribution Licence (CC-BY v4.0)",
                "og:description": "OG description from content property",
                "og:image": "https://res.cloudinary.com/gladstone/image/upload/ActiveNewham-live/xrflwvvlidyd3b3w9l3g",
                "og:locale": "en_GB",
                "og:title": "OG title",
                "title": "unnamespaced title"
            }
        ))
});

