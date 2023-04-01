import React from "react";

const TodoList = (props) => {

    const { task } = props;
    const items = task
   
    return( <div className="todo_list">
            <h3>TODO</h3>
            <div className="line_todo"></div>
            {items}
  </div>)
}
export default TodoList;