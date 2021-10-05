import React, { useState } from "react";

  

function Home({ user, setUser }) {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bodyFat, setBodyFat]= useState(0);
  const [isBulking, setIsBulking]= useState("Bulking");
  // const [goalProtein, setGoalProtein] = useState("");
  // const [goalCarbs, setGoalCarbs] = useState("");
  // const [goalFat, setGoalFat] = useState("");
  // const [goalCalories, setGoalCalories]= useState(0);
  // const [goalWeight, setGoalWeight] = useState("");
  // const [goalBodyFat, setGoalBodyFat] = useState("");
  const [goalPoundChange, setGoalPoundChange] = useState(0);

  

    if (user && user.goalPoundChange == null) {
      function handleSubmit(e) {
        e.preventDefault();
        fetch("/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            weight,
            height,
            body_fat: bodyFat,
            is_bulking: isBulking,
            goal_lb_change_per_week: goalPoundChange
            }),
        }).then((r) => {
          if (r) {
            r.json().then(console.log(r));
          }
        });
       
      }
      return (
        <div>
          <h1>Welcome, {user.username}!</h1>
          <div className="popup">
            <h1>Please fill in the following form to get your macros!!</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="height">Height (inches)</label>
              <input
                type="text"
                id="height"
                autoComplete="off"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <label htmlFor="weight">Weight (lbs)</label>
              <input
                type="weight"
                id="weight"
                autoComplete="off"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <label htmlFor="body_fat">Body Fat %</label>
              <input
                type="text"
                id="body_fat"
                autoComplete="off"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
              />
              <label htmlFor="is_bulking">Objective</label>
              <select onChange={(e) => setIsBulking(e.target.value)} Objective="is_bulking" id="obj">
              <option value="Bulking">Bulk</option>
              <option value="Cutting">Cut</option>
              </select>
              <label htmlFor="goal_lb_change_per_week">{isBulking === "Bulking"? 
                    `How many pounds do you want to gain per week, ${user.first_name} ?`:
                    `How many pounds do you want to loose per week, ${user.first_name} ?`}
              </label>
              <input
                type="goal_lb_change_per_week"
                id="goal_lb_change_per_week"
                autoComplete="off"
                value={goalPoundChange}
                onChange={(e) => setGoalPoundChange(e.target.value)}
              />
              <button type="submit">Calculate Macros!!</button>
            </form>
          </div>
        </div>
        );
    } else if(user){
      return (
        <div>
          <h1>Welcome, {user.username}!</h1>
          
        </div>
        );}
    else{
      return <h1>Please Login or Sign Up</h1>;
    }
  }
  
  export default Home;