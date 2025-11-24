import React from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
    let {cart_items} = useSelector((store) => store.cartStore);
  return (
    <div>My Cart</div>
  )
}

export default Cart