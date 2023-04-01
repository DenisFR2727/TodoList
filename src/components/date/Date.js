import { useState } from "react";

const DateTodo = () => {
    const [currentDate] = useState(new Date());
   
    return(<div className="date_todo">
           {currentDate.toLocaleDateString()}
    </div>)
}
export default DateTodo;