import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    backgroundColor: "#00CED1",
    color: "#0000CD",
    borderRadius: '40px',
  });
  const [themeButton, setThemeButton] = useState({
    backgroundColor: "cornflowerblue", 
  })

  const toggleTheme = async () => {
    const newTheme =
      theme.backgroundColor === "#00CED1"
        ? { backgroundColor: "#FF1493", color: "#5200cc", boxShadow: '10px 5px 5px'  }
        : { backgroundColor: "#00CED1", color: "#0000CD", borderRadius: '40px' };
    setTheme(newTheme);

    const newThemeButton = 
      themeButton.backgroundColor === "cornflowerblue"
        ? { backgroundColor: "red" }
        : { backgroundColor: "cornflowerblue" }
    setThemeButton(newThemeButton);
  };
 

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeButton}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;