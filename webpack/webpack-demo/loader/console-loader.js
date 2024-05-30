module.exports = function (content) {
  return handleConsole(content)
}
 
function handleConsole(content) {
  return content.replace(/console.log\(['|"](.*?)['|"]\)/, '')
}
