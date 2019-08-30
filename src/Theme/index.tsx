import React from "react";

interface Theme {
  background: string,
  border: string,
  button: string,
  text: string
}

const themeMap = new Map<string, Theme>();

themeMap.set("default", {
  background: "red",
  border: "black",
  button: "blue",
  text: "white"
});

export default {
  Context: React.createContext<string>("dark"),
  addTheme: (name: string, theme: Theme) => themeMap.set(name, theme),
  getTheme: (name: string) => {
    const result = themeMap.get(name);
    if (!result) {
      throw new Error(`No theme of name ${name}!`);
    }
    return result;
  }
}
