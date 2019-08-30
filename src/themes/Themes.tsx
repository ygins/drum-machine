import React from "react";

interface Theme {
  background: String,
  border: String,
  button: String,
  text: String
}

const themeMap = new Map<string, Theme>();
export default {
  Context: React.createContext<string>("dark"),
  addTheme: (name: string, theme: Theme) => themeMap.set(name, theme),
  getTheme: (name: string) => themeMap.get(name)
}
