var loadJS = function(url)
{
  var elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.src = url;
  document.body.appendChild(elem);
}

module.exports = loadJS;
