import React, {Component} from 'react';

class Item extends Component {
    addToCart() {
        let {actions, item} = this.props;
        actions.addItem(item);
    }
    getDiscountPrice(price, discount) {
        return (price - Math.round((price * discount)/100));
    }
    render() {
        let {item} = this.props;
        let discountDetails = (item) => {
            if(item.discount) {
            return (<span><span>&#8377;{this.getDiscountPrice(item.price, item.discount)}</span><span className="strike-through off">&#8377;{item.price}</span></span>);
            } else {
                return <span>&#8377;{item.price}</span>;
            }            
        }
        let offHTML = (item.discount) ? <div className="ribbon-wrapper-green"><span className="off ribbon-green">{item.discount}% off</span></div>: '';
        return (        
            <li>
                <div className="item-wrapper">
                    <img src={item.img_url} alt={item.name} />
                    {offHTML}
                    <h1 className="item-name">{item.name}</h1>
                    <div className="item-price">
                        {discountDetails(item)}
                    </div>
                    <div className="submit-form">
                        <button onClick={this.addToCart.bind(this)} type="button" className="btn">Add To Cart</button>
                    </div>
                </div>
            </li>
        )
    }
}

class Items extends Component {
    render() {
        let {items, actions} = this.props;
        let itemsHTML = items.map((item) => {
            return (
                <Item actions={actions} key={item.id} item={item} />
            );
        });
        return (
            <section className="related-items">
                <div role="tabpanel"><div className="related-list"><ul>{itemsHTML}</ul></div></div>
            </section>
        );
    }
}
 export default Items;