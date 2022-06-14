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

test('Traverse one level through catalog links to retrieve dataset property', async () => {
    expect.assertions(1);
    await expect(crawl(Fixture.DCAT_RESPONSE)).resolves.toEqual([{'dataset': 'bar1'}, {'dataset': 'bar2'}, {'dataset': 'bar3'}, {'dataset': 'bar4'}]);
});

test('Responses that timeout contain an error property', async () => {
    expect.assertions(1);
    await expect(crawl(Fixture.DCAT_RESPONSE_WITH_DELAY)).resolves.toEqual(
        expect.arrayContaining([
            expect.objectContaining({dataset: 'bar1'}),
            expect.objectContaining({error: expect.any(Error)}),
            expect.objectContaining({dataset: 'bar3'})
        ])
    );
});

