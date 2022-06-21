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

//See parseDcat.test for full metadata parsing and formatting - below test is an integration test that should be kept lite for robustness
test('Follow dcat dataset links to retrieve dataset site metadata', async () => {
    expect.assertions(1);
    await expect(crawl("https://openactive.io/data-catalogs/data-catalog-collection.jsonld")).resolves.toEqual(
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
    await expect(crawl("https://openactive.io/data-catalogs/data-catalog-with-delay.jsonld")).resolves.toEqual(
        expect.arrayContaining([
            expect.objectContaining({title: "unnamespaced title"}),
            expect.objectContaining({title: "1Life Sessions and Facilities  - Open Data"}),
            expect.objectContaining({error: expect.any(String)}),
            expect.objectContaining({title: "Halo Sessions and Facilities  - Open Data"}),
            expect.objectContaining({title: "BwD Leisure Sessions and Facilities  - Open Data"})
        ])
    );
});

