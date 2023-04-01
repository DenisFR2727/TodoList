import React,{ useContext } from "react";

import AddItem from "./components/addItems/AddItems";
import DateTodo from "./components/date/Date.js";
import ThemeContext from "./components/ThemeContext";
import ThemeProvider from "./components/ThemeProvider";

import "./App.css";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="todo" style={theme}>
            <div className="date">
              <h3>ADD ITEM</h3>
              <button onClick={toggleTheme} className="them_button">Theme</button>
              <div><DateTodo /></div>
            </div>
            <div className="line_add"></div>
            <AddItem />
            <div className="completed_list">
            </div>
        </div>
  );
}

function AppWithThemeProvider() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWithThemeProvider;
