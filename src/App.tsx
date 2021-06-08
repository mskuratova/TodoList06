import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed"
type TodoListType = {
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

    function changeFilter(value: FilterType, todolistID: string) {
        let todoList = todoLists.find(tl => tl.id === todolistID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, idDone: false};
        let todolistTasks = tasks[todolistID]
        // @ts-ignore
        tasks[todolistID] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todolistID: string) {
        let todolistTasks = tasks[todolistID]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                let tasksForTodoList = allTodolistTasks;
                if (tl.filter === "active"){
                    tasksForTodoList = allTodolistTasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodoList = allTodolistTasks.filter(t=> t.isDone === true);
                }
                return <Todolist key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={tasksForTodoList}
                                 removeTasks={removeTasks}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 filter={tl.filter}
                                 changeTaskStatus={changeStatus}
                />
            })
            }
        </div>
    );
}

export default App;
