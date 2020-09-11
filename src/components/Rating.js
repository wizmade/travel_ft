import React, { Component, useEffect,useState } from 'react';
import * as co from "../common.js";
import Axios from 'axios';
import {Redirect,Link, useParams} from 'react-router-dom';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import "./css/Rating.scss";

function Rating(props) {
    let {idx} = useParams();
    const [memberInfo, setMemberInfo] = useState([]);
    const [rateData, setRateData] = useState([]);
    const ac_name = "Accompany";

    const ratePost = () => {
        const form = new FormData();
        for(let i=0; i<rateData.length; i++) {
            form.append(rateData[i].userid, rateData[i].rate, "200");
        }
        Axios.post(co.SITE_URL+"app_member/member_update3",form).then(
            res => {console.log(res);}
        );
        Axios.get(co.SITE_URL+
            "app_member/member_rated?rated=200&userid="+localStorage.mem_userid
            +"&ac_idx="+idx).then(
            res => {console.log(res);}
        );
        props.history.push("/");
    }
    const echoData = async (userid, rate, isClick) => {
        if(!isClick) {
            setRateData([...rateData, {userid : userid, rate : rate }]);
        } else {
            setRateData(rateData.filter(item => item.userid !== userid));
        }
    }

    useEffect(() => {
        console.log(rateData);
        const method = "/app_accompany/accom_memlist/"+idx+"?userId="+localStorage.mem_userid;
        Axios.get(co.SITE_URL+method).then(res => {
            const lists = res.data.map((data,key) => {
                return(
                    <RateCard
                        image = {data.mem_photo}
                        name = {data.mem_username}
                        userid = {data.mem_userid}
                        id = {key}
                        key = {key}
                        echoData = {echoData}
                    />
                )
            });
            setMemberInfo(lists);
        })
    },[rateData])

    return (
        <div className="rate_page">
            <div className="rate_title">
                How was the <span>{ac_name}</span> event?
            </div>
            <div className="rate_member">
                {memberInfo}
            </div>
            <div className="rate_btn">
                <button className="submit" onClick={ratePost}>Submit</button>
                <button className="cancel" onClick={()=>props.history.goBack()}>Cancel</button>
            </div>
        </div>
    )
}

function RateCard({image, name, userid, id, echoData}) {
    const [isClick, setClick] = useState(false);
    const thumbsUp = () => {
        const items = []; 
        for (let i=0; i<5; i++) {
            items.push(
                <div className={'ThumbsUp '+id+" "+i} key={i} onClick={onClickHandler} >
                    <FaRegThumbsUp />
                </div>
            );
        }
        return(
            items
        )
    }
    const onClickHandler = (e) => {
        const clsNameArr = e.currentTarget.className.split(" ");
        const arrayIndex = Number(clsNameArr[1]) * 5 + Number(clsNameArr[2]);
        const thumbsHTML = document.querySelectorAll(".ThumbsUp");

        if(!isClick) {
            let i = 0;
            for(i=0; i<=Number(clsNameArr[2]); i++) {
                thumbsHTML[arrayIndex-i].innerHTML = ReactDOMServer.renderToString(<FaThumbsUp />);
            }
            setClick(true);
            console.log(isClick);
            echoData(userid, i, isClick);
        } else {
            let i = 0;
            for(i=0; i<5; i++) {
                thumbsHTML[Number(clsNameArr[1])*5+i].innerHTML = ReactDOMServer.renderToString(<FaRegThumbsUp />);
            }
            setClick(false);
            echoData(userid, i, isClick);
        }
    }
    const mOverHandler = (e) => {
        e.currentTarget.innerHTML = ReactDOMServer.renderToString(<FaThumbsUp />);
    }
    return (
        <div className="rate_card" style={colorHandler[id%4]}>
            <div className="mem_info" >
                <div className="mem_img">
                    <img src={image}/>
                </div>            
                <div className="mem_data">
                    <div className="mem_name">{name}</div>
                    <div className={"mem_rate "+id}>
                        {thumbsUp()}
                    </div>
                </div>
            </div>
        </div>
    )
}

const colorHandler = [
    {
        background: "#f79d00",
        background: "-webkit-linear-gradient(to right, #64f38c, #f79d00)",  
        background: "linear-gradient(to right, #64f38c, #f79d00)"
    },
    {
        background: "#67B26F",
        background: "-webkit-linear-gradient(to right, #4ca2cd, #67B26F)",
        background: "linear-gradient(to right, #4ca2cd, #67B26F)",

    },
    {
        background: "#1FA2FF",
        background: "-webkit-linear-gradient(to right, #A6FFCB, #12D8FA, #1FA2FF)",
        background: "linear-gradient(to right, #A6FFCB, #12D8FA, #1FA2FF",

    },
    {
        background: "#D3959B",
        background: "-webkit-linear-gradient(to right, #BFE6BA, #D3959B)",
        background: "linear-gradient(to right, #BFE6BA, #D3959B)",

    }
];

export default Rating;