var tripleSlashExp = /src="\/\/\/(.+?)"/;
var isBuilding = typeof window === 'undefined';

var escMap = {
  '\n': "\\n",
  '\r': "\\r",
  '\u2028': "\\u2028",
  '\u2029': "\\u2029"
};

var esc = function (string) {
  return ('' + string)
    .replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
      if ("'\"\\".indexOf(character) >= 0) {
        return "\\" + character;
      } else {
        return escMap[character];
      }
    });
};

var joinRoot = isBuilding ?
  function(url) { return '/resources/' + url; } :
  function(url) {
    return steal.joinURIs(System.baseURL + 'resources/', url);
  };

exports.translate = function(load) {
  var source = load.source;
  if(tripleSlashExp.test(source)) {
    load.source = source.replace(tripleSlashExp, function(str, loc) {
      return 'src="' + joinRoot(loc) + '"';
    });
  }

  return "define(['can/view/stache/stache'],function(stache){" +
    "return stache(\"" + esc(load.source) + "\")" +
    "})";
};
