module.exports = function widgetGetContainer(widget){
  let container = `#${widget.name.toLowerCase()}`
  if(widget.container){
    container = widget.container
  }
  return container
}