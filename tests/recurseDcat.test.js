import * as Fixture from './Fixtures'
import { server } from './mocks/server.js'

import { crawl } from '../lib/catalogueCrawler';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Traverse one level through catalog links', async () => {
    expect.assertions(1);
    await expect(crawl(Fixture.DCAT_RESPONSE)).resolves.toEqual(['bar1', 'bar2', 'bar3', 'bar4']);
});
