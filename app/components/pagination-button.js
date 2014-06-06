/** @jsx React.DOM */

var React = require('react');
var page = require('page');

module.exports = React.createClass({
  handleClick: function(event) {
    this.props.onClick(this.props.url);
  },

  render: function() {
    return <button onClick={this.handleClick}>{this.props.children}</button>;
  }
});

