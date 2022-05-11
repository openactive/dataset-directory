import 'dotenv/config'
const express = require('express')
const axios = require('axios')

const app = express()
const port = process.env.PORT || 3000

const axiosInstance = axios.create({
    baseURL: 'https://openactive.io/data-catalogs'
})

app.get('/datasets', async (req, res) => {
    try {
        const response = await axiosInstance.get("https://openactive.io/data-catalogs/data-catalog-collection.jsonld")
        res.status(200).json(response.data.hasPart);
    } catch (err) {
        console.log(err.response.status);
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
