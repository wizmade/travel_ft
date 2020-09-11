import React, { Component, PropTypes,useEffect,useState } from 'react';
import MateCard from '../List_card/MateCard';
import { connect } from 'react-redux';
import {Redirect,Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { update_head } from "../../actions";
import * as co from "../../common.js";
import Axios from 'axios';
import { any } from 'prop-types';
import Modal from '../Modal';
function MateAround(props){
  const dispatch = useDispatch();
  dispatch(update_head());
  const method = "app_around/mem_list/";
  const url = co.SITE_URL+method;
  const[list,setList] = useState();
  const[order,setOrder] = useState("");
  const form = new FormData();
  const textArray = props.scTextMate.split("@");
  console.log(props.scTextMate);

  const distanceTransfer = (distance) => {
      if(textArray[6] === "mile") {
        return distance =Math.floor(distance * 0.621371) +" miles";
      } else {
        return distance+" km";
      }    
  }

  useEffect(() => {
    const pram = "order="+order+"&sctext="+props.scTextMate;
    const urls = url+localStorage.mem_userid+"?"+pram;
    const rs = Axios.get(urls).then(res=>{
        console.log(res.data);
        if(Array.isArray(res.data)){
            const lists = res.data.map((data,key) =>{
            return(
                <MateCard
                mem_img={data.mem_photo}
                name={data.mem_username}
                location={data.mem_ethn}
                birth={data.mem_birthday}
                job={data.mem_job}
                languege={data.mem_lang}
                distance={distanceTransfer(data.distance)}
                key={key}
                />
            )
            });
            setList(lists);
        }else{
            alert("No results were found for your search.");
            props.history.push("/AroundSearch");	
        }
    });
  },[,props.scTextMate]);

  return(
    <div className="app_content open">
        <div className="banner">
            <img src={"http://tribbycommunity.com/uploads/couple.jpg"}/> 
            <div className="banner_bg">
                <div className="title banner_child">Mates Around You</div>
                <Link to={`/AroundSearch${props.location.pathname}`}>
                    <div className="filter banner_child">
                        <span>Advanced Filters</span>
                    </div>
                </Link>
                <Link to="/EventAround">
                  <div className="change_btn banner_child">Event</div>
                </Link>
            </div>
        </div>   
      {list}
    </div>
  );
}
let mapStateToProps = (state) =>{
    return {
      scTextMate : state.scTextMate_val.scTextMate
    };
}
MateAround = connect(mapStateToProps)(MateAround);
// {idx != ''?<Info idx={idx} onClick={() =>{setIdx('')} }/>:<div></div>}
export default MateAround;
