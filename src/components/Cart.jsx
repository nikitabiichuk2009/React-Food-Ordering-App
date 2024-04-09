import { useContext } from "react";
import Modal from "./Modal";
import { CartContext } from "../store/card-context";
import { ModalContext } from "../store/modal-context";


export default function Cart(){
  const cartCtx = useContext(CartContext);
  const { hideCart, progress, showCheckout } = useContext(ModalContext);
  const totalPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );    
  return (
    <Modal open={progress === "cart"} className="cart" onClose={progress === 'cart' ? hideCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {item.quantity} x ${item.price}
              </p>
              <p className="cart-item-actions">
                <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
                <span style={{ fontSize: "larger" }}>{item.quantity}</span>
                <button onClick={() => cartCtx.addItem(item)}>+</button>
              </p>
            </li>
          );
        })}
      </ul>

      <p className="cart-total">Total Price: ${totalPrice.toFixed(2)}</p>
      <p className="modal-actions">
        <button onClick={hideCart} className="red">
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button
            className="button"
            onClick={() => {
              showCheckout();
            }}
          >
            Go to Checkout
          </button>
        )}
      </p>
    </Modal>
  );
}