// //get request to user_meal or User
// //establish list of current meals for a specific day we want and update a delete for Meal cards
import React,{useState} from 'react'
import MealCard from './MealCard'
import styled from "styled-components";

const Display= styled('div')`
display: flex;
flex-flow: column wrap;
width:60%;
height:50%;
border: 1px solid #f24725;
`
const Select = styled('select')`
width:80%;
`
const MacroDiv = styled('div')`
display: flex;
flex-flow: column wrap;`


function MealList({ user }) {
    const { dotw, setDotw } = useState("")

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
                <MealCard/>
            </MacroDiv>
        </Display>
    )
}

export default MealList
