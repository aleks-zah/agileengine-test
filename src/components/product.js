import React, { Component } from 'react';
import './product.css';

export default class Product extends Component {
  render() {
    const { name, color } = this.props;

    return (
      <div className="product">
        <div className="product-attribute">Name: <strong>{name}</strong></div>
        <div className="product-attribute">Color: <span className="color" style={{ backgroundColor: color }} /></div>
      </div>
    )
  }
}
