import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import img from '../../images/cart.png';

class TopNav extends Component {
  render() {
    let pathname = window.location.pathname, myCart;
    /**
     * Based on URL show/hide MyCart
     */
    if(pathname.indexOf('/cart') > -1 || pathname.indexOf('/checkout') > -1) {
      myCart = '';
    } else {
      myCart = <Link className="App-topnav-home" to="/cart">
               <img src={img} alt="My Cart" className="my-cart" />&nbsp;{this.props.totalItems ? `(${this.props.totalItems})`: ''}
            </Link>;
    }
    return (
      <header role="banner">
    	  <div>
            <h1 className="logo"><Link className="App-topnav-home" to="/">
                RR Shopping Cart
              </Link></h1>
            <ul id="nav-anchors" className="nav-anchors">
            	<li>{myCart}</li>
            </ul>
        </div>
	  </header>
    );
  }
}

export default TopNav;
