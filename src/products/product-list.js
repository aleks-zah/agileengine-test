import React, { Component } from 'react';
import Product from './product';

export default class ProductList extends Component {
  render() {
    const { products } = this.props;

    if (products.length === 0) {
      return (
        <div>There is no products in system yet, click add product</div>
      )
    }

    return (
      <div className="product-list-row">
        {products.map(product => <Product {...product} key={product.id || Math.random()} />)}
      </div>
    )
  }
}
