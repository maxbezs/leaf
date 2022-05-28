/* Libraries Imported */
import React, {createContext} from "react";
import Panel from "../Panels/Panel"
import Inputpanel from "../Panels/InputPanel";
import PanelUsers from "../Panels/PanelUsers";
import PanelFinance from "../Panels/PanelFinance";
import PanelNotification from "../Panels/PanelNotification";
import HomePage from "../PanelPages/HomePage";
import FinancePage from "../PanelPages/FinancePage"
import ShopPage from "../PanelPages/ShopPage"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from "react"
import Profilee from "./Profilee"
import Notification from "../PanelPages/Notification"
export const AppContext = createContext(null);

const Menu = () => {
  /* Set variables*/
  const [address, setAddress] = useState("");
  const [activePanel, setActivepanel] = useState("FirstTool")
  /* Set active tool*/
  const activetool = (number)=>{
    setActivepanel(number);
  }
  return (
    <>
      <AppContext.Provider value={{address, setAddress}}>
        <Switch>
          <Router>
            <Route exact path="/">
              <div className="out">
                <div className="in1">
                  <Router>
                    <div className="in11">
                      <Panel activetool={activetool}/>
                      <Inputpanel/>
                    </div>
                    <div className="in12">
                      {activePanel === "FirstTool" && <HomePage/>}
                      {activePanel === "SecondTool" && <FinancePage/>}
                      {activePanel === "ThirdTool" && <ShopPage/>}
                      {activePanel === "FourthTool" && <Notification/>}
                    </div>
                  </Router>
                </div>
                <div className="in2">
                  <PanelUsers/>
                  <PanelFinance activetool={activetool}/>
                  <PanelNotification activetool={activetool}/>
                </div>
              </div>
            </Route>
            <Route path="/profile">
              <Profilee/>
            </Route>
          </Router>
        </Switch>
      </AppContext.Provider>
    </>
  );
};

export default Menu;