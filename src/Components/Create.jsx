import React from "react";
import { Formik } from "formik";
import ApiRoutes from "../utis/ApiRoutes";
import AxiosService from "../utis/AxiosService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "./Header";

function Create() {
  const navigate = useNavigate();
  let initialValues = {
    name: "",
    imageUrl: "",
    calories: "",
    protein: "",
    carbohydrate: "",
    fat: "",
    fibre: "",
  };

  let validate = (values) => {
    const errors = {};

    if (values.name === "") {
      errors.name = "Name is required";
    }

    if (values.calories === "") {
      errors.calories = "Calories is required";
    }
    if (values.imageUrl === "") {
      errors.imageUrl = "imageUrl is required";
    }
    if (values.carbohydrate === "") {
      errors.carbohydrate = "carbohydrate is required";
    }
    if (values.protein === "") {
      errors.protein = "protein is required";
    }
    if (values.fat === "") {
      errors.fat = "fat is required";
    }
    if (values.fibre === "") {
      errors.fibre = "fibre is required";
    }

    return errors;
  };

  let onSubmit = async (values) => {
    const formData = {
      name: values.name,
      imageUrl: values.imageUrl,
      calories: values.calories,
      protein: values.protein,
      carbohydrate: values.carbohydrate,
      fat: values.fat,
      fibre: values.fibre,
    };
    try {
      const response = await AxiosService.post(
        ApiRoutes.FOOD_CREATE.path,
        formData,
        {
          authenticate: ApiRoutes.FOOD_CREATE.authenticate,
        }
      );
      const data = response.data;
      if (response.status === 201) {
        console.log("Food tracked successfully:", data);
        toast.success("Added Successfully");
        navigate("/home");
      } else {
        console.log("Error adding food:", data);
      }
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("Error adding food");
    }
  };

  return (
    <div className="banners">
      <div className="container">
        <Header></Header>
        <div className="create m-5 ">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="card ms-5 mt-2">
                <div className="card-body">
                  <h4 className="card-title text-center">
                    Create Food Details
                  </h4>
                  <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={onSubmit}
                  >
                    {({ values, errors, handleChange, handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group ">
                          <label> Food Name</label>
                          <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.name ? "is-invalid" : ""
                            }`}
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Image URL</label>
                          <input
                            type="text"
                            name="imageUrl"
                            value={values.imageUrl}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>Calories (g)</label>
                          <input
                            type="number"
                            name="calories"
                            value={values.calories}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.calories ? "is-invalid" : ""
                            }`}
                          />
                          {errors.calories && (
                            <div className="invalid-feedback">
                              {errors.calories}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Protein (g)</label>
                          <input
                            type="number"
                            name="protein"
                            value={values.protein}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.protein ? "is-invalid" : ""
                            }`}
                          />
                          {errors.protein && (
                            <div className="invalid-feedback">
                              {errors.protein}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Carbohydrate (g)</label>
                          <input
                            type="number"
                            name="carbohydrate"
                            value={values.carbohydrate}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.carbohydrate ? "is-invalid" : ""
                            }`}
                          />
                          {errors.carbohydrate && (
                            <div className="invalid-feedback">
                              {errors.carbohydrate}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Fat (g)</label>
                          <input
                            type="number"
                            name="fat"
                            value={values.fat}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.fat ? "is-invalid" : ""
                            }`}
                          />
                          {errors.fat && (
                            <div className="invalid-feedback">{errors.fat}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>Fibre (g)</label>
                          <input
                            type="number"
                            name="fibre"
                            value={values.fibre}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.fibre ? "is-invalid" : ""
                            }`}
                          />
                          {errors.fibre && (
                            <div className="invalid-feedback">
                              {errors.fibre}
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block mt-2"
                        >
                          Create Details
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
