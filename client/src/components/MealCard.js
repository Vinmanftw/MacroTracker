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


function MealCard({setMeal}) {
    const [name, setName] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs]= useState(0);
    const [fat, setFat]= useState(0);
    const [calories, setCalories]=useState(0);


    function handleSubmit(e) {
        e.preventDefault();
        fetch("/CreateMeal", {
          method: "POST",
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
              setMeal(meal)
              
            });
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
                </Form>


            </CardContent>

        </Card>
    )
}

export default MealCard
