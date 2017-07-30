import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react'
import { removeProduct } from './reducer';
import './product.css';

class Product extends Component {
  render() {
    const { name, color, id, dispatch } = this.props;

    return (
      <Card color={color}>
        <Card.Header>Product name: <strong>{name}</strong></Card.Header>
        <Card.Description>Color: <strong>{color}</strong></Card.Description>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='red' onClick={() => dispatch(removeProduct(id))}>Remove</Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

export default connect()(Product);
