import Header from "./components/Header";
import Meals from "./components/Meals";
import CardContextProvider from "./store/card-context";
import ModalContextProvider from "./store/modal-context";
import { ModalContext } from "./store/modal-context";
import Form from "./components/Form";
import Cart from "./components/Cart";
import { useContext } from "react";
import SuccessModal from "./components/Success";
function App() {
  const { progress } = useContext(ModalContext);

  return (
    <CardContextProvider>
      <ModalContextProvider>
        <Header />
        <main>
          <Meals />
          <Cart />
          <Form />
          <SuccessModal />
        </main>
      </ModalContextProvider>
    </CardContextProvider>
  );
}

export default App;
