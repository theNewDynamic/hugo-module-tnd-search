# TND Search Hugo Module

In the future, this module will serve the two following purposes:

1. Produce an index endpoint on your site
2. Produce the JS searchs script for several services.

For now, only 1. is addressed.

## Requirements

Requirements:
- Go 1.14
- Hugo 0.61.0


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

## theNewDynamic

This project is maintained and love by [thenewDynamic](https://www.thenewdynamic.com).