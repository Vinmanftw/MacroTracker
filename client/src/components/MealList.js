// //get request to user_meal or User
// //establish list of current meals for a specific day we want and update a delete for Meal cards
import React,{useState} from 'react'
import MealCard from './MealCard'
import styled from "styled-components";
// post request
const Display= styled('div')`
display: flex;
flex-flow: column wrap;
width:100%;
height:50%;
border: 1px solid #f24725;
`
const Select = styled('select')`
width:100%;
font-size: 40px;
color:#f24725;
background-color: #2e2e2e;
border-radius: 4px;
border: 1px solid #f24725;

text-align: center;




`
const MacroDiv = styled('div')`
display: flex;
flex-flow: column wrap;`
const Btn = styled('button')`
display:flex;
align-self: center;


`

    
function MealList({ user, setUser,meal,setMeal}) {
    
    const [dotw, setDotw ] = useState("Sunday")
    
    function mapProb(){
        
        if (user.meals){
            return user.meals.map((meal) =>(<MealCard meal={meal} setUser={setUser} key={meal.id}/>))
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(user.meals.length)
        fetch("/CreateMeal", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dotw,
            user_id: user.id
          }),
        })
        .then((r) => {
          if (r.ok) {
            r.json().then((meal) => {
                setMeal(meal)
              }
              
            );
          }
        });
        fetch("/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
            
          }).then((r) => {
            if (r) {
              r.json().then((user)=>setUser(user));
            }
          });
    }
   
    return (
        <Display>
            <Select onChange={(e) => setDotw(e.target.value)} Day="dotw" id="dotw">
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            </Select>
            <MacroDiv>
                {/* <MealCard meal={meal}/> */}
                {mapProb()}
                
            </MacroDiv>

            <Btn  onClick={handleSubmit}>Add new meal</Btn>
            
        </Display>
    )
}

export default MealList
