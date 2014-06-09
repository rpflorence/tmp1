/** @jsx React.DOM */

var React = require('react');
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
      return <li><a href={"/course/"+course.id}>{course.name}</a></li>;
    });
  },

  renderPaginationButton: function(link) {
    return <button
      onClick={this.handlePaginationButton.bind(this, link.url)}
      url={link.url}
    >{link.rel}</button>;
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
        {this.state.links.map(this.renderPaginationButton)}
      </div>
    );
  }
});

