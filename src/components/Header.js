import React,{ Component,useEffect,useState } from 'react';
import Head_view from './Head_view/';
import {Redirect,withRouter,Link } from 'react-router-dom';
import { connect,useDispatch, useSelector } from 'react-redux';
import logo from '../img/title_logo.png';
import * as co from '../common';
import mypage from '../img/mypage.png';
import Axios from 'axios';
import {SITE_URL} from "../common.js";
// /<Redirect to="/login"/>
function Header(props){
  console.log(props);
  const [showMenu, setShowMenu] = useState(false);
  const [logo_left, setLeft_logo] = useState(mypage);
  useEffect(()=>{
      if(localStorage.mem_userid !== undefined) {
        const url = SITE_URL+"/app_member/mem_photo/"+localStorage.mem_userid;
    Axios.get(url).then(res => {
      setLeft_logo(res.data.item.mem_photo);
    });
      }
    
    console.log(props.auth);
  },[props.auth]);
  return(
    <div className={props.auth}>
      {localStorage.mem_userid != undefined?
      <Head_view
        logo = {logo}
        logo_left = {logo_left}
        links={[
          { href: "/MateAround", name: "Around" },
          { href: "/Joined_Accompany", name: "JoinedAccompany" },
          { href: "/List_Accompany", name: "MyAccompany" },
          { href: "/Add_Accompany", name: "AddAccompany" },
          { href: "/Chat", name: "Chat" },
          { href: "/mypage", name: "Mypage" },
          { href: "/logout", name: "Logout"},
        ]}
        showMenu={showMenu}
        onClick={()=>setShowMenu(!showMenu)}/>
        :<Head_view
        logo = {logo}
        logo_left = {logo_left}
        links={[
          { href: "/login", name: "Login" },
        ]}
        showMenu={showMenu}
        onClick={()=>setShowMenu(!showMenu)}/>}
    </div>
  );
}

let mapStateToProps = (state) =>{
    return {
        auth: state.auth_con.auth
    };
}
Header = connect(mapStateToProps)(Header);

export default Header;
