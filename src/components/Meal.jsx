import { useContext } from "react";
import { CartContext } from "../store/card-context";

export default function Meal({ food }){

	const { addItem } = useContext(CartContext);
	function handleAddMeal(){
		addItem(food);
	}
	return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${food.image}`} alt="product image" />
        <div>
          <h3>{food.name}</h3>
          <p className="meal-item-price">${food.price}</p>
          <p className="meal-item-description">{food.description}</p>
        </div>
        <p className="meal-item-actions">
          <button onClick={handleAddMeal} className="button">Add to cart</button>
        </p>
      </article>
    </li>
  );
}