import React, { useState } from 'react';
import { Link, Redirect, BrowserRouter, Route } from "react-router-dom";
import {SITE_URL} from '../common';
import Axios from 'axios';
import "./css/select.scss";

function Select_interests(props) {
    const DIR_NAME = "/interest_img", CLASS_NAME = "type_card";
    const types = props.location.state.types;
    const backPath = props.location.state.backPath;
    const [interest,setInterest] = useState([]);
    const [redirect, setRedirect] = useState([<></>]);
    console.log(types);
    const clickBox = (e) => {
        if (e.target.style.filter === "") {
            e.target.style.filter = "brightness(35%)";
            setInterest([...interest, e.target.className]);
            console.log(interest);
        } else {
            e.target.style.filter = "";
            setInterest(interest.filter((item,key) => item !== e.target.className));
        }
    }
    const memUpdate = () => {
        const method = "app_member/member_update2/";
        const typeText = types.toString();
        const interText = interest.toString();
        const param = `types=${typeText}&interests=${interText}`;
        const url = SITE_URL+method+localStorage.mem_userid+"?"+param;
        const rs = Axios.get(url).then(res=>{
            console.log(res);
        });
        if(backPath === "Login") {
            setRedirect(<Redirect to="/"/>);
        }
        else if (backPath === "Join") {
            setRedirect(<Redirect to="/Join"/>);
        }
        else if (backPath === "MyPage") {
            setRedirect(<Redirect to="/MyPage"/>);
        }
    }

    return (
        <div className="select_layout">
            <div className="select_title">
                <span className="title">What's your interests?</span>
                <span className="sub_title">You can update later</span>
                <Link to={{
                    pathname : "/Select_type",
                    state : {
                        backPath : props.location.state.backPath
                    }
                }}>
                    <span className="prev"><i className="fas fa-chevron-left"></i> Previuos</span>
                </Link>
                <span className="next" onClick={memUpdate}>Go Tribby <i className="fas fa-chevron-right"></i></span>
            </div>
            <div className="select_type">
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Adventure.jpg"} className="Adventure" onClick={clickBox}/>
                    <span>Adventure</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Photography.jpg"} className="Photography" onClick={clickBox}/>
                    <span>Photography</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Solo_Travel.jpg"} className="Solo Travel" onClick={clickBox}/>
                    <span>Solo Travel</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Backpacking.jpg"} className="Backpacking" onClick={clickBox}/>
                    <span>Backpacking</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Outdoors.jpg"} className="Outdoors" onClick={clickBox}/>
                    <span>Outdoors</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Shopping.jpg"} className="Shopping" onClick={clickBox}/>
                    <span>Shopping</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Cultural_Study.jpg"} className="Cultural Study" onClick={clickBox}/>
                    <span>Cultural Study</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Meet_Locals.jpg"} className="Meet Locals" onClick={clickBox}/>
                    <span>Meet Locals</span>
                </div>
            </div>
            <div className="skip">
                <Link to="/"><span>SKIP</span></Link>               
            </div>
            {redirect}
        </div>
    );
}

export default Select_interests

