import React, { useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { useContext } from "react";
import AxiosService from "../utis/AxiosService";
import ApiRoutes from "../utis/ApiRoutes";
import toast from "react-hot-toast";
import Header from "./Header";

function Diet() {
  let loggedData = useContext(UserContext);
  const [item, setitem] = useState([]);
  const [date, setDate] = useState(new Date());
  let [total, settotal] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbohydrate: 0,
    totalFibre: 0,
    totalFat: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosService.get(
          `${ApiRoutes.TRACK_DATE.path}/${loggedData.user.userid}/${
            date.getMonth() + 1
          }-${date.getDate()}-${date.getFullYear()}`,

          {
            headers: {
              Authorization: `Bearer ${loggedData.user.token}`,
            },
          }
        );

        const data = response.data;

        setitem(data);

        if (response.status === 200) {
          toast.success("Food tracked successfully");
          console.log("Food tracked successfully:", data);
        } else {
          console.log("Error  in tracking food:", data);
        }
      } catch (error) {
        toast.error("Error  in tracking food");
      }
    };

    fetchData();
  }, [date]);

  useEffect(() => {
    calculateTotal();
  }, [item]);

  function calculateTotal() {
    let totalCopy = {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbohydrate: 0,
      totalFat: 0,
      totalFibre: 0,
    };
    item.forEach((item) => {
      totalCopy.totalCalories += item.details.calories || 0;
      totalCopy.totalProtein += item.details.protein || 0;
      totalCopy.totalCarbohydrate += item.details.carbohydrate || 0;
      totalCopy.totalFibre += item.details.fibre || 0;
      totalCopy.totalFat += item.details.fat || 0;
    });
    settotal(totalCopy);
  }

  return (
    <div className="banner ">
      <div className="container diet-container ">
        <Header></Header>
        <div className="content ms-5 ">
          <h2 className="text ms-3 p-3" style={{ fontFamily: "" }}>
            Amount of food you ate on{" "}
            <span style={{ color: "red" }}>{date.toDateString()}</span>
          </h2>
          <input
            type="date"
            onChange={(event) => {
              setDate(new Date(event.target.value));
            }}
            style={{ width: "300px", height: "40px", fontSize: "16px" }}
          />

          {item.map((item) => {
            return (
              <div className="item" key={item._id}>
                <h4>
                  {item.foodId?.name || "Unknown Food"} (
                  {item.details?.calories || 0} Kcal for {item.quantity}g)
                </h4>
                <p>Protein: {item.details?.protein || 0}g</p>
                <p>Carbohydrate: {item.details?.carbohydrate || 0}g</p>
                <p>Fibre: {item.details?.fibre || 0}g</p>
                <p>Fat: {item.details?.fat || 0}g</p>
              </div>
            );
          })}

          <div className="item ">
            <h3 className="title" style={{ color: "red" }}>
              Total Calories : {total.totalCalories} Kcal
            </h3>
            <p>Protein : {total.totalProtein}g</p>
            <p>Carbohydarate : {total.totalCarbohydrate}g</p>
            <p>Fibre : {total.totalFibre}g</p>
            <p>Fat : {total.totalFat}g</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Diet;
