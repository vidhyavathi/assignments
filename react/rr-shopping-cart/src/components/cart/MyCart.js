import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MyCart extends Component {
    getDiscountPrice(price, discount, quantity) {
        quantity = +quantity;
        return (price*quantity - Math.round(((price * quantity) * discount)/100));
    }
    onQuantityChange(ev, itemId) {
        var quantity = +ev.target.value;
        if(quantity > 0 && quantity <= 20) {
            this.props.actions.updateQuantity(itemId, quantity);
        }
    }
    removeItemFromCart(itemId, quantity) {
        this.props.actions.removeItemFromCart(itemId, quantity);
    }
    render() {
        let {items, quantity} = this.props.cart.cart, buttonHTML = '';

        let discountDetails = (item, quantity) => {
            if(item.discount) {
            return (<span><span>&#8377;{this.getDiscountPrice(item.price, item.discount, quantity[item.id])}&nbsp;</span>
                    <span className="strike-through">&#8377;{quantity[item.id] * item.price}</span>
                    <span className="off">&nbsp;{item.discount}% off</span></span>);
            } else {
                return <span>&#8377;{quantity[item.id] * item.price}</span>;
            }            
        }

        // Create the cart items list
        let itemsHTML = items.map((item) => {
            return (<li key={item.id}>
                <img src={item.img_url} alt={item.name}/>
                <div className="review-meta"><div>{item.name} 
                    <span className="close" onClick={this.removeItemFromCart.bind(this, item.id, quantity[item.id])}>&times;</span></div>                
                <label>Quantity:</label>
                <input min="1" max="20" type="number" value={quantity[item.id]} 
                onChange={(e) => this.onQuantityChange(e, item.id)} />
                <div className="cart-item-price">
                    {discountDetails(item, quantity)}
                </div>
                </div>
            </li>);
        });
        if(!items.length) {
            itemsHTML = (<div className='no-items'>No items in your cart!</div>);
        } else {
            buttonHTML = (<div className="submit-form"><Link to="/checkout"><button type="button" className="btn">Check Out</button></Link></div>);
        }  
        return (
            <div>
                <h1 className="item-name">My Cart</h1>
                <ol className="reviews-list">{itemsHTML}</ol>
                {buttonHTML}            	
            </div>
        );
    }
}

export default MyCart;