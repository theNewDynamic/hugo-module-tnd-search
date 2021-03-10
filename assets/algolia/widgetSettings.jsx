module.exports = function widgetSettings(widget) {
  const hitsTemplates = require('./templates.jsx').hits
  const container = require('./widgetGetContainer.jsx')(widget)
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

  if(widget.name == 'refinementList') {
    
    settings = {
      ...settings,
      attribute: widget.attribute
    }
  }

  return settings
}