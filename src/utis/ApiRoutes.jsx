const ApiRoutes = {
  USER_LOGIN: {
    path: "/users/login",
    authenticate: true,
  },
  USER_REGISTER: {
    path: "/users/register",
    authenticate: false,
  },
  FOOD_SEARCH: {
    path: "/foods",
    authenticate: true,
  },
  FOOD_CREATE: {
    path: "/foods/create",
    authenticate: false,
  },

  TRACK_ITEM: {
    path: "/trackings/track",
    authenticate: true,
  },
  TRACK_DATE: {
    path: "/trackings/track",
    authenticate: true,
  },
  BMI_CALCULATOR: {
    path: "/bmi/calculate-bmi",
    authenticate: true,
  },
};

export default ApiRoutes;
