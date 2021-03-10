module.exports = {
  hits: {
    item: `
    <a class="block border-b border-black px-8 py-2" href="{{ relpermalink }}">
      {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
    </a>
    `,
    empty:`
      <span class="block border-b border-black px-8 py-2">No results</span>
    `
    }
}