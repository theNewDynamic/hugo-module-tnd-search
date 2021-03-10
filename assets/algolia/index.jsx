import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import * as algoliaWidgets from 'instantsearch.js/es/widgets';

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
  console.log(widget.name)
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