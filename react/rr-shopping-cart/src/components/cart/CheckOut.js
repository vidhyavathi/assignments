import React, {Component} from 'react';

class Checkout extends Component {
    componentWillMount() {
        this.props.actions.getPriceDetails(this.props.cart.cart);
    }
    buyNow() {
        alert('Your order is placed successfully!');
    }
    render() {
        let price = this.props.cart.price;
        return (
            <div className="price-list">
                <h1 className="item-name">Price Details</h1>
                <div className="price-item border-none">Price ({price.totalItems} items) <span className="price-item-right">&#8377;{price.itemsPrice}</span></div>
                <div className="price-item">Total Discount <span className="price-item-right">&#8377;{price.discount}</span></div>
                <div className="price-item">Total Price<span className="price-item-right">&#8377;{price.totalPrice}</span></div>
                <div className="submit-form"><button type="button" className="btn" onClick={this.buyNow}>Buy Now</button></div>
            </div>
        );
    }
}

export default Checkout;