import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./completed.css";
const Completed = (props) => {
      const {completed} = props;
      const [completedTasks, setCompletedTasks] = useState(() => {
      const storedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
      return [...completed, ...storedCompletedTasks];
    });
    useEffect(() => {
            setCompletedTasks((prevTasks) => {
              const uniqueTasks = completed.filter(task => !prevTasks.some(prevTask => prevTask.id === task.id));
              return [...prevTasks, ...uniqueTasks];
            });
          }, [completed]);

    useEffect(() => {
            console.log(completedTasks);
            localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        }, [completedTasks]);
        
    const deleteTask = (id) => {
        const newTasks = completedTasks.filter(task => task.id !== id);
        setCompletedTasks(newTasks);
    }
    const usedIds = [];

    return( <div className="completed_list">
            <h3>Completed</h3>
            <div className="line_completed"></div>
            {completedTasks.map((task) => {
               if (usedIds.includes(task.id)) {
                return null;
              }
              usedIds.push(task.id);
              return (<ul key={uuidv4()}>
                <li className="word_completed_wrap">
                    {task.value}
                    <button 
                          onClick={() => deleteTask(task.id)}
                          className="delete_task_completed"
                    >Delete</button> 
                </li>
              </ul>)
           })}
  </div>)
}
export default Completed;