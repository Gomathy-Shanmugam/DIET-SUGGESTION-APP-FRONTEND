import React from "react";

function About() {
  return (
    <div>
      <section className="about-us-section p-5" id="about">
        <div className="content">
          <h4 class="green-italic">Nutrient Analysis</h4>
          <p>
            The app provides insights into users' nutrient consumption,
            including macronutrients (carbohydrates, proteins, fats) and
            micronutrients (vitamins, minerals).
          </p>

          <h4 class="green-italic">Customizable Goals</h4>
          <p>
            Users can set personalized nutrition goals based on their dietary
            preferences on Daily basis.
          </p>

          <h4 class="green-italic">Food Database</h4>
          <p>
            The app offers a comprehensive database of foods allowing users to
            easily find and log their meals.
          </p>

          <h4 class="green-italic">Progress Tracking</h4>
          <p>
            Users can monitor their progress over time, view trends in their
            eating habits.
          </p>
        </div>

        <div className="image">
          <img
            src="https://healthydietindia.com/wp-content/uploads/2021/06/happy-kid.png"
            alt="logo"
            className="logo p-5"
          />
        </div>
      </section>
      <div class="catchy-quote">
        <p id="quote-text" class="typewriter">
          <b>"Fuel your body, fuel your life. Let our app be your guide"</b>
        </p>
      </div>
    </div>
  );
}

export default About;
