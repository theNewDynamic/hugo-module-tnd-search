# TND Search Hugo Module

This module serve the two following purposes:

- [x] Phase 1: Produce an index endpoint on your site
- [x] Phase 2: Produce the JS front end search with Algolia.
- [ ] Phase 3: Produce the JS front end search with other services

## Requirements

Requirements:
- Go 1.14
- Hugo 0.60.0

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
homepage: 
  - HTML
  - tnd_search
  # + any other outputs needed on the homepage.
```
# Backend

## Building the index

User can control which entries go the index, and how their data is structured.

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

User can add or overwrite entries, but not delete keys from the default set above.

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

If `algolia` is set the `objectID` key will be added to every entry.

# FrontEnd

## Using Algolia

### App Settings

```yaml
tnd_search:
  algolia:
    indexName: default
    appId: GMXXXXXXXQW
    apiKey: 027xxxxxxxxxxxxxxxxxxxxxxxxx53e
```

### Registering Components

Each components must be 
1. registered in the module using the methods described below.
2. Added to your template with an id matching its lowercase `name` parameter or optional `container` parameter

#### Register widgets settings

Components option keys are matching Aloglia's own except for `cssClasses` which is shorttened to `classes`.

For example, in order to add a simple Search Box and Hits:

```yaml
tnd_search:
  widgets:
  - name: searchBox
    placeholder: 'Search now!'
    classes:
      root: 'search__box mb-8'
      input: 'bg-transparent border-none w-full text-3xl'
  - name: hits
    classes:
      root: 'bg-white'
      list: 'list-reset'
```

Templates can also be customized through yaml using the componenent available keys:

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

Many options are better handled through Javascript. In order to use javascript language to complement your widget options you need to:

1. Create a javascript file at `/assets/tnd-search/algolia/widgets.js` which export a `tndAlgoliaWidgets` variable as such:

```js
export let tndAlgoliaWidgets = {
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

2 add a `js` key to your component yaml regisrering with a value matching a `tndAlgoliaWidgets` key.

```yaml
- name: hits
  [...]
  js: hitsCustom
```




## theNewDynamic

This project is maintained and love by [thenewDynamic](https://www.thenewdynamic.com).
