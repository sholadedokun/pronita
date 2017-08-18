import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Loading extends Component {
    render() {
        const shouldRender = (typeof this.props.products!=="undefined") ? <ComposedComponent {...this.props} /> : <div className="loading">Loading</div>;
        console.log(this.props)
        return (
            shouldRender
        )

    }
  }

  return Loading;
}
