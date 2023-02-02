# OpenActive Crawler
This API endpoint returns a single json list of all the official openactive data feeds.

It follows the process defined [here](https://openactive.io/data-catalogs/)

In summary:
  * reads a catalog file: https://openactive.io/data-catalogs/data-catalog-collection.jsonld
  * traverses the list of publisher catalogues in 'hasPart' to locate the dataset sites in the publishers' catalogues
  * retrieves the jsonld metadata as described in each dataset site
  * returns a list of datasets in a similar format to [before](https://openactive.io/datasets/directory.json)

Note: The format of the output is not finalised. The original output was used to populate the initial verion of the OpenActie status page. The status page is being redeveloped and in time the output of this crawler may be updated.

There is some very simple timeout and publisher API error handling

**Entry point to code:** app.js

# Running locally

1. `git clone https://github.com/openactive/dataset-directory.git` 
2. `cd dataset-directory`
3. `npm install`

# Start app locally
```
node app.js
```
You should now see the output at http://localhost:3000/datasets

# Run tests
```
npm test
```

# Deploy
Currently deployed via Heroku.
Follow the deploy using heroku git instructions [here](https://dashboard.heroku.com/apps/dataset-directory/deploy/heroku-git)

The deployed endpoint is visible at:
https://dataset-directory.herokuapp.com/datasets 
