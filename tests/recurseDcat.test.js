import * as Fixture from './Fixtures'
import { server } from './mocks/server.js'
import {jest} from '@jest/globals'
import { crawl } from '../lib/catalogueCrawler';

//set up mocked API endpoints, responses configured in mocks/handlers.js
//environment variables for tests are set in /tests/setEnvVars.js
beforeAll(() => server.listen())
beforeEach(() => jest.resetModules())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Traverse one level through catalog links', async () => {
    expect.assertions(1);
    await expect(crawl(Fixture.DCAT_RESPONSE)).resolves.toEqual([{'foo': 'bar1'}, {'foo': 'bar2'}, {'foo': 'bar3'}, {'foo': 'bar4'}]);
});

test('Responses that timeout contain an error property', async () => {
    expect.assertions(1);
    await expect(crawl(Fixture.DCAT_RESPONSE_WITH_DELAY)).resolves.toEqual(
        expect.arrayContaining([
            expect.objectContaining({foo: 'bar1'}),
            expect.objectContaining({error: expect.any(Error)}),
            expect.objectContaining({foo: 'bar3'})
        ])
);
});

