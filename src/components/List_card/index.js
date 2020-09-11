import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FaThumbsUps, FaRegThumbsUps } from "../Info";
import "./style.scss";
import { FaRegThumbsUp,FaMapMarkerAlt } from 'react-icons/fa';

const propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  centered: PropTypes.bool,
  children: PropTypes.object,
  className: PropTypes.string
};
const defaultProps = {
  title: 'Example'
};
class List_card extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        offsetWidth : 0,
        offsetHeight : 0
    }
   /*  getElement = () => {
        const card_box = document.querySelector("div.card_box");
        console.log(card_box.offsetWidth);
        console.log(card_box.offsetHeight);
        this.setState({
            offsetWidth : card_box.offsetWidth,
            offsetHeight : card_box.offsetHeight
        });
    }
    imageFix = (e) => {
        const {offsetWidth, offsetHeight} = this.state;
        const imgWidth = e.target.width, imgHeight = e.target.height;

        e.target.style.width = `${this.state.offsetWidth}px`;
    } */
    dateFormat = (startDate, endDate) => {
        const date = new Date(startDate);
        const end = new Date(endDate);
        let day = date.getDate(), month = date.getMonth() ;
        day = day >= 10 ? day : "0" + day;
        month = month >= 10 ? month+1 : "0" +(month+1);
        const format = date.getFullYear()+"/"+ month +"/"+ day;
        const days = Math.floor((end-date)/ 86400000);
        return format + " - " + days + "days";
    }
    textSlice = (text) => {
        const textArray = text.split(",");
        return (textArray[1]===undefined? textArray[0]:textArray[0]+","+textArray[1])
    }
    render() {
        return(
            <Link to={"/info/"+this.props.idx}>
                <div className={"card_box "+this.props.idx}>
                    <div className="card_tag"><span >{this.props.tag}</span></div>
                    <div className="card_img">
                        <img className="landscape" src={this.props.image} />
                    </div>
                    <div className="card_contnet">
                        <div className="title">{this.props.title}</div>
                        <div className="text">
                            <FaMapMarkerAlt className="FaMapMarkerAlt"/>
                            <span>{this.textSlice(this.props.text)}</span>
                        </div>
                        <div className="date">
                            {this.dateFormat(this.props.start,this.props.end)} 
                        </div>
                        <div className="profile_box">
                            <img src={this.props.memImage}/>
                            <p>{this.props.name}</p>
                            <div className="star">
                            <FaThumbsUps num={this.props.star}/>
                            <FaRegThumbsUps num={5 - this.props.star}/>
                        </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}
List_card.propTypes = propTypes;
List_card.defaultProps = defaultProps;
export default List_card;
