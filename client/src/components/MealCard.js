// //get request to meal 
import React,{useState} from 'react'
import styled from 'styled-components'


const Card = styled('div')`
display:flex;
flex-flow: column wrap;
justify-content: space-around;
width:100%;
border: 1px solid black;

`;
const CardContent = styled('div')`
display:flex;
flex-flow: column wrap;
justify-content: space-between;
width:100%;
border: 1px solid black;
background-color: #4d4d4d;`
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
border: 1px solid black;`

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
            <h1>Time: </h1>
            <CardContent>
                <Key><H1>name of meal</H1><H1>Protein</H1>
                    <H1>Carbs</H1><H1>Fat</H1><H1>Calories</H1>
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
                <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
                </Form>


            </CardContent>

        </Card>
    )
}

export default MealCard
