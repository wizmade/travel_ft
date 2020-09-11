import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./css/select.scss";

function Select_type(props) {
    const DIR_NAME = "/type_img", CLASS_NAME = "type_card";
    const [types,setTypes] = useState([]);
    
    const clickBox = (e) => {
        if (e.target.style.filter === "") {
            e.target.style.filter = "brightness(35%)";
            setTypes([...types, e.target.className]);
        } else {
            e.target.style.filter = "";
            setTypes(types.filter(item => item !== e.target.className));
        }
    }
    console.log(props);
    return (
        
        <div className="select_layout">
            <div className="select_title">
                <span className="title">What's your travel type?</span>
                <span className="sub_title">You can update later</span>
                <Link to={{
                    pathname : "/Select_interests",
                    state : {
                        backPath : props.location.state.backPath,
                        types : types
                    }
                }}>
                    <span className="next">Next <i className="fas fa-chevron-right"></i></span>
                </Link>
            </div>
            <div className="select_type">
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Free_Spirit.jpg"} className="Free Spirit" onClick={clickBox}/>
                    <span>Free Spirit</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/No-hassle_Traveler.jpg"} className="No-hassle Traveler" onClick={clickBox}/>
                    <span>No-hassle Traveler</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Planner.jpg"} className="Planner" onClick={clickBox}/>
                    <span>Planner</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Group_Tour.jpg"} className="Group Tour" onClick={clickBox}/>
                    <span>Group Tour</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Authentic_Experiencer.jpg"} className="Authentic Experiencer" onClick={clickBox}/>
                    <span>Authentic Experiencer</span>
                </div>
                <div className={CLASS_NAME}>
                    <img  src={DIR_NAME+"/Cultural_Explorer.jpg"} className="Cultural Explorer" onClick={clickBox}/>
                    <span>Cultural Explorer</span>
                </div>
            </div>
            <div className="skip">
                <Link to="/"><span>SKIP</span></Link> 
            </div>
        </div>
    )
}

export default Select_type;

