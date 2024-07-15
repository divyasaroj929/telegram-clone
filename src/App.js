import React from "react";
import MainLayout from "./components/MainLayout";
import ThemeProvider from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
