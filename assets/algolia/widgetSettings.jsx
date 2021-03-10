module.exports = function widgetSettings(widget) {
  const hitsTemplates = require('./templates.jsx').hits
  const id = widget.name.toLowerCase()
  const container = `#${id}`
  let settings = {
    container,
    cssClasses: widget.classes,
    templates: widget.name == 'hits' ? hitsTemplates : {}
  }
  if(widget.name == 'searchBox') {
    settings = {
      ...settings,
      placeholder: widget.placeholder ? widget.placeholder : 'Search'
    }
  }

  return settings
}