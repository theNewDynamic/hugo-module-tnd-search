# TND Search Hugo Module

This module serve the two following purposes:

- [x] Phase 1: Produce an index endpoint on your site
- [x] Phase 2: Produce the JS front end search with Algolia/InstantSearch.js
- [x] Phase 3: Cater for MeiliSearch with InstantSearch.js

TND Search adds tooling for site search. It takes care of
1. [Building an index to feed to your search service](#backend)
2. [Building the front of your search](#frontend) with [InstantSearch.js](https://www.algolia.com/doc/api-reference/widgets/js/) for either [Algolia](https://www.algolia.com/) or [MeiliSearch](https://www.meilisearch.com/)

## Requirements

Requirements:
- Go 1.14
- Hugo 0.82.0

## Quick setup

Make sure your project has been `init` as a module.

## 1. Add module to your project's imports:

```yaml
# config.yaml
module:
  imports:
    - path: github.com/theNewDynamic/hugo-module-tnd-search
```

### 2. Add search index output format to homepage

__Through configuration.__
```yaml
# config.yaml

outputs:
  homepage: 
    - HTML
    - tnd_search
    # + any other outputs needed on the homepage.
```
OR __through homepage's Front Matter__

```yaml
# content/_index.md
title: Homepage
outputs: 
  - HTML
  - tnd_search
  # + any other outputs needed on the homepage.
```
# Backend

## Building the index

User can control which search entries go the index, and how their data is structured.

### Targeting indexed entries with `data/entries` returning partial.

By default, the Module include in the index every regular pages from the site using `site.RegularPages`. In order to limit or extend this returned collection, one should create a returning partial on the project at `layouts/partials/tnd-search/data/entries`.

#### Examples: 
##### Limit index entries to posts.

```
{{/* layouts/partials/tnd-search/data/entries.html */}}
{{ return where site.RegularPages "Type" "posts" }}
```

##### Remove entries from index if private is set to true

```
{{/* layouts/partials/tnd-search/data/entries.html */}}
{{ $entries := where site.RegularPages }}
{{ $entries = where $entries ".Params.private" "!=" true }}
{{ return $entries }}
```

### Structuring entries data

User can control how each entry data is structured before being published in the index. There is two approaches to this. The `params` settings described below or by adding some partials to your projects.

By default, the data will be:
```json
{
  "created": "2019-10-10T08:37:57Z",
  "draft": false,
  "objectID": "ce3d65cdd6e3ced2e7e012d452ba289e",
  "permalink": "http://mywebsite.com/products/gembucket-workshop/",
  "relpermalink": "/products/gembucket-workshop/",
  "title": "Gembucket workshop",
  "type": "products",
  "updated": "2019-10-10T08:37:57Z"
}
```

User can add entries or overwrite the above object's entries, but not delete keys from the default set above.

### Customizing entry data structure with settings
One can add to the default entry structure using the `params` module settings.

### Customizing entry data structure with `data/entry`

To Add data to the aforementioned default entry data structure, one should create a returning partial on the project at `layouts/partials/tnd-search/data/entry`.

#### Examples

##### Add a custom summary or default summary

```
{{/* layouts/partials/tnd-search/data/entry.html */}}
{{ $s := newScratch }}
{{ $s.Set "item" dict }}
{{ with .Params.search_summary }}
  {{ $s.SetInMap "item" "search_summary" . }}
{{ else }}
  {{ $s.SetInMap "item" "search_summary" .Summary }}
{{ end }}

{{ return $s.Get "item" }}
```

### Settings

Settings are added to the project's parameter under the `tnd_search` map as shown below.

```yaml
# config.yaml
params:
  tnd_search:
    [...]
```

#### params (array)

The params array lists which page's parameter should be added to the entry in the index. This allow user to add some custom parameters without the need of a returning partial.

```yaml
tnd_search: 
  params:
    - custom_summary
    - city
    - topics
```

#### service (string)

Only `algolia` and `meili` are supported.

#### primary_key (string) | default "id" (or "objectID" if service is set to algolia)

When building your index, the module will store a unique identifier under this reserved key.


# Frontend

The Module uses [InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/) to bandle the frontend of the search.

## Usage

### tnd-search/instantsearch/tags

This partial is to be loaded in your template to invoke the script(s). It takes a slice as parameter listing the scripts by their names. Anything but a slice as parameter will load all the scripts.

```
{{ partial "tnd-search/instantsearch/tags" (slice "default" "videos") }}
```
### Registering search scripts

As the module supports multiple search integration (one for your video gallery, one for your main site search etc...). The `instansearch` key of the module settings takes a list of scripts with their own settings.

The `name` key defines the value by which they will be identified when using the `tnd-search/instantsearch/tags` partial.

Four parameters are required, `name`, `indexName`, `appId`, and `apiKey`.

#### Using Algolia as service:
```yaml
tnd_search:
  instantsearch:
  - name: main
    indexName: default
    appId: GMXXXXXXXQW
    apiKey: 027xxxxxxxxxxxxxxxxxxxxxxxxx53e
```

#### Using Meilisearch as service:
```yaml
tnd_search:
  instantsearch:
  - name: main
    indexName: default
    appId: https://test.search.com
    apiKey: 027xxxxxxxxxxxxxxxxxxxxxxxxx53e
```

#### Available settings for scripts:

- `hitsPerPage`
- `distinct`
- `clickAnalytics`
- `enablePersonalization`
- `attributesToSnippet`
- `snippetEllipsisText`

### Registering InstantSearch.js widgets on scripts

Each widget must be 
1. registered in the module using the methods described below.
2. Added to your template with an id matching its lowercase `name` parameter or optional `container` parameter

#### Register widgets settings

Widget's `name` key should match the name of the InstantSearch.js widget.
Widget option keys are matching InstantSearch.js's own except for `cssClasses` which is shorttened to `classes`.

For example, in order to add a simple Search Box and Hits:

```yaml
tnd_search:
  instantsearch:
  - name: default
    # [indexName, appId etc...]
    widgets:
    - name: searchBox
      placeholder: 'Search now!'
      classes:
        root: 'search__box mb-8'
        input: 'bg-transparent border-none w-full text-3xl'
    - name: hits
      container: '#search-hits'
      classes:
        root: 'bg-white'
        list: 'list-reset'
```

The Module will then mount the [`searchBox` widget](https://www.algolia.com/doc/api-reference/widgets/search-box/js/) on your template's `<div id="searchbox"></div>` element and the [`hits` widget](https://www.algolia.com/doc/api-reference/widgets/hits/js/) on your template's `<div id="search-hits"></div>` element with provided settings.


Even widget templates can be customized through `yaml` using the widget available template keys and [Hogan.js](http://twitter.github.io/hogan.js/) syntax:

```yaml
- name: hits
  classes:
    root: 'bg-white'
    list: 'list-reset'
  templates:
    item: |
      <a class="flex justify-between border border-red-500 mb-4 px-8 py-2" href="{{ relpermalink }}">
        <div>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</div>
        <div>{{ type }}</div>
      </a>
    empty: |
      <span class="block border-b border-black px-8 py-2">No results</span>
```


#### Complementing options through Javascript

Many options are better handled through Javascript. In order to use javascript language to complement your widget `yaml` options you need to:

1. Create a javascript file at `/assets/tnd-search/instantsearch/widgets.js` which exports a `tndWidgets` object as such:

```js
export let tndWidgets = {
  hitsCustom: {
    transformItems(items) {
      return items.map(item => ({
        ...item,
        type: item.type.toUpperCase(),
      }));
    },
  }
}
```

2 add a `js` key to your widget yaml regisrering with a value matching a `tndWidgets` object's key.

```yaml
- name: hits
  # [...]
  js: hitsCustom
```

## theNewDynamic

This project is maintained and love by [thenewDynamic](https://www.thenewdynamic.com).
