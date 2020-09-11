import React from 'react';
import { Redirect } from "react-router-dom";
function Logout(){
  localStorage.clear();
  window.location.href = '/login';
  return (<Redirect to="/"/>);
}

export default Logout;
