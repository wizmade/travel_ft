import React, { Component, PropTypes, useEffect, useState } from 'react';
import { SITE_URL } from '../common';
import { Link,useParams } from "react-router-dom";
import { FaThumbsUp, FaRegThumbsUp,FaMapMarkerAlt } from 'react-icons/fa';
import { FaThumbsUps, FaRegThumbsUps } from "./Info";
import Axios from 'axios';
import Info from './Info';
import "./css/Member.scss";

function Member(props) {
    let {idx} = useParams();
    const [memberInfo, setMemberInfo] = useState([]);
    const [memberImg, setMemberImg] = useState("");
    useEffect(() => {
        const method = "app_member/mem_info/"+idx;
        Axios.get(SITE_URL+method).then(
            res => {
                setMemberInfo(res.data.item);
                setMemberImg("http://1.234.44.171/uploads/member_photo/"+res.data.item.mem_photo);
                console.log(res);
            }
        )
    },[])
    return (
        <div className="memberInfo__box fix_layout">
            <div className="mem__img">
                <img src={memberImg}/>
            </div>
            <span className="back_bnt" onClick={()=>props.history.goBack()}>
                <i className="fas fa-times-circle"></i>
            </span>
            <div className="mem__rows">
                <div className="mem__title mem__row">
                    <div>{memberInfo.mem_username}</div>
                    <div>{memberInfo.mem_address1}</div>
                </div>
                <div className="mem__rating mem__row"> 
                    Rating 
                    <FaThumbsUps num={memberInfo.mem_star}/>
                    <FaRegThumbsUps num={5 - memberInfo.mem_star}/>
                </div>
                <div className="mem__birth mem__row">
                    <div className="column__title">Birthday</div>
                    <div>{memberInfo.mem_birthday}</div>
                </div>
                <div className="mem__ehtn mem__row">
                    <div className="column__title">Nationality</div>
                    <div>{memberInfo.mem_ethn}</div>
                </div>
                <div className="mem__job mem__row">
                    <div className="column__title">Job</div> 
                    <div>{memberInfo.mem_job}</div>
                </div>
                <div className="mem__lang mem__row">
                    <div className="column__title">Languege</div> 
                    <div>{memberInfo.mem_lang}</div>
                </div>
                <div className="mem__interest mem__row">
                    <div className="column__title">Interest</div>
                </div>
            </div>
            
        </div>
    )
}

export default Member;