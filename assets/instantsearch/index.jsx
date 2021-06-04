// Hugo injects the dynamic import statements itself by replacing the following with the generated list
import dynamicImports from 'hugo'

//Permanent imports
import instantsearch from 'instantsearch.js'
import { tnd_config } from '@params'

// The 'widgetGeneratedList' string wil be replaced by the used widgets, ex: { searchBox, hits, clearRefinements, refinementList, configure }
import widgetGeneratedList from 'instantsearch.js/es/widgets';
const usedWidgets = widgetGeneratedList

// Depending if user uses Data file or Params for config, casing won't be consistent...
const indexName = typeof tnd_config.indexName != "undefined" ? tnd_config.indexName : tnd_config.indexname
const appId = typeof tnd_config.appId != "undefined" ? tnd_config.appId : tnd_config.appid
const apiKey = typeof tnd_config.apiKey != "undefined" ? tnd_config.apiKey : tnd_config.apikey
const startEmpty = typeof tnd_config.startEmpty != "undefined" ? tnd_config.startEmpty : tnd_config.startempty

let searchClient
if (tnd_config.service == "algolia") {
  searchClient = algoliasearch(appId, apiKey);
} else {
  let meiliSettings = {}
  searchClient = instantMeiliSearch(appId, apiKey, meiliSettings)
}

let settings = {
  indexName,
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
if(startEmpty) {
  settings = {
    ...settings,
    searchFunction(helper) {
      if (helper.state.query === '') {
        // empty query string -> hide the search results & abort the search
        document.body.classList.add('tnd-search-empty-query')
        document.body.classList.remove('tnd-search-filled-query')
      } else {
        document.body.classList.remove('tnd-search-empty-query')
        document.body.classList.add('tnd-search-filled-query')
      }
      helper.search();
    },
  }
}


// if tndAlgoliaSettings object export is found at /assets/tnd-search/instantsearch/settings.js 
// we spread its content on top of current settings.
if(typeof tndSettings !== "undefined"){
  settings = {
    ...settings,
    ...tndSettings
  }
}
const search = instantsearch(settings);

let widgets = []
tnd_config.widgets.forEach(widget => {
  if(widget.js) {
    // if tndWidgets object export is found at /assets/tnd-search/instantsearch/widgets.js 
    // we spread its content on top of current widget settings.
    if(tndWidgets[widget.js] !== 'undefined'){
      widget = {
        ...widget,
        ...tndWidgets[widget.js]
      }
    }
  }
  const widgetExist = require('./widgetExists.jsx')(widget)
  if(widgetExist){
    widgets.push(
      usedWidgets[widget.name](require('./widgetSettings.jsx')(widget))
    )
  } else {
    console.log(`No ${widget.name}`)
  }
});
//  attributesToSnippet: ['description:50'],
//snippetEllipsisText: '...',
let configureSettings = {}
const allowedSettings = [
  "hitsPerPage",
  "distinct",
  "clickAnalytics",
  "enablePersonalization",
  "attributesToSnippet",
  "snippetEllipsisText"
]
allowedSettings.map(item => {
  if(typeof tnd_config[item] !== "undefined"){
    return configureSettings = {
      ...configureSettings,
      [item]: tnd_config[item]
    }
  }
})
widgets.push(usedWidgets.configure(configureSettings))

search.addWidgets(widgets);

search.start();