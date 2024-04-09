import { useContext, useRef } from "react";
import headerImg from "../assets/logo.jpg"
import { CartContext } from "../store/card-context";
import { ModalContext } from '../store/modal-context';

export default function Header(){
  const { showCart } = useContext(ModalContext);
  
	const { items } = useContext(CartContext);
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={headerImg} alt="logo image" />
          <h1>React Food App</h1>
        </div>
        <p>
          <button onClick={showCart} className="text-button">
            Cart (
            {items.reduce((totalNumber, item) => {
              return totalNumber + item.quantity;
            }, 0)}
            )
          </button>{" "}
        </p>
      </header>
    </>
  );
}