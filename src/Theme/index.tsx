import React from "react";

interface Theme {
  background: string,
  machine: string,
  border: string,
  trackBorder: string,
  button: string,
  text: string
}

const themeMap = new Map<string, Theme>();

const THEMES={
  DEFAULT:{
    background: "#F7D87C",
    machine: "#28CCFA",
    border: "5px solid black",
    trackBorder: "2px solid black",
    button: "blue",
    text: "white"
  }
}
themeMap.set("default", THEMES.DEFAULT);

export default {
  Context: React.createContext<Theme>(THEMES.DEFAULT),
  THEMES: THEMES,
  addTheme: (name: string, theme: Theme) => themeMap.set(name, theme),
  getTheme: (name: string) => {
    const result = themeMap.get(name);
    if (!result) {
      throw new Error(`No theme of name ${name}!`);
    }
    return result;
  }
}
