import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Approutes from './utis/AppRoutes'
import { UserProvider } from './Context/UserContext';



function App() {



  return <>
  <UserProvider>
  <Router>

      <Routes>
        {Approutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  </UserProvider>
 
   
  </>
}

export default App