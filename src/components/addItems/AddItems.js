import { useState,useContext,useEffect } from "react";
import Completed from "../completed/Completed";
import TodoList from "../todoList/TodoList";
import { v4 as uuidv4 } from 'uuid';

import "./additems.css";
import ThemeContext from "../ThemeContext";
import ThemeProvider from "../ThemeProvider";

const AddItem = () => {
    const [tasks, setTasks] = useState(() => {
        const storedCompletedTasks = JSON.parse(localStorage.getItem("addTask")) || [];
        return [...storedCompletedTasks];
    });
    const [inputValue, setInputValue] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [completed, setCompleted] = useState([]);

    const currentDate = new Date().toLocaleString('en-US', {weekday: 'long'});
    const { themeButton } = useContext(ThemeContext);

const handlerInputChange = (e) => {
      let textInp = e.target.value;
      if(textInp.length <= 70){
         setInputValue(textInp);
      } 
}
   
const handlerAdd = (e) => {
      e.preventDefault();
      if(inputValue.trim() === ""){
         return;
      }
      setTasks([...tasks, { id: uuidv4(), value: inputValue + ` - ${currentDate}` }]);
      setInputValue("");
      setEditingIndex(tasks.length);
    }

useEffect(() => {
    localStorage.setItem("addTask", JSON.stringify(tasks));
}, [tasks]);

const handlerDelete = (id) => {
        const newTasks = tasks.filter(task => task.id !== id);
              setTasks(newTasks);
}
const handlerCompleted = (id) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        const completedTask = tasks[taskIndex];
              setCompleted((prevState) => [...prevState, completedTask]);
        const newTasks = [...tasks];
              newTasks.splice(taskIndex, 1);
              setTasks(newTasks);
        console.log(completedTask)    
}

const renderItems = (arr) => {
    const items = arr.map((item) => {
        if (item.id === editingIndex) {
            return (<li key={item.id}
                        className="list_save">
                   <div className="date_number">
                   {item.value}
                   </div>    
                <input
                maxLength={50} 
                className="task_value"
                type="text"
                defaultValue={item.value}
                onChange={(e) => {
                    const newTasks = [...tasks,];
                    const taskIndex = newTasks.findIndex(task => task.id === item.id);
                    newTasks[taskIndex] = { ...newTasks[taskIndex], value: e.target.value };
                    setTasks(newTasks);
                }}
                />
                    <button 
                           onClick={() => setEditingIndex(null)}
                           className="save_task"
                    >Save</button>

                </li>)
          }else {
            return (
                <li key={item.id}
                    className="list_edit">
                        <input type="checkbox" 
                               className="checkbox_completed"
                               onClick={() => handlerCompleted(item.id)}/>
                        <p className="task_todo_value">{item.value}</p>
                    <div>
                        
                    </div>
                    <button 
                          onClick={() => setEditingIndex(item.id)}
                          className="edit_task"
                    >Edit</button>
                    <button 
                          onClick={() => handlerDelete(item.id)}
                          className="delete_task"
                    >Delete</button>
                </li>
            );
        }
    })      
    return (<ol className="items_list">
              {items}
           </ol>
           ) 
}
    const items = renderItems(tasks);
    return(<div>
                <form 
                    className="form_add"
                    onSubmit={handlerAdd}
                    >
                <input className="input_add"
                    maxLength={50} 
                    type="text"
                    value={inputValue}
                    onChange={handlerInputChange} />
                <button className="btn_add" type="submit" style={themeButton} >Add</button>
            </form>
            <TodoList task={items}/>
            <Completed completed={completed} deleteTask={handlerCompleted}/> 
        </div>
        )
}

function AppWithThemeProvider() {
    return (
      <ThemeProvider>
        <AddItem />
      </ThemeProvider>
    );
  }

export default AppWithThemeProvider;