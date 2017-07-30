import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withState, compose } from 'recompose';
import logo from './logo.svg';
import ProductList from './components/product-list';
import NewProductModal from './components/modal';
import { fetchProducts } from './components/reducer';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchProducts())
  }

  render() {
    const { products, setModalOpen, modalOpen, dispatch } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Products page</h2>
        </div>
        <div className="add-product-btn">
          <Button primary onClick={() => setModalOpen(true)}>Add product</Button>
        </div>
        <h3>Products:</h3>
        <ProductList products={products || []} />
        <NewProductModal modalOpen={modalOpen} setModalOpen={setModalOpen} dispatch={dispatch} />
      </div>
    );
  }
}

const mapStateToProps = (products) => ({ products });

const appEnhancer = compose(
  connect(mapStateToProps),
  withState('modalOpen', 'setModalOpen', false),
);

export default appEnhancer(App);
