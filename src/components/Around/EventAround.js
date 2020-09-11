import React, { Component, PropTypes, useEffect, useState } from 'react';
import List_card from '../List_card/';
import { connect } from 'react-redux';
import { Redirect,Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { update_head } from "../../actions";
import * as co from "../../common.js";
import Axios from 'axios';
import { any } from 'prop-types';
import Modal from '../Modal';
function EventAround(props){
    const dispatch = useDispatch();
    dispatch(update_head());
    const method = "app_around/event_list/";
    const url = co.SITE_URL+method;
    const[list,setList] = useState();
    const[order,setOrder] = useState("");
    const textArray = props.scTextEvent.split("@");
    const form = new FormData();

    const distanceTransfer = (distance) => {
        if(textArray[6] === "mile") {
            return distance =Math.floor(distance * 0.621371) +" miles";
        } else {
            return distance+" km";
        }    
    }

    useEffect(() => {
        const pram = "order="+order+"&sctext="+props.scTextEvent;
        const urls = url+localStorage.mem_userid+"?"+pram;
        const rs = Axios.get(urls).then(res=>{
            console.log(res.data);
            if(Array.isArray(res.data)){
                const lists = res.data.map((data,key) =>{
                    if(data.ac_condition === "100") {
                        return(
                            <List_card
                                image={"http://1.234.44.171/uploads/accs/"+data.ac_img}
                                title={data.ac_title}
                                text={data.ac_loc}
                                date={data.ac_date}
                                start={data.ac_start}
								end={data.ac_end}
                                idx={data.ac_idx}
                                memImage={data.mem_photo}
                                name={data.mem_username}
                                tag={distanceTransfer(data.distance)}
                                star={data.mem_star}
                                key={key}
                            />
                        )
                    }
                });
                setList(lists);
            }else{
                alert("No results were found for your search.");
                props.history.push("/AroundSearch");
            }
        });
    },[,props.scTextEvent]);

    return(
        <div className="app_content open">
            <div className="banner">
                <img src={"http://tribbycommunity.com/uploads/adventure.jpg"}/> 
                <div className="banner_bg event">
                    <div className="title banner_child">Event Around You</div>
                    <Link to={`/AroundSearch${props.location.pathname}`}>
                        <div className="filter banner_child">
                            <span>Advanced Filters</span>
                        </div>
                    </Link>
                    <Link to="/MateAround">
                        <div className="change_btn banner_child">Mate</div>
                    </Link>
                
                </div>
            </div>   
        {list}
        </div>
    );
}
let mapStateToProps = (state) =>{
    return {
        scTextEvent: state.scTextEvent_val.scTextEvent
    };
}
EventAround = connect(mapStateToProps)(EventAround);
// {idx != ''?<Info idx={idx} onClick={() =>{setIdx('')} }/>:<div></div>}
export default EventAround;
