import 'dotenv/config'
import express from "express";
import axios from 'axios'
import {crawl} from './lib/CatalogueCrawler.js'

const app = express()
const port = process.env.PORT || 3000

const axiosInstance = axios.create({
    baseURL: 'https://openactive.io/data-catalogs'
})

app.get('/datasets', async (req, res) => {
    try {
        // const response = await axiosInstance.get("https://openactive.io/data-catalogs/data-catalog-collection.jsonld")
        const response = await crawl("https://openactive.io/data-catalogs/data-catalog-collection.jsonld")
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
