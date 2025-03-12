import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import Navbar from "./components/Navbar";
import HomeComponent from "./components/HomeComponent";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              
              <Route element={<PrivateRoute />}>
                <Route path="/add" element={<AddProduct />} />
                <Route path="/list/:userId" element={<ProductList />} />
              </Route>
              
              <Route path="*" element={<HomeComponent />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
