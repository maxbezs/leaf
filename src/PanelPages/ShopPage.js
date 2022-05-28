/* Libraries Imported */
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; 
import React from 'react';
import Tableproducts from '../Components/Tableproducts';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import ProductCategoryModal from '../Components/ProductCategoryModal';
import ProductShopModal from '../Components/ProductShopModal';

function ShopPage() {
  /* Set variables*/
  return (
    <Router>
      {/* Main rounting for third tool */}
      <div className="in121">
        <div className="tableall">
          <Switch>
            <Route exact path="/">
              <ProductShopModal/>
            </Route>
            <Route exact path="/:id">
              <ProductCategoryModal/>
            </Route>
            <Route exact path="/:id/:product">
              <Tableproducts/>
            </Route>
          </Switch>
        </div>
    </div>
  </Router>
  );
}

export default ShopPage;