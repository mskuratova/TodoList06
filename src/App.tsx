import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, MenuItem, Paper, Toolbar, Typography} from "@material-ui/core";
import { Menu } from '@material-ui/icons';

export type FilterType = "all" | "active" | "completed"
export type TodoListType = {
    id: string,
    title:string,
    filter: FilterType
}
type TasksStateType ={
    [key:string]: Array<TasksType>
}
function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()
    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
    ],
        [todoListID2]:[
            {id:v1(),title: "Milk", isDone: true},
        {id:v1(), title: "Book", isDone: true},
    ]});

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},

    ])

    function removeTasks(id: string, todolistID:string) {
        let todoListTasks = tasks[todolistID];
        tasks[todolistID] = todoListTasks.filter(t => t.id != id)
        setTasks({...tasks})
    }
    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [task, ...todolistTasks];
        setTasks({...tasks});
    }
    function changeFilter(value: FilterType, todolistID: string) {
        let todoList = todoLists.find(tl => tl.id === todolistID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }
    function changeStatus(id: string, isDone: boolean, todolistID: string) {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(id: string, newTitle: string, todolistID: string) {
        let todolistTasks = tasks[todolistID];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }

    }
    function changeTodolistTitle(id: string, title: string) {
        const todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = title;
            setTodoLists([...todoLists])
        }

    }

    function removeTodolist (id:string) {
        setTodoLists(todoLists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks})
    }
    function addTodolist(title:string){
        let newTodolistId =v1();
        let newTodolist :TodoListType ={ id:newTodolistId, title:title, filter: "all"};
        setTodoLists([newTodolist, ...todoLists]);
        setTasks({
            ...tasks, [newTodolistId]:[]
        })

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]
                        let tasksForTodoList = allTodolistTasks;
                        if (tl.filter === "active"){
                            tasksForTodoList = allTodolistTasks.filter(t => t.isDone === false);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodoList = allTodolistTasks.filter(t=> t.isDone === true);
                        }
                        return <Grid item>
                            <Paper style={{padding:"10px"}}>
                            <Todolist key={tl.id}
                                         id={tl.id}
                                         title={tl.title}
                                         tasks={tasksForTodoList}
                                         removeTasks={removeTasks}
                                         changeFilter={changeFilter}
                                         addTask={addTask}
                                         filter={tl.filter}
                                         removeTodolist = {removeTodolist}
                                         changeTaskStatus={changeStatus}
                                         changeTaskTitle ={changeTaskTitle}
                                         changeTodolistTitle ={changeTodolistTitle}

                            />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
            </AppBar>
        </div>
    );
}

export default App;
