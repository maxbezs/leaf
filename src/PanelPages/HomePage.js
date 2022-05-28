/* Libraries Imported */
import React from "react";
import OpenTop from '../img/opentop.svg';
import Plumpic  from '../img/plumpic.png';
import Figpic  from '../img/figpic.png';
import Peasimage  from '../img/peasimage.png';
import Almond  from '../img/almond.png';
import Pricedown  from '../img/pricedown.png';


function HomePage() {
  return (
    <div className="in121">
        <div className="content">
        <div className="dfdf">
          <div className="component1" >
            <div className="topcomp">
              <img src={Plumpic} alt="fireSpot" className="imgtop"/>
              <label className="labelst33">Name: Plumpic</label>
              <label className="labelst33">Price: 2,5$</label>
              <label className="labelst33">Weight: 1kg</label>
              <label className="labelst33">Quantity: 234</label>
            </div>
          </div>
          <div className="component1" >
            <div className="topcomp">
              <img src={Figpic} alt="fireSpot" className="imgtop"/>
              <label className="labelst33">Name: Figpic</label>
              <label className="labelst33">Price: 3$</label>
              <label className="labelst33">Weight: 1kg</label>
              <label className="labelst33">Quantity: 231</label>
            </div>
          </div>
          <div className="component1" >
            <div className="topcomp">
              <img src={Peasimage} alt="fireSpot" className="imgtop"/>
              <label className="labelst33">Name: Peasimage</label>
              <label className="labelst33">Price: 0,7$</label>
              <label className="labelst33">Weight: 100g</label>
              <label className="labelst33">Quantity: 230</label>
            </div>
          </div>
          <div className="component1" >
            <div className="topcomp">
              <img src={Almond}  alt="fireSpot" className="imgtop"/>
              <label className="labelst33">Name: Almond</label>
              <label className="labelst33">Price: 1$</label>
              <label className="labelst33">Weight: 100g</label>
              <label className="labelst33">Quantity: 229</label>
            </div>
          </div>
          <button className="opentop"><img src={OpenTop}  alt="fireSpot" className="sss"/></button>
        </div>
        <div>
          <label className="labelst1">Monthly income:</label>
        </div>
        <div className="fggg">
          <label className="labelst34">$145.32 <img src={Pricedown} className="nnn" alt="fireSpot"/></label>
        </div>
        <div>
          <label className="labelst1">Last message:</label>
          <div className="lastmassege">
            <label className="labelst35">Dear Mr. Bloomfield, On behalf of Handy Helpout, I would like to thank you for the very generous support you have given to our annual holiday celebrations over the last few years. Thank you so much.</label>
          </div>
        </div>
        </div>
    </div>
  );
}

export default HomePage;