//var request = require('browser-request');
var $ = require('jquery');

exports.fetch = fetch;
exports.post = post;
exports.fetchLastCourses = fetchLastCourses;

var DATA = {
  host: 'http://canvas-api.herokuapp.com/api/v1',
  token: null,
  lastCoursesUrl: '/courses',
  cache: {},
  metas: {}
};

function getToken(cb) {
  if (DATA.token) {
    return cb(DATA.token);
  }
  $.ajax({
    type: 'post',
    url: DATA.host+'/tokens'
  }).then(function(res) {
    DATA.token = res.token;
    setupHeaders();
    getToken(cb);
  });
}

function setupHeaders() {
  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token '+DATA.token);
    }
  });
}

function fetchLastCourses(cb) {
  fetch(DATA.lastCoursesUrl, cb);
}

function post(url, data) {
  $.ajax({
    url: DATA.host+url,
    type: 'post',
    data: JSON.stringify(data),
    dataType: 'json'
  });
};

function fetch(url, cb) {
  url = url.replace(DATA.host, '');
  if (DATA.cache[url]) {
    return cb(DATA.cache[url], DATA.metas[url]);
  }
  if (!DATA.token) {
    return getToken(function() {
      fetch(url, cb);
    });
  }
  $.ajax(DATA.host+url).then(function(res, statusText, xhr) {
    DATA.cache[url] = res;
    // this is lame, should make "fechCourses" and "fetchCourse"
    // methods, then I'd just know™ to do the links and the last url
    extractLinks(url, xhr);
    if (Array.isArray(res)) {
      DATA.lastCoursesUrl = url;
    }
    fetch(url, cb);
  });
}

function extractLinks(url, xhr) {
  var links = xhr.getResponseHeader('Link');
  if (!links) return;
  DATA.metas[url] = parseLinks(links);
}

function parseLinks(links) {
  return links.split(',').map(function(link) {
    var url = link.match(/<(.+)>/)[1];
    var rel = link.match(/rel="(.+)"/)[1];
    return {rel: rel, url: url};
  });
}

