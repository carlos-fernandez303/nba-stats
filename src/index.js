import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import NavComponent from "./components/NavComponent/NavComponent";
import Home from "./components/Home/Home";
import Players from "./components/Players/Players";
import Teams from "./components/Teams/Teams";
import About from "./components/About/About";
import Results from "./components/Results/Results";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="about" element={<About />} />
          <Route path="players" element={<Players />} />
          <Route path="players/results" element={<Results />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
