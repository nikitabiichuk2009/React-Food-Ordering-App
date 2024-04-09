import Modal from "./Modal";
import { ModalContext } from "../store/modal-context";
import { CartContext } from "../store/card-context";
import { useContext, useState } from "react";
import axios from "axios";
import Input from "./Input";


export default function Form(){
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const modalCtx = useContext(ModalContext);
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);
    console.log(values);
    try {
      const response = await axios.post("http://localhost:3000/orders", {
        order: {
          itemsOrdered: cartCtx.items,
          customer: values,
        },
      });
      console.log(response);
      await axios.post("http://localhost:3000/send-email", {
        to: values.email,
        subject: "Order Confirmation",
        text: `Dear ${values.fullName},\n\nYour order has been successfully submitted and will arrive to you in the next 10 minutes!\n\nThank you for shopping with us!\n\nBest regards!`,
      });
      // Request succeeded, handle success here if needed
    } catch (err) {
      console.log(err);
      setError("Failed to send an order! Try to reload the page for fixing!");
    }
    setIsLoading(false); 
    cartCtx.clearCart();
    e.target.reset();
    modalCtx.showSuccess();
  }



  if (error){
    return (
      <Modal open={modalCtx.progress === "checkout"} className="-error" onClose={modalCtx.progress === 'checkout' ? modalCtx.hideCheckout : null}>
        <div className="error">
          <h2>An error occurred!</h2>
          <p>{error}</p>
          <button className="button-error" onClick={modalCtx.hideCheckout} onClose={modalCtx.progress === 'checkout' ? modalCtx.hideCheckout : null}>Okay</button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal
      open={modalCtx.progress === "checkout"}
      className=""
      onClose={modalCtx.progress === "checkout" ? modalCtx.hideCheckout : null}
    >
      <form onSubmit={handleSubmit}>
        <h2 style={{ fontSize: "2rem" }}>Checkout</h2>
        <p className="cart-total" style={{ justifyContent: "flex-start" }}>
          Total price: ${totalPrice.toFixed(2)}
        </p>
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          minLength={8}
          maxLength={40}
          placeholder="eg. Nikita Biichuk"
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="eg. emailuser@gmail.com"
        />
        <Input
          id="street"
          label="Street"
          type="text"
          minLength={8}
          maxLength={50}
          placeholder="Your living street"
        />
        <div className="control-row">
          <Input
            id="postalCode"
            label="Postal Code"
            type="number"
            minLength={2}
            maxLength={15}
            placeholder="eg. 08154"
          />
          <Input
            id="city"
            label="City"
            type="text"
            minLength={3}
            maxLength={40}
            placeholder="eg. Kyiv"
          />
        </div>
        <p className="modal-actions">
          {isLoading ? (
            <p>
              Sending an Order...
            </p>
          ) : (
            <>
              <button
                type="button"
                className="red"
                onClick={modalCtx.hideCheckout}
              >
                Close
              </button>
              <button className="button">Submit order</button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}