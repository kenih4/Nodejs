
//  node geturl.js

//   npm i sync-request

var request = require('sync-request');

function myFunction() {
//  var response = getContent('http://saclaopr19.spring8.or.jp/~summary/display_ui.html?sort=main_id%20desc&limit=0,1');
  var response = getContent('http://www.yahoo.co.jp');

  var myRegexp = /<body>([\s\S]*?)<\/body>/i;
//  var myRegexp = /<title>([\s\S]*?)<\/title>/i;
  var match = myRegexp.exec(response);
  var title = match[1];
  title = title.replace(/(^\s+)|(\s+$)/g, '');
    

    console.log(title);

  return;
}

function getContent(url) {
  var response = '';

//  request(url, function(error, response, body) {
//    response = body;
//  });
  response = request('GET', url);

//  return response;
  return response.body;
}

console.log(myFunction());

