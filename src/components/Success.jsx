import Modal from "./Modal";
import { ModalContext } from "../store/modal-context";
import { useContext } from "react";
export default function SuccessModal(){
	const modalCtx = useContext(ModalContext);
	return (
    <Modal
      open={modalCtx.progress === "success"}
      onClose={modalCtx.progress === "success" ? modalCtx.hideSuccess : null}
    >
      <h2 style={{ fontSize: "2rem" }}>Success!</h2>
      <p>Your order was submitted successfully!</p>
      <p>Check your email to know more details!</p>
      <p className="modal-actions">
        <button className="button" onClick={modalCtx.hideSuccess}>
          Okay
        </button>
      </p>
    </Modal>
  );
}
