/** @jsx React.DOM */

var React = require('react');
var store = require('../store')

module.exports = React.createClass({

  getInitialState: function() {
    return {
      loaded: false,
      enrolled: false,
      course: {}
    };
  },

  componentDidMount: function() {
    store.fetch('/courses/'+this.props.id, this.setStateAfterFetch);
  },

  setStateAfterFetch: function(course) {
    this.setState({ loaded: true, course: course });
  },

  enroll: function() {
    this.setState({enrolled: true});
    var data = {type: 'student', 'user': {'name': 'Test User'}};
    store.post('/courses/'+this.state.course.id+'/enrollments', data);
  },

  renderEnrollment: function() {
    if (this.state.enrolled) {
      return <p><b>You are enrolled in this course</b></p>;
    } else {
      return <button onClick={this.enroll}>enroll</button>
    }
  },

  render: function() {
    if (!this.state.loaded) {
      return <div className="container"><h1>Loading...</h1></div>;
    }
    var course = this.state.course;
    return (
      <div className="container">
        <h1>{course.name}</h1>
        <h2>{course.code}</h2>
        <p>{course.description}</p>
        {this.renderEnrollment()}
      </div>
    );
  }
});

