This is a template repo. To start.

search `{moduleName}` through the project and replace it with the module identifier (ex: `socials` for `hugo-module-tnd-socials`)

# {moduleName} Hugo Module

(intro)

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
  - path: github.com/theNewDynamic/hugo-module-tnd-{moduleName}
```

## Usage

### Some Partial/Feature

#### Examples

### Settings

Settings are added to the project's parameter under the `tnd_{moduleName}` map as shown below.

```yaml
# config.yaml
params:
  tnd_{moduleName}:
    [...]
```

#### Configure Key 1

#### Configure Key 2

#### Defaults

ld copy/paste the above to your settings and append with new extensions.

## theNewDynamic

This project is maintained and love by [thenewDynamic](https://www.thenewdynamic.com).