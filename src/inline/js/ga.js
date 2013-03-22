(function (doc, tag, js, where) {
  js = doc.createElement(tag),
  where = doc.getElementsByTagName(tag)[0];
  js.async = true;
  js.src = '//www.google-analytics.com/ga.js';
  _gaq = [['_setAccount', 'UA-39537509-1'], ['_trackPageview'], ['_trackPageLoadTime']];
  setTimeout(function () {
    where.parentNode.insertBefore(js, where);
  }, 0);
}(document, 'script'));
