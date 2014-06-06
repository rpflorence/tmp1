/** @jsx React.DOM */

var React = require('react');
var List = require('./components/list');
var Course = require('./components/course');
var page = require('page');

page('/', function() {
  React.renderComponent(<List/>, document.body);
});

page('/course/:id', function(ctx) {
  React.renderComponent(<Course id={ctx.params.id} />, document.body);
});

page();

