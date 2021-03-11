import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import * as algoliaWidgets from 'instantsearch.js/es/widgets';
import { tnd_config } from '@params'

const searchClient = algoliasearch(tnd_config.appid, tnd_config.apikey);

const search = instantsearch({
  indexName: tnd_config.indexname,
  searchClient,
});

let widgets = []
tnd_config.widgets.forEach(widget => {
  if(widget.js) {
    if(projectWidgets[widget.js] !== 'undefined'){
      widget = {
        ...widget,
        ...projectWidgets[widget.js]
      }
    }
  }
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