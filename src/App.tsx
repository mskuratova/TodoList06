import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
export type FilterType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks]= useState([
        {id:1, title:"HTML&CSS", isDone:true},
        {id:2, title:"JS", isDone:false},
        {id:3, title:"React", isDone:false},
    ]);
    let [filter,setFilter] = useState<FilterType>("all");
    function removeTasks(id:number){
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

    return (
        <div className="App">
            <Todolist title = "What to learn" tasks ={tasksForTodolist} removeTasks ={removeTasks} changeFilter ={changeFilter}/>
        </div>
    );
}

export default App;
