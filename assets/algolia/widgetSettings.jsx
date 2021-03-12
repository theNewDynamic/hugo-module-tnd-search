module.exports = function widgetSettings(widget) {
  const container = require('./widgetGetContainer.jsx')(widget)
  let settings = {
    ...widget,
    container,
    cssClasses: widget.classes,
  }

  return settings
}