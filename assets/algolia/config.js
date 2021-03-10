export default {
  indexName: 'report',
  appId: "JWGU0SLUDQ",
  apiKey: "39a4e38787029796436421fe52631fb2",

  strings: {
    video: "Video",
    'video-education': "Lesson Plan",
    articles: "Article",
    series: "Series",
    'multi-media': "Multi-Media",
    'mini-doc': 'Mini-Doc',
  },

  // We group all our class declarations there
  // They will be passed on to components as `:class-names="classes.searchBox"`
  classes: {
    searchBox: {
      'root': 'search__box',
      'input': 'outline-none bg-transparent border-none w-full text-3xl',
      'form': 'relative p-4 mb-0',
      'submit': 'hidden',
      'submitIcon': 'fill-current',
      'reset': 'hidden'
    },
    hits: {
      'root': 'bg-white',
      'list': 'list-reset',
    },
    pagination: {
      'ais-Pagination': 'py-2 mt-8 -mx-1 text-black',
      'ais-Pagination-list': 'list-reset',
      'ais-Pagination-item': 'text-xl text-black inline-block align-middle mx-1 py-2 px-4',
      'ais-Pagination-item--previousPage': 'text-3xl text-black',
      'ais-Pagination-item--nextPage': 'text-3xl text-black',
      'ais-Pagination-item--selected': 'border-solid border-yellow',
      'ais-Pagination-item--disabled': 'text-grey',
      'ais-Pagination-link': 'text-current no-underline'
    },
    menu: {
      'ais-Menu': 'mt-8 mb-4 text-sm',
      'ais-Menu--noRefinement': 'hidden',
      'ais-Menu-list': 'flex flex-wrap justify-start list-reset',
      'ais-Menu-item': 'px-4 py-2 text-black border-solid mr-1 border-yellow',
      'ais-Menu-item--selected': 'bg-yellow',
      'ais-Menu-link': 'text-black no-underline'
    },
    poweredBy: {
      'ais-PoweredBy': 'mt-8'
    }
  }
}