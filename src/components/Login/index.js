import React,{ Component,useState,useEffect,useRef } from 'react';
import {Redirect,withRouter,Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import logo_t from '../../img/logo_t.png';
import logo_i from '../../img/logo_i.png';
import * as co from '../../common';

function Loginform(props){
    const dispatch = useDispatch();
    const mem_userid = co.useInput('');
	const mem_password = co.useInput('');
    const login = () =>{
		co.login_ck(mem_userid.value,mem_password.value,props);
    }
    return(<div>
        {localStorage.mem_userid === undefined?
        <div className="login_box">
            <div className="login_bg"></div>
            <div className="login_content">
                <img src={logo_i}/>
                <p className="title"><img src={logo_t}/></p>
                <div className="login_form">
                    <input className="login_txet" {...mem_userid} placeholder="id" type="text"/>
                    <input className="login_txet" {...mem_password} placeholder="password" type="password"/>
                    <input className="login_submit" value="Sign In" onClick={login} type="button"/>
                    <Link to = "/join" >
                        <input className="join login_submit" value="Sign Up" type="button"/>
                    </Link>
                    <Link to = "/main">
                        <div className="skip_login">Skip Login</div>
                    </Link>
                </div>
            </div>
        </div>: <Redirect to="/main"/>
        }
    </div>);
}
export default withRouter(Loginform);
