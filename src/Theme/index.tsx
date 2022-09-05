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

export const THEMES: Theme[] = [
  {
    background: "#F7D87C",
    machine: "#28CCFA",
    border: "5px solid black",
    measureBorder: "2px solid gray",
    button: "white",
    text: "black",
    name: "default"
  },
  {
    background: "gray",
    machine: "gray",
    border: "5px solid black",
    measureBorder: "2px solid black",
    button: "black",
    text: "white",
    name: "dark"
  },
  {
    background: "black",
    machine: "white",
    border: "5px solid black",
    measureBorder: "2px solid black",
    button: "black",
    text: "white",
    name: "ghost"
  },
  {
    background: "red",
    machine: "yellow",
    border: "5px solid black",
    measureBorder: "2px solid black",
    button: "orange",
    text: "yellow",
    name: "hot dog"
  },
  {
    background: "red",
    machine: "darkred",
    border: "10px solid darkred",
    measureBorder: "2px solid darkred",
    button: "red",
    text: "darkred",
    name: "red"
  },
  {
    background: "red",
    machine: "white",
    border: "10px solid yellow",
    measureBorder: "2px solid black",
    button: "black",
    text: "white",
    name: "antidisestablishmentarianism"
  },
  {
    background: "pink",
    machine: "red",
    border: "25000000000000000000000000000000000000000px solid black",
    measureBorder: "250px solid black",
    button: "yellow",
    text: "pink",
    name: "idk"
  }
]
THEMES.forEach(theme=>themeMap.set(theme.name, theme));

export const addTheme = (name: string, theme: Theme) => themeMap.set(name, theme);
export const getTheme = (name: string) => {
  const result = themeMap.get(name);
  if (!result) {
    throw new Error(`No theme of name ${name}!`);
  }
  return result;
}
export const getThemeNames = () => themeMap.keys();
export const Context = React.createContext<Theme>(THEMES[0])

export default {
  THEMES: THEMES,
  addTheme: addTheme,
  getTheme: getTheme,
  getThemeNames: getThemeNames,
  Context: Context
}
