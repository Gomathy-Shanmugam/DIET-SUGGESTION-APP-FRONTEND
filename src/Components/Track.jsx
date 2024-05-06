import React, { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import ApiRoutes from "../utis/ApiRoutes";
import AxiosService from "../utis/AxiosService";
import Food from "./Food";
import Header from "./Header";

function Track() {
  const { user } = useContext(UserContext);
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);

  async function searchFood(event) {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
    if (searchTerm.length === 0) {
      setFoodItems([]);
      setSelectedFood(null);
      return;
    }

    try {
      if (!user || !user.token) {
        throw new Error("User or token is not available.");
      }

      const response = await AxiosService.get(
        ApiRoutes.FOOD_SEARCH.path + `/${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = response.data;

      if (data.message === undefined) {
        setFoodItems(data);
      } else {
        setFoodItems([]);
      }
    } catch (error) {
      console.error("Error searching food:", error);
    }
  }

  function handleFoodItemClick(item) {
    setSelectedFood(item);
    setSearchTerm(item.name);
    console.log(item);
    setFoodItems([]);
  }

  return (
    <>
      <Header></Header>
      <div className="container" id="track">
        <h2 className="text mt-5" style={{ color: "green" }}>
          <b>Track Food</b>
        </h2>
        <input
          className="box"
          type="search"
          placeholder="Search Food Item"
          value={searchTerm}
          onChange={searchFood}
          style={{ width: "300px", height: "40px", fontSize: "16px" }}
        />
        {foodItems.length !== 0 ? (
          <div className="search-results">
            {foodItems.map((item) => (
              <p
                className="item"
                onClick={() => {
                  handleFoodItemClick(item);
                }}
                key={item._id}
              >
                {item.name}
              </p>
            ))}
          </div>
        ) : null}

        {selectedFood !== null ? <Food food={selectedFood} /> : null}
      </div>
    </>
  );
}

export default Track;
