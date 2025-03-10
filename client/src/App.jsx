import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import Navbar from "./components/Navbar";
import HomeComponent from "./components/HomeComponent";
import "./App.css";


function App() {



  return (
    <Router>
      <ThemeProvider>
        <div className="flex flex-col h-screen">
          <Navbar />

          <div className="flex-1">
            <Routes>
          
              <Route path="*" element={<HomeComponent />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
