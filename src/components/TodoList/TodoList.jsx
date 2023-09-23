import './TodoList.css';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import Todo from '../Todo/Todo';

//Mui Components
import Container from '@mui/material/Container';
import { Button, Card, CardContent, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

//other
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
const [titleInput , setTitleInput] = useState("")
const {todos,setTodos} = useContext(TodosContext)
const [dispalyedTodo,setDispalyedTodo] = useState("all")

const completedTodos = todos.filter((t)=>{
    return t.isCompleted
})

const notCompletedTodos = todos.filter((t)=>{
    return !t.isCompleted
})

let todosToBeRended = todos;
if (dispalyedTodo == 'completed') {
     todosToBeRended = completedTodos;
}else if (dispalyedTodo == 'not-complete') {
     todosToBeRended = notCompletedTodos;
}else {
     todosToBeRended = todos;
}

const todosItration = todosToBeRended.map((i)=>{
    return <Todo  key={i.id} todo = {i}  />
})

function ChangeType (e) {
    setDispalyedTodo(e.target.value)
}

function handelAddClick() {
    const newTodo = {
        id : uuidv4() ,
        title : titleInput,
        descripstion : '',
        isCompleted : false
    };
    const updatedTodos = [...todos , newTodo ]
    setTodos(updatedTodos)
    localStorage.setItem( "todos" , JSON.stringify(updatedTodos) )
    setTitleInput("")
}

    useEffect(()=>{
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos)
    }, [])

    return (
<Container maxWidth="sm">
    <Card sx={{minWidth: 275 }} style={{maxHeight:'80vh',overflow:'scroll'}}>
        <CardContent style={{textAlign:'center'}}>
            <Typography   variant="h5" gutterBottom  >
            مهامي
            </Typography>
            <Divider />

            {/* S Filter Buttons */}
            <ToggleButtonGroup 
            style={{direction:'ltr'}}
            color="primary"
            value={dispalyedTodo}
            onChange={ChangeType}
            exclusive
            aria-label="Platform">
                <ToggleButton value="not-complete">الغير منجز</ToggleButton>
                <ToggleButton value="completed">المنجز</ToggleButton>
                <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* E Filter Buttons */}

            {/* S All Todos */}
            {todosItration}
            {/* E All Todos */}

            {/* S Input + Add Button */}
                <Grid container style={{marginTop:'20px'}} spacing={2} >
                    <Grid xs={8}  style={{display:'flex' , justifyContent:'space-around' , alignItems: 'center' }}>
                        <TextField value={titleInput} onChange={(e)=>setTitleInput(e.target.value)} id="outlined-basic" label="عنوان المهمة" variant="outlined" style={{width:'100%'}} />
                    </Grid>
                    <Grid xs={4}  style={{display:'flex' , justifyContent:'space-around' , alignItems: 'center' }}>
                        <Button  variant="contained" disabled={titleInput.length == 0} onClick={handelAddClick} style={{width:'80%', height : "100%"}}>أضاقة</Button>
                    </Grid>
                </Grid>
            {/* E Input + Add Button */}
        </CardContent>
    </Card>
</Container>
    );
}
