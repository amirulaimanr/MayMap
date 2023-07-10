import React from "react";
import MapView from "./components/MapView";
import CustomFooter from "./components/CustomFooter";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import logo from "./img/logo.png";

const App = () => {
  return (
    <div>
      <div className="flex items-center justify-content-center mt-6">
        <img src={logo} alt="Logo" className="w-7rem h-7rem mr-2" />
        <h1 className="font-bold text-center text-6xl">MayMap</h1>
      </div>
      <h4 className="text-center text-xl">
        Your Personal Guide to the World Around You
      </h4>

      <MapView />
      <CustomFooter />
    </div>
  );
};

export default App;
