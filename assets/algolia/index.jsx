import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import * as algoliaWidgets from 'instantsearch.js/es/widgets';
import { tnd_config } from '@params'

const config = tnd_config
const searchClient = algoliasearch(config.appid, config.apikey);

const search = instantsearch({
  indexName: config.indexname,
  searchClient,
});

let widgets = []
config.widgets.forEach(widget => {
  const widgetExist = require('./widgetExists.jsx')(widget)
  if(widgetExist){
    widgets.push(
      algoliaWidgets[widget.name](require('./widgetSettings.jsx')(widget))
    )
  } else {
    console.log(`No ${widget.name}`)
  }
});

search.addWidgets(widgets);

search.start();