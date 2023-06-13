import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import Axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {
  const [login, setLogin] = useState(false);

  Axios.defaults.withCredentials = true;
  Axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
  };
  Axios.defaults.credentials = 'include';

  const [user,setUser]=useState("");

  useEffect(()=>{
    Axios.get("http://localhost:4000/login").then((response) => {
      if (response.data.isAuthenticated) {
        updateUser(response.data.user);
      } else {
        console.log("bye")
      }
    })
  },[])

  function updateUser(newUser){
    // console.log(newUser.username);
    // setUser({username: newUser.username})
    setUser(newUser.username);
    console.log(user);
    setLogin(true);
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />;
          <Route path="/login" element={<Login updateUser={updateUser}/>} />
          <Route path="/signup" element={<Signup updateUser={updateUser}/>} />
          <Route path="/main" element={ login && <Main user={user}/>} />
          <Route path="/*" element={ <Navigate to="/"/>} />

        </Routes>
      </BrowserRouter>

  );
}

export default App;
