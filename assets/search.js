const input = document.getElementById('tnd-search-input');
const container = document.getElementById('tnd-search-results')
if(input) {
  itemsjs = itemsjs(tnd_search_data, {
    searchableFields: ['title']
  });
  input.addEventListener('change', tnd_search);
}

function tnd_search(e) {
  var results = itemsjs.search(
    {
      per_page: 10,
      // full text search
      // query: 'forrest gump',
      query: e.target.value
    }
  )
  container.innerHTML = ''
  results.data.items.forEach(item => {
    container.innerHTML += `<li><a href="${item.relpermalink}">${item.title}</a></li>`;
  });
 
  
}