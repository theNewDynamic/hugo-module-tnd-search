import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import * as algoliaWidgets from 'instantsearch.js/es/widgets';
import { connectStats } from 'instantsearch.js/es/connectors';

const config = JSON.parse(tndConfig)

const searchClient = algoliasearch(config.appid, config.apikey);

const search = instantsearch({
  indexName: config.indexname,
  searchClient,
});
console.log(config)

let widgets = []
config.widgets.forEach(widget => {
  const widgetExist = require('./widgetExists.jsx')(widget)
  if(widgetExist){
    widgets.push(
      algoliaWidgets[widget.name](require('./widgetSettings.jsx')(widget))
    )
  }
});

search.addWidgets(widgets);

search.start();