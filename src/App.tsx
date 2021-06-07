import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
export type FilterType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks]= useState([
        {id: v1(), title:"HTML&CSS", isDone:true},
        {id:v1(), title:"JS", isDone:false},
        {id:v1(), title:"React", isDone:false},
    ]);
    let [filter,setFilter] = useState<FilterType>("all");
    function removeTasks(id:string){
        let filteredTasks = tasks.filter(t=>t.id !=id)
        setTasks(filteredTasks)
    }
    let tasksForTodolist = tasks;
    if (filter ==="active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t=> t.isDone === true)
    }
    function changeFilter(value:FilterType) {
        setFilter(value)
    }
    function addTask(title:string) {
        let task = {id: v1(), title: title, idDone:false};
        let newTasks =[task,...tasks];
        // @ts-ignore
        setTasks(newTasks);
    }

    return (
        <div className="App">
            <Todolist title = "What to learn" tasks ={tasksForTodolist} removeTasks ={removeTasks}
                      changeFilter ={changeFilter} addTask ={addTask}/>
        </div>
    );
}

export default App;
