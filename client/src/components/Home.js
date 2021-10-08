import React, { useState } from "react";
import MealList from "./MealList";
import styled from "styled-components";
  
// function toCm(inches){
//  return inches*2.54
// }

// function toKg(lbs){
//   return lbs * 0.453592
// }
function BMR2(gender,lbs,inches,years){
  if(gender === "Male")
    return (10*(lbs* 0.453592))+ (6.25*(inches*2.54))-(5*years)+5
  else {
    return (10*(lbs* 0.453592))+ (6.25*(inches*2.54))-(5*years)-161
  }
}
function CalorieIntake(obj,tdee,change){
  if(obj === "Bulking"){
    return tdee*(change === 1?1.10:1.15)
  }else if(obj === "Cutting"){
    return tdee*(change === 1?.80:.75)
  }else{return tdee}
}
// function calCals(){
//   setCalories()
// }

function ProteinIntake(obj,lbs,change){
  if(obj === "Bulking"){
    return (change === 1?lbs*1.1:1.2*lbs)
  }else if(obj === "Cutting"){
    return (change === 1?lbs:lbs*.8)
  }else{return lbs}
}
function FatIntake(lbs){
  return lbs* .3;
}
function CarbIntake(calories,protein,fat){
  let sum;
  sum=(protein * 4)+(fat*9) 
  return (calories - sum)/4
}
// function BMR(gender,kg,cm,years){
//   if(gender === "Male")
//     return (10*kg)+ (6.25*cm)-(5*years)+5
//   else {
//     return (10*kg)+ (6.25*cm)-(5*years)-161
//   }
// }

const Div = styled('div')`
display:flex;
flex-flow: row wrap;
justify-content: space-around;
width:100%;
gap:4%;
`
const H1 = styled('h1')`
text-align:center;

font-size:18px;
width:12%;
`
const FORM= styled('form')`
  background-color: #404040;
  border: 1px solid #1c1c1c;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  
  margin: 0 auto;
  padding: 1rem 0 1rem 0;
`
function Home({ user, setUser, meal, setMeal }) {
  
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bodyFat, setBodyFat]= useState(0);
  const [bmr, setBmr]= useState(0);
  const [tdee, setTdee]=useState(0);
  const [isBulking, setIsBulking]= useState("Bulking");
  const [activity,setActivity]= useState("1.2")
  const [goalProtein, setGoalProtein] = useState("");
  const [goalCarbs, setGoalCarbs] = useState("");
  const [goalFat, setGoalFat] = useState("");
  const [goalCalories, setGoalCalories]= useState(0);
  // const [goalWeight, setGoalWeight] = useState("");
  // const [goalBodyFat, setGoalBodyFat] = useState("");
  const [goalPoundChange, setGoalPoundChange] = useState(0);
    if (user){
      fetch("/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
        
      }).then((r) => {
        if (r) {
          r.json().then((user)=>user);
        }
      });
      if (user.goal_calories === null || user.goal_calories === 0) {
        function handleSubmit(e) {
          
          fetch("/profile", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              weight,
              height,
              body_fat: bodyFat,
              bmr,
              tdee,
              is_bulking: isBulking,
              goal_protein: goalProtein,
              goal_carbs: goalCarbs,
              goal_fat: goalFat,
              goal_calories: goalCalories,
              activity,
              goal_lb_change_per_week: goalPoundChange
              }),
          }).then((r) => {
            if (r) {
              r.json().then(console.log(r));
            }
          });
         
        }
        console.log(user)
        return (
          <div>
            <h1>Welcome, {user.username}  !</h1>
            <div className="popup">
              <h1>Please fill in the following form to get your macros!!</h1>
              <FORM onSubmit={handleSubmit}>
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
                <label htmlFor="activity">Physical Activity Level</label>
                <select onChange={(e) => setActivity(e.target.value)} PAL="activity" id="activity">
                <option value="1.2">little/no exercise</option>
                <option value="1.3">weight lift 5 days a week,little/no cardio</option>
                <option value="1.375">light exercise 1-2 times a week</option>
                <option value="1.55">moderate exercise 2-3 times a week</option>
                <option value="1.725">hard exercise 4-5 times a week</option>
                <option value="1.9">physical job or hard exercise 6-7 times a week</option>
                <option value="2.4">professional athlete</option>
                </select>
                <button onClick={()=>{
                  let bMR;
                  let tdEE;
                  let cal;
                  let protein;
                  let fat;
                  let carbs;
                  bMR = BMR2(user.is_male,weight,height,user.age)
                  tdEE=Math.round( bMR *activity*10)/10
                  cal=Math.round(CalorieIntake(isBulking,tdEE,goalPoundChange)*10)/10
                  protein = Math.round(ProteinIntake(isBulking,weight,goalPoundChange)*10)/10
                  fat=Math.round(FatIntake(weight)*10)/10
                  carbs = Math.round(CarbIntake(cal,protein,fat)*10)/10
                  setActivity(activity)
                  setIsBulking(isBulking)
                  setBmr(bMR)
                  setTdee(tdEE)
                  setGoalCalories(cal)
                  setGoalProtein(protein)
                  setGoalFat(fat)
                  setGoalCarbs(carbs)}
                  }type="submit">Calculate Macros!!</button>
              </FORM>
            </div>
          </div>
          );
        }
      else if(user){
                
        return (
          <div>
            
            <h1>Welcome back, {user.username}!</h1>
            <Div>
              {/* <h1>BMR: { user.bmr} kcals</h1>
              <h1>TDEE: {user.tdee} kcals</h1> */}
              <H1>Calories {user.total_cal}/{user.goal_calories} kcals</H1>
              <H1>Protein {user.total_protein}/{user.goal_protein}g</H1>
              <H1>Carb Intake {user.total_carbs}/{user.goal_carbs}g</H1>
              <H1>Fat Intake {user.total_fat}/{user.goal_fat}g</H1>
              
            </Div>
            <MealList user={user} setUser={setUser} meal={meal} setMeal={setMeal}/>
          </div>
        );    
      }
    }
    else{
      return <h1>Please Login or Sign Up</h1>;
    }
  

    
  }
  
  export default Home;