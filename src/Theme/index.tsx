import React from "react";

export interface Theme {
  background: string,
  machine: string,
  border: string,
  measureBorder: string,
  button: string,
  text: string,
  name: string
}

const themeMap = new Map<string, Theme>();

export const THEMES = {
  DEFAULT: {
    background: "#F7D87C",
    machine: "#28CCFA",
    border: "5px solid black",
    measureBorder: "2px solid gray",
    button: "white",
    text: "black",
    name: "default"
  },
  DARK: {
    background: "gray",
    machine: "gray",
    border: "5px solid black",
    measureBorder: "2px solid white",
    button: "blue",
    text: "white",
    name: "dark"
  }
}

themeMap.set(THEMES.DEFAULT.name, THEMES.DEFAULT);
themeMap.set(THEMES.DARK.name, THEMES.DARK);

export const addTheme = (name: string, theme: Theme) => themeMap.set(name, theme);
export const getTheme = (name: string) => {
  const result = themeMap.get(name);
  if (!result) {
    throw new Error(`No theme of name ${name}!`);
  }
  return result;
}
export const getThemeNames = () => themeMap.keys();
export const Context=React.createContext<Theme>(THEMES.DEFAULT)

export default {
  THEMES: THEMES,
  addTheme: addTheme,
  getTheme: getTheme,
  getThemeNames: getThemeNames,
  Context: Context
}
