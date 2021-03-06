import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { history as historyRouter } from 'instantsearch.js/es/lib/routers';
import { simple as simpleMapping } from 'instantsearch.js/es/lib/stateMappings';
import * as algoliaWidgets from 'instantsearch.js/es/widgets';
import { tnd_config } from '@params'

const searchClient = algoliasearch(tnd_config.appid, tnd_config.apikey);

let settings = {
  indexName: tnd_config.indexname,
  searchClient,

}
// If routing is true, we complement settings with those two.
if(tnd_config.routing){
  settings = {
    ...settings,
    routing: {
      router: historyRouter(),
      stateMapping: simpleMapping()
    },
  }
}
// If startEmpty is true, we complement settings a custom searchFunction
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
// if tndAlgoliaSettings object export is found at /assets/tnd-search/algolia/settings.js 
// we spread its content on top of current settings.
if(tndAlgoliaSettings){
  console.log(typeof tndAlgoliaSettings)
  settings = {
    ...settings,
    ...tndAlgoliaSettings
  }
}
const search = instantsearch(settings);

let widgets = []
tnd_config.widgets.forEach(widget => {
  if(widget.js) {
    // if tndAgoliaWidgets object export is found at /assets/tnd-search/algolia/widgets.js 
    // we spread its content on top of current widget settings.
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