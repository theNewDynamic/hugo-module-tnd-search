# TND Search Hugo Module

In the future, this module will serve the two following purposes:

1. Produce an index endpoint on your site
2. Produce the JS searchs script for several services.

For now, only 1. is addressed.

## Requirements

Requirements:
- Go 1.14
- Hugo 0.61.0


## Installation

If not already, [init](https://gohugo.io/hugo-modules/use-modules/#initialize-a-new-module) your project as Hugo Module:

```
$: hugo mod init {repo_url}
```

Configure your project's module to import this module:

```yaml
# config.yaml
module:
  imports:
  - path: github.com/theNewDynamic/hugo-module-tnd-search
```

## Building the index

User can control which entries go the index, and how their data is structured.

### Targeting indexed entries with GetEntries.

By default, the Module pulls every regular pages from the site using `site.RegularPages`. In order to limit or extend this returned collection, one should create a returning partial on the project at `layouts/partials/tnd-search/data/entries`.

#### Limit index entries to posts.

```
{{/* layouts/partials/tnd-search/data/entries.html */}}
{{ return where site.RegularPages "Type" "posts" }}
```

#### Remove entries from index if private is set to true

```
{{/* layouts/partials/tnd-search/data/entries.html */}}
{{ $entries := where site.RegularPages }}
{{ $entries = where $entries ".Params.private" "!=" true }}
{{ return $entries }}
```

### Structuring indexed entries with AddToEntry

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

User can add or overwrite entries, but not delete keys from the default set above.

#### Add a custom summary or default summary

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
params:
  - custom_summary
  - city
  - topics
```

#### Configure Key 2

#### Defaults

ld copy/paste the above to your settings and append with new extensions.

## theNewDynamic

This project is maintained and love by [thenewDynamic](https://www.thenewdynamic.com).