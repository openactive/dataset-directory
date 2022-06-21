import {rest} from 'msw'

export const handlers = [
    rest.get('https://opendata.leisurecloud.live/api/datacatalog',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(
                    {
                        "@context": "https://schema.org",
                        "@type": "DataCatalog",
                        "id": "https://opendata.leisurecloud.live/api/datacatalog",
                        "dataset": [
                            "https://api.activenewham.org.uk/OpenActive/",
                            "https://booking.1life.co.uk/OpenActive/"
                        ],
                        "datePublished": "2022-06-14T18:32:24.5134382+00:00",
                        "publisher": {
                            "type": "Organization",
                            "name": "Gladstone MRM Ltd",
                            "url": "https://www.gladstonesoftware.co.uk"
                        },
                        "license": "https://creativecommons.org/licenses/by/4.0/"
                    }
                ),
            )
        }),
    rest.get('https://openactivedatacatalog.legendonlineservices.co.uk/api/DataCatalog',
        (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(
                    {
                        "@context": "https://schema.org",
                        "@type": "DataCatalog",
                        "id": "https://openactivedatacatalog.legendonlineservices.co.uk/api/DataCatalog",
                        "datePublished": "2022-06-14T19:33:54.8304592+01:00",
                        "license": "https://creativecommons.org/licenses/by/4.0/",
                        "publisher": {
                            "type": "Organization",
                            "name": "Legend Club Management Systems (UK)",
                            "url": "https://www.legendware.co.uk"
                        },
                        "dataset": [
                            "https://halo-openactive.legendonlineservices.co.uk/OpenActive",
                            "https://blackburnwithdarwen-openactive.legendonlineservices.co.uk/OpenActive"
                        ]
                    }
                ),
            )
        }),
    // rest.get('https://openactive.io/data-catalogs/singular.jsonld',
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.status(200),
    //             ctx.json(
    //                 {
    //                     "@context": "https://schema.org/",
    //                     "@type": "DataCatalog",
    //                     "@id": "https://openactive.io/data-catalogs/singular.jsonld",
    //                     "name": "Singular datasets that are not included in other data catalogs",
    //                     "datePublished": "2020-02-20T08:55:19+00:00",
    //                     "license": "https://creativecommons.org/licenses/by/4.0/",
    //                     "publisher": {
    //                         "@type": "Organization",
    //                         "name": "OpenActive",
    //                         "url": "https://www.openactive.io/"
    //                     },
    //                     "dataset": [
    //                         "http://data.better.org.uk/",
    //                         "http://data.bookwhen.com/",
    //                     ]
    //                 }
    //             ),
    //         )
    //     }),
    // rest.get('https://app.bookteq.com/api/openactive/catalogue',
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.status(200),
    //             ctx.json(
    //                 {
    //                     "@context": "https:\/\/schema.org\/",
    //                     "@type": "DataCatalog",
    //                     "@id": "https:\/\/bookteq.com\/api\/openactive\/catalogue",
    //                     "license": "https:\/\/creativecommons.org\/licenses\/by\/4.0\/",
    //                     "name": "Bookteq Openactive Venues",
    //                     "publisher": {
    //                         "@type": "Organization",
    //                         "name": "Bookteq",
    //                         "url": "https:\/\/www.bookteq.com"
    //                     },
    //                     "dataset": [
    //                         "https:\/\/ealingboroughcouncil.bookteq.com\/api\/open-active\/3fea7124-d13e-4ce5-8032-d989fbbf671e",
    //                         "https:\/\/ealingboroughcouncil.bookteq.com\/api\/open-active\/614ce266-e603-487b-ac55-2c5bc7be2df1",
    //                     ]
    //                 }
    //             ),
    //         )
    //     }),
    rest.get('https://slowcoach.com',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    dataset: 'foobar',
                }),
                ctx.delay(4000)
            )
        }),
]
