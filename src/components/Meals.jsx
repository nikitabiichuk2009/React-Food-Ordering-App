import { useEffect, useState } from "react"
import axios from "axios";
import Meal from "./Meal";

export default function Meals(){

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  async function getMeals(){
    const response = await axios.get("http://localhost:3000/meals");
    console.log(response.data);
    return response.data;
  }
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const data = await getMeals();
        setMeals(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load meals! Try to reload the page for fixing!");
      }
      setIsLoading(false);
    };
  
    fetchMeals();
  }, []);
  

  if (isLoading){
    return <p style={{fontSize: "50px", textAlign: "center"}}>Fetching Data...</p>
  }
  if (error){
    return (
      <div className="error">
        <h2>An error occurred!</h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <ul id="meals">{meals.map((meal) => {
        return <Meal key={meal.id} food={meal} />
      })}</ul>
    </div>
  ); 
}