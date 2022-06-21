import {rest} from 'msw'
import filesystem from "fs";

export const handlers = [
    rest.get('https://api.activenewham.org.uk/OpenActive/',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(
                    filesystem.readFileSync('./tests/fixtures/DatasetSiteActiveNewhamFixture.html', "utf8")
                )
            )
        }),
    rest.get('https://booking.1life.co.uk/OpenActive/',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(
                    filesystem.readFileSync('./tests/fixtures/DatasetSite1LifeFixture.html', "utf8")
                )
            )
        }),
    rest.get('https://halo-openactive.legendonlineservices.co.uk/OpenActive',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(
                    filesystem.readFileSync('./tests/fixtures/DatasetSiteHaloFixture.html', "utf8")
                )
            )
        }),
    rest.get('https://blackburnwithdarwen-openactive.legendonlineservices.co.uk/OpenActive',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(
                    filesystem.readFileSync('./tests/fixtures/DatasetSiteBlackburnFixture.html', "utf8")
                )
            )
        })
    // rest.get('https://blackburnwithdarwen-openactive.legendonlineservices.co.uk/OpenActive',
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.status(200),
    //             ctx.json(
    //                 filesystem.readFileSync('./tests/fixtures/DatasetSiteDummyFixture.html', "utf8")
    //             )
    //         )
    //     }),
    // rest.get('http://data.better.org.uk/',
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.status(200),
    //             ctx.json(
    //                 filesystem.readFileSync('./tests/fixtures/DatasetSiteDummyFixture.html', "utf8")
    //             )
    //         )
    //     }),
    // rest.get('http://data.bookwhen.com/',
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.status(200),
    //             ctx.json(
    //                 filesystem.readFileSync('./tests/fixtures/DatasetSiteDummyFixture.html', "utf8")
    //             )
    //         )
    //     }),
    // rest.get('https:\/\/ealingboroughcouncil.bookteq.com\/api\/open-active\/3fea7124-d13e-4ce5-8032-d989fbbf671e',
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.status(200),
    //             ctx.json(
    //                 filesystem.readFileSync('./tests/fixtures/DatasetSiteDummyFixture.html', "utf8")
    //             )
    //         )
    //     }),
    // rest.get('https:\/\/ealingboroughcouncil.bookteq.com\/api\/open-active\/614ce266-e603-487b-ac55-2c5bc7be2df1',
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.status(200),
    //             ctx.json(
    //                 filesystem.readFileSync('./tests/fixtures/DatasetSiteDummyFixture.html', "utf8")
    //             )
    //         )
    //     })
]
