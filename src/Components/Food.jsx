import React, { useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { useContext } from "react";
import AxiosService from "../utis/AxiosService";
import ApiRoutes from "../utis/ApiRoutes";
import toast from "react-hot-toast";

function Food(props) {
  const [eatenquantity, seteatenquantity] = useState(100);
  const [food, setfood] = useState({});
  const [foodInitial, setfoodInitial] = useState({});

  let loggedData = useContext(UserContext);

  useEffect(() => {
    setfood(props.food);
    setfoodInitial(props.food);
    console.log(loggedData);
    console.log(food);
  }, [props.food]);

  function calculateMacros(event) {
    if (event.target.value.length != 0) {
      let quantity = Number(event.target.value);
      seteatenquantity(quantity);
      let copyfood = { ...food };

      copyfood.protein = (foodInitial.protein * quantity) / 100;
      copyfood.carbohydrate = (foodInitial.carbohydrate * quantity) / 100;
      copyfood.calories = (foodInitial.calories * quantity) / 100;
      copyfood.fibre = (foodInitial.fibre * quantity) / 100;
      copyfood.fat = (foodInitial.fat * quantity) / 100;

      setfood(copyfood);
    }
  }

  async function trackfoodItem() {
    try {
      const trackData = {
        userId: loggedData.user.userid,
        foodId: food._id,
        details: {
          protein: food.protein,
          carbohydrate: food.carbohydrate,
          fat: food.fat,
          fibre: food.fibre,
          calories: food.calories,
        },

        quantity: eatenquantity,
      };

      const response = await AxiosService.post(
        ApiRoutes.TRACK_ITEM.path,
        trackData,

        {
          headers: {
            Authorization: `Bearer ${loggedData.user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(trackData);
      if (response.status === 201) {
        console.log("Food tracked successfully:", data);
        toast.success("Food addedd successfully");
      } else {
        console.log("Error adding food:", data);
      }
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("Error adding food");
    }
  }

  return (
    <div>
      <div className="food">
        <div className="food-img ms-4">
          <img src={food.imageUrl}></img>
        </div>
      </div>
      <h2 className="text p-3">
        {food.name} ({food.calories} Kcal for {eatenquantity}G)
      </h2>

      <div className="nutrition" style={{ height: "200px", width: "500px" }}>
        <div className="nutrient p-3 ">
          <p className="n-title">
            <b>Protein</b>
          </p>
          <p className="n-value">{food.protein}g</p>
        </div>
        <div className="nutrient p-3 ">
          <p className="n-title">
            <b>Carbohydrate</b>
          </p>
          <p className="n-value">{food.carbohydrate}g</p>
        </div>
        <div className="nutrient p-3">
          <p className="n-title">
            <b>Fibre</b>
          </p>
          <p className="n-value">{food.fibre}g</p>
        </div>
        <div className="nutrient p-3">
          <p className="n-title">
            <b>Fat</b>
          </p>
          <p className="n-value">{food.fat}g</p>
        </div>

        <div className="track-control">
          <input
            type="number"
            placeholder="Quantity in gms"
            onChange={calculateMacros}
          ></input>

          <button className="btn btn-primary ms-2" onClick={trackfoodItem}>
            {" "}
            Track the food
          </button>
        </div>
      </div>
    </div>
  );
}

export default Food;
