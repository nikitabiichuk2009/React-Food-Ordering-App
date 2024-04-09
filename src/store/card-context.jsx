import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

function cartReducer(state, action) {

  if (action.type === "CLEAR"){
    return { items: [] }; // Clear the cart
  }
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingItemIndex !== -1) {
      // If the item already exists, increase its quantity
      const updatedItem = {
        ...state.items[existingItemIndex],
        quantity: state.items[existingItemIndex].quantity + 1
      }
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      // If the item is not in the cart, add it
      updatedItems.push({...action.item, quantity: 1})
    }
    return {...state, items: updatedItems}
  }

  if (action.type === "REMOVE_ITEM"){
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItems = [...state.items];
    if (existingItems[existingItemIndex].quantity === 1){
      existingItems.splice(existingItemIndex, 1);
    } else{
      const updatedItem = {
        ...state.items[existingItemIndex],
        quantity: state.items[existingItemIndex].quantity - 1
      }
      existingItems[existingItemIndex] = updatedItem;
    }
    return {...state, items: existingItems}
  }
  return state;
}
export default function CardContextProvider({ children }){
  const [cart, setCartDispatch] = useReducer(cartReducer, { items: [] });
  function addItem(item){
    setCartDispatch({ type: "ADD_ITEM", item})
  }

  function removeItem(id){
    setCartDispatch({ type: "REMOVE_ITEM", id})
  }

  function clearCart(){
    setCartDispatch({type:"CLEAR"})
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  }

  console.log(cartContext)
  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}