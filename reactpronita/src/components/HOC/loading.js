import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Loading extends Component {
    render() {
        const shouldRender = (typeof this.props.products!=="undefined") ? <ComposedComponent {...this.props} /> : <div className="loading">Loading</div>;

        return (
            shouldRender
        )

    }
  }

  return Loading;
}
