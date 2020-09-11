import React, { Component, useEffect ,useState} from 'react';
import PropTypes from 'prop-types';
import List_card from './List_card/';
import Search_head from './Search_head/';
import { Link,useParams,withRouter,Redirect } from "react-router-dom";
import { FaBeer,FaArrowLeft } from 'react-icons/fa';
import Axios from 'axios';
import "./css/info.scss";
import {SITE_URL} from "../common.js";
import cal from '../img/cal.png';
import loc from '../img/loc.png';
import lang from '../img/lang.png';
import { FaThumbsUp, FaRegThumbsUp,FaMapMarkerAlt } from 'react-icons/fa';
import { object } from 'prop-types';
import Modal from './Modal';

const condition = {
    waiting : 100,
    progress : 200,
    end : 300,
};

function Info(props){
    let {idx} = useParams();
    const previousPathName = props.location.state?.previousPathName;
    const url = SITE_URL+"app_accompany/accom_info/"+idx;
    const url2 = SITE_URL+"app_accompany/accom_join_member/"+idx;
    const url3 = SITE_URL+"app_accompany/accom_condition_select/?ac_idx="+idx+"&userid="+localStorage.mem_userid;
    const [info , setInfo] = useState({});
    const [memberList , setMemList] = useState([]);
    const [rated, setRated] = useState();
    const [redirectPage, setRedirectPage] = useState(<></>);
    const [popUp, setPopUp] = useState(false);
	const [alertMsg, setAlertMsg] = useState("Complete Join.");
	const [apiResponse, setApiRes] = useState("");

    useEffect(() => {
        async function getInfo() {
            await Axios.get(url2).then(res => { setMemList(res.data); });
            await Axios.get(url).then(res => { setInfo(res.data); });
            await Axios.get(url3).then(res=> { if(res.data !== null) setRated(res.data[0].rated); })
        }
        getInfo();
    },[redirectPage]);

    const join_acom = (ac_idx) =>{
        const form = new FormData();
        const method = "app_accompany/accom_join";
        const url = SITE_URL+method;
        form.append("ac_idx",ac_idx);
        form.append("mem_userid",localStorage.mem_userid);
        const rs = Axios.post(url,form).then(res=>{
            if(res.data.rs == "Y"){
                setRedirectPage(<Redirect to={`/info/${idx}`}></Redirect>);
            } else {
                alert(res.data.msg);
            }
        });
    }
  //여정 등록 시간 표현
  //nowDate : 현재시간, submitDate: 여정등록시간 , defTime : 현재-등록시간(timestamp)
    const date_ago = (getTime) => {
        const nowDate = new Date();
        const submitDate = new Date(getTime);
        console.log(submitDate);
        const defTime = (nowDate - submitDate)/1000;
        let result;
        if (defTime < 3600) {
            result = (defTime/60).toFixed(0)+" min ago";
        } else if (defTime < 86400) {
            result = (defTime/3600).toFixed(0)+" hours ago";
        } else if (defTime < 2678400) {
            result = (defTime/86400).toFixed(0)+" days ago";
        } else {
            result = nowDate.getMonth(
                nowDate.setMonth(
                    nowDate.getMonth() - submitDate.getMonth()
                ))+" months ago";
        }
        return result;
    }
    const dateFormat = (getTime) => {

    }
    const textSlice = (text) => {
        let textArray = [];
        if(typeof(text) === "string") {
            textArray = text.split(",");
        }  
        return (textArray[1]===undefined? textArray[0]:textArray[0]+","+textArray[1])
    }
    const memImgLoad = () => {
        let imgSrc = []; 
        for(let index in memberList) {
            const innerArr = memberList[index];
            for(let key in innerArr) {
                if(key === "mem_photo") {
                    imgSrc.push(
                        <img className="ac_img" key={index} src={innerArr[key]} />
                    );
                }
            }
        }
        return imgSrc;
    }
    const btnSwitch = () => {
        let returnBtn;
        console.log(info.ac_condition)
        switch(info.ac_condition) {
            case "100" :
                let isUser = false;
                console.log(memberList);
                for(let index in memberList) {
                    const innerArr = memberList[index];
                    for(let key in innerArr) {
                        if(key === "mem_userid" && localStorage.mem_userid !== undefined) {
                            let userid = "";
                            userid = innerArr[key];
                            if (userid.toLowerCase() === localStorage.mem_userid.toLowerCase()) {
                                console.log("true");  isUser = true; 
                            } else {
                                console.log("false");
                            }
                        }
                    }
                }
                if (localStorage.mem_userid !== undefined) {
                    if(localStorage.mem_userid === info.mem_userid) {
                        if(previousPathName === "Joined_Accompany") {
                            returnBtn = (
                                <button onClick={()=>onClickHandler("Start")}>Start the Travel</button>  
                            )
                        } else {
                            returnBtn = (
                                <button onClick={()=>onClickHandler("Update")}>Edit Accompany</button>  
                            )
                        }
                    } else if (isUser) {
                        returnBtn = (
                            <button onClick={()=>onClickHandler("Remove")}>Remove from joined list</button>  
                        )
                    } else {
                        returnBtn = (
                            <button onClick={()=>join_acom(info.ac_idx)}>JOIN</button>  
                        )
                    }
                } else {
                    returnBtn = (
                        <button>You should be login</button>  
                    )
                }
                break;
            case "200" :
                if(localStorage.mem_userid === info.mem_userid) {
                    returnBtn = (
                        <button onClick={()=>onClickHandler("End")}>End the Travel</button>  
                    )
                } else {
                    returnBtn = (
                        <button className="Non-Active">Travel in progress</button>  
                    )
                }
                break;
            case "300" :
                if(rated === "100") {
                    returnBtn = (
                        <button onClick={()=>onClickHandler("Rating")}>Member Rate</button>  
                    )
                } else {
                    returnBtn = (
                        <button className="Non-Active">Member Rate</button>  
                    )
                }
                
                break;
            default : 
                returnBtn = (
                    <button>You should be login</button>  
                )
                break;
        }
        return returnBtn;
    }
    const onClickHandler = (handleValue) => {
        let method; let url; let rs;
        switch (handleValue) {
            case "Update" :
                props.history.push("/Update_Accompany/"+info.ac_idx);
                break;
            case "Remove" :
                method = "app_accompany/accom_member_delete?ac_idx="+info.ac_idx+"&mem_userid="+localStorage.mem_userid;
                url = SITE_URL+method;
                rs = Axios.get(url).then(res=>{
                    console.log(res.data);
                });
                setRedirectPage(<Redirect to={`/info/${idx}`}></Redirect>);
                break;
            case "Start" :
                method = "app_accompany/accom_condition_update?ac_idx="+info.ac_idx+"&condition="+condition.progress;
                url = SITE_URL+method;
                rs = Axios.get(url).then(res=>{
                    console.log(res.data);
                    setRedirectPage(<Redirect to={`/info/${idx}`}></Redirect>);
                });
                break;
            case "End" : 
                method = "app_accompany/accom_condition_update?ac_idx="+info.ac_idx+"&condition="+condition.end;
                url = SITE_URL+method;
                rs = Axios.get(url).then(res=>{
                    console.log(res.data);
                    setRedirectPage(<Redirect to={`/info/${idx}`}></Redirect>);
                });  
                break;
            case "Rating" :
                props.history.push("/Rating/"+info.ac_idx);
                break;
            default : break;
        }
    }
    return(
        <div className="fix_layout info_box">
            <span onClick={()=>props.history.goBack()} className='back_bnt'><i className="fas fa-times-circle"></i></span>
            <div className='ac_bg'>
                <img className="ac_bg_img" src={info.ac_img}/>
                <div className='ac_title'>{info.ac_title}</div>
                <div className='ac_loc'>
                    <i className="fas fa-map-marker-alt"></i>
                    {textSlice(info.ac_loc)}
                    <span className='ac_date'>{"  -  "+ date_ago(info.ac_date)}</span>
                </div>
            </div>
            <div className='info_box_content'> 
                <div className='content_head'>
                    <div className="mem_img">
                        <Link to={'/memberInfo/'+info.mem_userid}>
                            <img className='ac_img' src={info.mem_photo}/>
                        </Link>
                    </div>
                    <div className="head_info">
                        <div className="mem_name">{info.mem_username}</div>
                        <div className="star_box">
                            <FaThumbsUp className='FaThumbsUp'/>
                            {typeof(info.mem_star) === "string" ? 
                                Number(info.mem_star).toFixed(1):null}
                        </div>   
                        <div className="ac_tag">
                            {info.ac_tag}
                        </div>
                    </div>
                </div>
                <div className='info_mem_info'>
                    <div className='info_low'>
                        <img className='ac_img' src={loc}/>
                        <span>
                            <b>Destination</b>
                            <br/>{info.ac_loc}
                        </span>
                    </div>
                    <div className='info_low'>
                        <img className='ac_img' src={cal}/>
                        <span>
                            <b>Term</b><br/>
                            {info.ac_start} - {info.ac_end}
                        </span>
                    </div>
                    <div className='info_low'>
                        <img className='ac_img' src={lang}/>
                        <span>
                        <b>Language</b><br/>
                        {info.mem_lang}
                        </span>
                    </div>
                    <div className='info_low'>
                        <div className="mem_join">
                            {memImgLoad()}{memberList === null?0:memberList.length} Joined                   
                        </div>  
                    </div>
                </div>
                <div className='ac_memo'>
                    <span><b>Description</b><br/></span> 
                    {info.ac_memo}
                </div>
                <div className='join_bnt'>
                    {btnSwitch()}
                </div>
            </div>
            {redirectPage}
            {popUp? <Modal setPopUp={setPopUp} msg={alertMsg}/>:null}
        </div>
    );
}

export function FaThumbsUps(props){
    const items = [];
    for (var i = 0; i < props.num; i++) {
      items.push(<FaThumbsUp className='FaThumbsUp' key={i}/>);
    }
    return(
      items
    )
  }

export function FaRegThumbsUps(props){
  const items = [];
  for (var i = 0; i < props.num; i++) {
    items.push(<FaRegThumbsUp className='FaRegThumbsUp' key={i}/>);
  }
  return(
    items
  )
}

export default Info;
