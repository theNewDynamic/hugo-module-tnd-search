module.exports = function widgetExists(widget){
  const id = widget.name.toLowerCase()
  return document.getElementById(id)
}