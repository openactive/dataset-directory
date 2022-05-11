import { rest } from 'msw'

export const handlers = [
    rest.get('https://opendata.leisurecloud.live/api/datacatalog',
          (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    foo: 'bar1',
                }),
            )
        }),
    rest.get('https://openactivedatacatalog.legendonlineservices.co.uk/api/DataCatalog',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    foo: 'bar2',
                }),
            )
        }),
    rest.get('https://openactive.io/data-catalogs/singular.jsonld',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    foo: 'bar3',
                }),
            )
        }),
    rest.get('https://app.bookteq.com/api/openactive/catalogue',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    foo: 'bar4',
                }),
            )
        }),
    rest.get('https://slowcoach.com',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    foo: 'bar5',
                }),
                ctx.delay(4000)
            )
        }),
]
