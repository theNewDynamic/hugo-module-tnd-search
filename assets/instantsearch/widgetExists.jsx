module.exports = function widgetExists(widget){
  let selector = require('./widgetGetContainer.jsx')(widget)
  return document.querySelector(selector)
}