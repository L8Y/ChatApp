import { Routes, Route } from "react-router-dom";
import Fire from "./Fire";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Form from "./component/Form";
import Home from "./component/Home"
import { useDispatch, useSelector } from "react-redux"
import { curentUserEmail } from "./actions";

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLogged)
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(curentUserEmail(user.email));
      } else {
        dispatch(curentUserEmail(null));
      }
    });
  }, []);

  const logout = () => {
    signOut(auth);
  };

  return (
    <main>
      {isLoggedIn ? (
        <Home logout={logout} email={isLoggedIn} />
      ) : (
        <Routes>
          <Route path="/" element={<Form pageTitle="LOGIN" />} />
          <Route path="/Register" element={<Form pageTitle="REGISTER" />} />
        </Routes>
      )}
    </main>
  );
}

export default App;
