// //get request to meal 
import React,{useState} from 'react'
import styled from 'styled-components'


const Card = styled('div')`
display:flex;
flex-flow: column wrap;
justify-content: space-around;
width:100%;


`;
const CardContent = styled('div')`
display:flex;
flex-flow: column wrap;
justify-content: space-between;
width:100%;
border-top: 1px black solid;
border-bottom: 1px black solid;
background-color: #404040`
const Key = styled('div')`
display:flex;
flex-flow: row wrap;
justify-content: space-around;
width:100%;
gap:4%;
`
const Form = styled('form')`
display:flex;
flex-flow: row wrap;
justify-content: space-around;
width:100%;

gap:4%;

`
const Input = styled('input')`
width:12%;
background-color:#333333;
border: 1px solid black;
`
const Input1 = styled('input')`
width:12%;
background-color:#333333;
border: 1px solid black;
`
const H1 = styled('h1')`
text-align:center;

font-size:10px;
width:12%;
`
const SubButton = styled('button')`
width:12%;
background-color: #2c7a6b;
border: 1px solid black;`
const DeleteButton = styled('button')`
background-color: red;
border: 1px solid black;
width:12%;`
const Row = styled('div')`
display:flex;
flex-flow: row wrap;

width:50%;
`
const H2 = styled('h1')`
text-align:center;

font-size:12px;
width:15%;
`

//patch

function MealCard({meal, setUser}) {
    const [name, setName] = useState(meal.name);
    const [protein, setProtein] = useState(meal.protein);
    const [carbs, setCarbs]= useState(meal.carbs);
    const [fat, setFat]= useState(meal.fat);
    const [calories, setCalories]=useState(meal.calories);


    function handleSubmit(e) {
      e.preventDefault();
      fetch(`/updateMeal/${meal.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          protein,
          carbs,
          fat,
          calories
        }),
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((meal) => {
            console.log(meal)
            
          });
        }
      });
    }
    function handleDelete() {
      fetch(`/deleteMeal/${meal.id}`, {
        method: "DELETE",
        
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
        <Card>
            <Row><H2>Time: </H2><Input1
                type="string"
                id="time"
                
                
                /></Row>
            <CardContent>
                <Key><H1>Meal</H1><H1>Protein (grams)</H1>
                    <H1>Carbs (grams)</H1><H1>Fat (grams)</H1><H1>Calories (Kcals)</H1>
                </Key>
                <Form onSubmit={handleSubmit}>
                <Input
                type="text"
                id="name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <Input
                type="integer"
                id="protein"
                autoComplete="off"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                />
                <Input
                type="integer"
                id="carbs"
                autoComplete="off"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                />
                <Input
                type="integer"
                id="fat"
                autoComplete="off"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                />
                <Input
                type="integer"
                id="calories"
                autoComplete="off"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                />
                
                <SubButton type="submit"> Append Macros </SubButton>
               
                </Form>
                <DeleteButton onClick={handleDelete}>Delete</DeleteButton>

            </CardContent>

        </Card>
    )
}

export default MealCard
