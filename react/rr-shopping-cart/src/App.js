import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TopNav from './components/topnav/TopNav';
import Items from './components/items/Items';
import MyCart from './components/cart/MyCart';
import Checkout from './components/cart/CheckOut';
import * as ItemsActions from './actions/items';

class App extends Component {
  componentWillMount() {
    this.props.actions.getItems();
    this.props.actions.getCartItems();
  }
  renderItemsPage(props) {
      return (
        <Items items={this.props.items} actions={this.props.actions} />
      );
  }
  renderCartPage(props) {
      return (
        <MyCart cart={this.props.cart} actions={this.props.actions} />
      );
  }
  renderCheckoutPage(props) {
      return (
        <Checkout {...this.props} />
      );
  }
  render()  {
      return (
      <Router>
        <div className="App">
          <TopNav totalItems={this.props.cart.price.totalItems}></TopNav>
          <main className="content">
            <Route exact path="/" render={this.renderItemsPage.bind(this)} props={this.props} />
            <Route path="/items" render={this.renderItemsPage.bind(this)}/>
            <Route path="/cart" render={this.renderCartPage.bind(this)}/>
            <Route path="/checkout" render={this.renderCheckoutPage.bind(this)}/>
          </main>
        </div>
      </Router>
    );
  }
}


App.propTypes = {
  items: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  items: state.items,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ItemsActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
