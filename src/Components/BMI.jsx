import React, { useState, useContext } from "react";
import AxiosService from "../utis/AxiosService";
import ApiRoutes from "../utis/ApiRoutes";
import UserContext from "../Context/UserContext";
import Header from "./Header";
import { useEffect } from "react";

const BMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [nutritionalIntakeSuggestion, setNutritionalIntakeSuggestion] =
    useState("");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [error, setError] = useState(null);

  const loggedData = useContext(UserContext);

  useEffect(() => {
    const minBMI = 16;
    const maxBMI = 40;
    const minAngle = 0;
    const maxAngle = 180;

    if (bmi < minBMI) {
      setRotationAngle(minAngle);
    } else if (bmi > maxBMI) {
      setRotationAngle(maxAngle);
    } else {
      const angle =
        ((bmi - minBMI) / (maxBMI - minBMI)) * (maxAngle - minAngle);
      setRotationAngle(angle);
    }
  }, [bmi]);

  const calculateBMI = async (data) => {
    try {
      console.log("Sending data to server:", data);
      const response = await AxiosService.post(
        ApiRoutes.BMI_CALCULATOR.path,
        data
      );
      console.log("Received response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in calculating BMI:", error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      userId: loggedData.user.userid,
      height: parseFloat(height),
      weight: parseFloat(weight),
    };

    try {
      const result = await calculateBMI(data);
      setBmi(result.bmi);
      setBmiCategory(result.bmiCategory);
      setNutritionalIntakeSuggestion(result.nutritionalIntakeSuggestion);
      setError(null);
    } catch (error) {
      setError("Failed to calculate BMI. Please try again.");
      setBmi(null);
      setBmiCategory("");
      setNutritionalIntakeSuggestion("");
    }
  };
  const handleClear = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiCategory("");
    setNutritionalIntakeSuggestion("");
    setError(null);
    setRotationAngle(0);
  };

  return (
    <div className="banners">
      <div className="container">
        <Header />
        <div>
          <div className="bmi">
            <h1 className="text " style={{ color: "green" }}>
              Calculate Your BMI
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  Height (cm) :
                  <input
                    type="number"
                    style={{ height: "40px", width: "350px" }}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label className="mb-3">
                  Weight (kg) :
                  <input
                    type="number"
                    style={{ height: "40px", width: "350px" }}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </label>
              </div>

              <button class="btn btn-primary" type="submit">
                Calculate BMI
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleClear}
                style={{ marginLeft: "10px" }}
              >
                Clear
              </button>
            </form>
          </div>
          {bmi && (
            <div className="bmi-text mt-3" style={{ color: "green" }}>
              <h5>
                Your BMI is : <span style={{ color: "red" }}>{bmi}</span>
              </h5>
              <h5>
                BMI Category :
                <span style={{ color: "red" }}>{bmiCategory}</span>
              </h5>
              <h5>
                Nutritional Intake Suggestion :{" "}
                <span style={{ color: "red" }}>
                  {nutritionalIntakeSuggestion}
                </span>
              </h5>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
      <div style={{ padding: "10px", textAlign: "center" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="300px"
          height="163px"
          viewBox="0 0 300 163"
        >
          <g
            transform="translate(18,18)"
            style={{
              fontFamily: "arial,helvetica,sans-serif",
              fontSize: "12px",
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="0"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7"></polygon>
              </marker>
              <path
                id="curvetxt1"
                d="M-4 140 A140 140, 0, 0, 1, 284 140"
                style={{ fill: "none" }}
              ></path>
              <path
                id="curvetxt2"
                d="M33 43.6 A140 140, 0, 0, 1, 280 140"
                style={{ fill: "none" }}
              ></path>
              <path
                id="curvetxt3"
                d="M95 3 A140 140, 0, 0, 1, 284 140"
                style={{ fill: "none" }}
              ></path>
              <path
                id="curvetxt4"
                d="M235.4 33 A140 140, 0, 0, 1, 284 140"
                style={{ fill: "none" }}
              ></path>
            </defs>
            <path
              d="M0 140 A140 140, 0, 0, 1, 6.9 96.7 L140 140 Z"
              fill="#bc2020"
            ></path>
            <path
              d="M6.9 96.7 A140 140, 0, 0, 1, 12.1 83.1 L140 140 Z"
              fill="#d38888"
            ></path>
            <path
              d="M12.1 83.1 A140 140, 0, 0, 1, 22.6 63.8 L140 140 Z"
              fill="#ffe400"
            ></path>
            <path
              d="M22.6 63.8 A140 140, 0, 0, 1, 96.7 6.9 L140 140 Z"
              fill="#008137"
            ></path>
            <path
              d="M96.7 6.9 A140 140, 0, 0, 1, 169.1 3.1 L140 140 Z"
              fill="#ffe400"
            ></path>
            <path
              d="M169.1 3.1 A140 140, 0, 0, 1, 233.7 36 L140 140 Z"
              fill="#d38888"
            ></path>
            <path
              d="M233.7 36 A140 140, 0, 0, 1, 273.1 96.7 L140 140 Z"
              fill="#bc2020"
            ></path>
            <path
              d="M273.1 96.7 A140 140, 0, 0, 1, 280 140 L140 140 Z"
              fill="#8a0101"
            ></path>
            <path d="M45 140 A90 90, 0, 0, 1, 230 140 Z" fill="#fff"></path>
            <circle cx="140" cy="140" r="5" fill="#666"></circle>
            <g
              style={{
                paintOrder: "stroke",
                stroke: "#fff",
                strokeWidth: "2px",
              }}
            >
              <text x="25" y="111" transform="rotate(-72, 25, 111)">
                16
              </text>
              <text x="30" y="96" transform="rotate(-66, 30, 96)">
                17
              </text>
              <text x="35" y="83" transform="rotate(-57, 35, 83)">
                18.5
              </text>
              <text x="97" y="29" transform="rotate(-18, 97, 29)">
                25
              </text>
              <text x="157" y="20" transform="rotate(12, 157, 20)">
                30
              </text>
              <text x="214" y="45" transform="rotate(42, 214, 45)">
                35
              </text>
              <text x="252" y="95" transform="rotate(72, 252, 95)">
                40
              </text>
            </g>
            <g style={{ fontSize: "14px" }}>
              <text>
                <textPath xlinkHref="#curvetxt1">Underweight</textPath>
              </text>
              <text>
                <textPath xlinkHref="#curvetxt2">Normal</textPath>
              </text>
              <text>
                <textPath xlinkHref="#curvetxt3">Overweight</textPath>
              </text>
              <text>
                <textPath xlinkHref="#curvetxt4">Obesity</textPath>
              </text>
            </g>
            <line
              x1="140"
              y1="140"
              x2="65"
              y2="140"
              stroke="#666"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              transform={`rotate(${rotationAngle} 140 140)`}
            ></line>
            <text
              x="67"
              y="120"
              style={{ fontSize: "30px", fontWeight: "bold", color: "#000" }}
            >
              BMI = {bmi}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BMI;
