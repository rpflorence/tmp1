/** @jsx React.DOM */

var React = require('react');
var PaginationButton = require('./pagination-button');
var store = require('../store');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      coursesLoaded: false,
      links: {},
      courses: []
    };
  },

  componentDidMount: function() {
    store.fetchLastCourses(this.setStateAfterCourses);
  },

  setStateAfterCourses: function(courses, links) {
    this.setState({
      coursesLoaded: true,
      courses: courses,
      links: links
    });
  },

  handlePaginationButton: function(url) {
    store.fetch(url, this.setStateAfterCourses);
  },

  renderCourseListItems: function() {
    return this.state.courses.map(function(course) {
      var href = "/course/"+course.id;
      return <li><a href={href}>{course.name}</a></li>;
    });
  },

  renderPagination: function() {
    return this.state.links.map(function(link) {
      return <PaginationButton
        onClick={this.handlePaginationButton}
        url={link.url}>{link.rel}
      </PaginationButton>;
    }, this);
  },

  render: function() {
    if (!this.state.coursesLoaded) {
      return <div className="container">Loading...</div>;
    }
    return (
      <div className="container">
        <ul>
          {this.renderCourseListItems()}
        </ul>
        {this.renderPagination()}
      </div>
    );
  }
});

