import { entry } from './templates/entry.js';
import { facet } from './templates/facet.js';
import { tnd_search_data } from '@params';
let itemsjs = require("itemsjs")

const input = document.getElementById('tnd-search-input');
const resultsContainer = document.getElementById('tnd-search-results')
const facetsContainer = document.getElementById('aggregations')
let itemsjs_results = []
const aggregations = {
  type: {
    container: '#agreg-type',
    title: 'Types',
    size: 10
  },
  instructors: {
    container: '#agreg-instructor',
    title: 'Instructors',
    size: 10
  },
}

const search_params = {
    per_page: 100,
    // full text search
    // query: 'forrest gump',
    query: ""
}
if(input) {
  input.addEventListener('change', tnd_refresh_query);
}

itemsjs = itemsjs(tnd_search_data, {
  searchableFields: ['title', 'type'],
  aggregations
});
itemsjs_results = itemsjs.search(search_params)
tnd_refresh_hits()
tnd_refresh_facets()


function tnd_refresh_query(e){
  itemsjs_results = itemsjs.search({
    ...search_params,
    query: e.target.value
  })
  tnd_refresh_hits()
  tnd_refresh_facets()
}
function tnd_refresh_facets() {
  facetsContainer.innerHTML = ''
  Object.entries(itemsjs_results.data.aggregations).map(([key,value]) => {
    facetsContainer.innerHTML += facet(key, value)
  })
  document.querySelectorAll('.facet-item').forEach(item => {
    item.addEventListener('click', (e) => {
      console.log(e.target.id)
    })
  })
}

function tnd_refresh_hits() {

  resultsContainer.innerHTML = ''
  itemsjs_results.data.items.forEach(item => {
    resultsContainer.innerHTML += entry(item)
  });
}
