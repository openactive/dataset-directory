import * as Fixture from './fixtures/DataCatalogFixtures'
import {server} from './mocks/server.js'
import {jest} from '@jest/globals'
import {test, expect, beforeAll, beforeEach, afterEach, afterAll} from "@jest/globals";
import {crawl} from '../lib/CatalogueCrawler';

//set up mocked API endpoints, responses configured in mocks/handlers.js
//environment variables for tests are set in /tests/setEnvVars.js
beforeAll(() => server.listen())
beforeEach(() => jest.resetModules())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// test('Traverse one level through catalog links to retrieve dataset property', async () => {
//     expect.assertions(1);
//     await expect(crawl(Fixture.DCAT_RESPONSE)).resolves.toEqual(
//         [
//             "https://api.activenewham.org.uk/OpenActive/",
//             "https://booking.1life.co.uk/OpenActive/",
//             "https://chelmsfordcitysports.leisurecloud.net/OpenActive/",
//             "https://halo-openactive.legendonlineservices.co.uk/OpenActive",
//             "https://blackburnwithdarwen-openactive.legendonlineservices.co.uk/OpenActive",
//             "https://lifeleisure-openactive.legendonlineservices.co.uk/OpenActive",
//             "http://data.better.org.uk/",
//             "http://data.bookwhen.com/",
//             "http://data.letsride.co.uk/",
//             "https://ealingboroughcouncil.bookteq.com/api/open-active/3fea7124-d13e-4ce5-8032-d989fbbf671e",
//             "https://ealingboroughcouncil.bookteq.com/api/open-active/614ce266-e603-487b-ac55-2c5bc7be2df1",
//             "https://ealingboroughcouncil.bookteq.com/api/open-active/92c8385b-a099-4186-ad9e-07fce9fe9e23"
//         ]
//     );
// });

//See parseDcat.test for full metadata parsing and formatting - below test is an integration test that should be kept lite for robustness
test('Follow dcat dataset links to retrieve dataset site metadata', async () => {
    expect.assertions(1);
    await expect(crawl(Fixture.DCAT_RESPONSE_SHORT)).resolves.toEqual(
        expect.arrayContaining([
            expect.objectContaining({title: "unnamespaced title"}),
            expect.objectContaining({title: "1Life Sessions and Facilities  - Open Data"}),
            expect.objectContaining({title: "Halo Sessions and Facilities  - Open Data"}),
            expect.objectContaining({title: "BwD Leisure Sessions and Facilities  - Open Data"})
        ])
    );
});

test('Responses that timeout contain an error property', async () => {
    expect.assertions(1);
    await expect(crawl(Fixture.DCAT_RESPONSE_WITH_DELAY)).resolves.toEqual(
        expect.arrayContaining([
            expect.objectContaining({title: "unnamespaced title"}),
            expect.objectContaining({title: "1Life Sessions and Facilities  - Open Data"}),
            expect.objectContaining({error: expect.any(String)}),
            expect.objectContaining({title: "Halo Sessions and Facilities  - Open Data"}),
            expect.objectContaining({title: "BwD Leisure Sessions and Facilities  - Open Data"})
        ])
    );
});

