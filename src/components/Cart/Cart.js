import { useContext, useState } from 'react';
import React from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckOut from './CheckOut'

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [submits, setSubmits] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [checkout, SetCheckout] = useState(false);

  let totalAmount = `INR ${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderedHandler = () => {
    SetCheckout(true)
  }

  const submitOrderHandler = async (datas) => {
    setSubmits(true)
    await fetch('https://react-https-2e5a2-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: datas,
        orderedItems: cartCtx.items
      })
    })
    setSubmits(false);
    setSubmited(true);
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const listedItems = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!checkout &&
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
    </button>
          {hasItems && <button className={classes.button} onClick={orderedHandler}>
            Order
    </button>}
        </div>}
    </React.Fragment>
  )

  const submitingHandler =
    <p>submitting..</p>


  const submitedHandler = (
    <React.Fragment>
      <p>your orrder is collected...</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
    </button>
        {hasItems && <button className={classes.button} onClick={orderedHandler}>
          Order
    </button>}
      </div>
    </React.Fragment>
  )

  return (
    <Modal onClose={props.onClose}>
      {!submits && !submited && listedItems}
      {submits && submitingHandler}
      {!submits && submited && submitedHandler}
    </Modal>
  );
};

export default Cart;