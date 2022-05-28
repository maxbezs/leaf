/* Libraries Imported */
import React from "react";
import Home from '../img/home.svg';

import Diagram  from '../img/diagram.svg';
import Shops  from '../img/shops.svg';
import Noti  from '../img/noti.svg';

const Panel =({activetool})=>{
  return (
    <div className="in111">
        <div style={{paddingTop: "5px", paddingBottom: "5px", paddingLeft: "10px", paddingRight: "10px", position: "relative", display:"flex"}}>
            <div className="link" >
                {/* Display first tool */}
                <button onClick={() => activetool("FirstTool")} className="button_panel0"><img src={Home} style={{width: "80%", height: "auto"}} alt="fireSpot"/></button>
            </div>
            <div className="link">
                {/* Display second tool */}
                <button onClick={() => activetool("SecondTool")} className="button_panel1"><img src={Diagram} style={{width: "80%", height: "auto"}} alt="fireSpot"/></button>
            </div>
            <div className="link">
                {/* Display third tool */}
                <button onClick={() => activetool("ThirdTool")} className="button_panel2"><img src={Shops} style={{width: "80%", height: "auto"}} alt="fireSpot"/></button>
            </div>
            <div className="link">
                {/* Display fourth tool */}
                <button onClick={() => activetool("FourthTool")} className="button_panel3"><img src={Noti} style={{width: "70%", height: "auto"}} alt="fireSpot"/></button>
            </div>
        </div>     
    </div>
  );
}

export default Panel;