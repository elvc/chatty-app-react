import React, { Component } from 'react';

export default class Counter extends Component {
  render() {
    return (
      <span className='navbar-count'>{ this.props.userCount } user(s) online</span>
    );
  }
}