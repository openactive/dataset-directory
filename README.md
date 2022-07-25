This little API reads a DCAT catalog file (currently hardcoded to be the [openactive dcat endpoint](https://openactive.io/data-catalogs/data-catalog-collection.jsonld); traverses the list of publisher catalogues in 'hasPart' to locate the datasets in the publishers catalogue; retrieves the dataset metadata as described in the dataset site, and returns a list of datasets

There is some very simple timeout and publisher API error handling

Entry point to code: app.js
Main classes:  CatalogueCrawler - traverses the lists of datasets; DatasetSiteMetadataParser - for a given dataset site, extract the metadata, returning a dataset object.


TODO
- Introduce recursion: according to the DCAT spec, the url of a dataset _could_ in theory be another catalogue

Start app locally
```
node app.js
```
Should  then be available at localhost:3000/datasets

Run tests
```
npm test
```


Deploy
Deployment to Heroku (which is where it's deployed at time of writing Jun 2022). Assuming you have a `main` branch and a git remote called `heroku`, and you're logged into heroku via the CLIx
```
git push heroku main
```
