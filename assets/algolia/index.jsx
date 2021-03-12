import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import * as algoliaWidgets from 'instantsearch.js/es/widgets';
import { tnd_config } from '@params'

const searchClient = algoliasearch(tnd_config.appid, tnd_config.apikey);

let settings = {
  indexName: tnd_config.indexname,
  searchClient,
}

if(tnd_config.startempty) {
  settings = {
    ...settings,
    searchFunction(helper) {
      if (helper.state.query === '') {
        // empty query string -> hide the search results & abort the search
        document.body.classList.add('tnd-search-empty-query')
        return;
      } else {
        document.body.classList.remove('tnd-search-empty-query')
      }
      helper.search();
    },
  }
}
const search = instantsearch(settings);

let widgets = []
tnd_config.widgets.forEach(widget => {
  if(widget.js) {
    if(tndAgoliaWidgets[widget.js] !== 'undefined'){
      widget = {
        ...widget,
        ...tndAgoliaWidgets[widget.js]
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