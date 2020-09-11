import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./style.scss";
import styled from 'styled-components';


const propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  centered: PropTypes.bool,
  children: PropTypes.object,
  className: PropTypes.string
};
const defaultProps = {
  title: 'Example'
};

class MateCard extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        isImgType : false
    }
    sortImg = (image) => {
        console.log(image);
        const img = new Image();
        img.src = image;
        console.log(img.width);
        if(Number(img.width) > Number(img.height)*1.5) {return true;}
        else {return false;}
    }
    memberAge = (mem_birth) => {
      const cur_date = new Date();
      const mem_date = new Date(mem_birth);
      const timestamp = cur_date - mem_date;
      return Math.floor(timestamp/31536000000);
    }
    requestChat = () => {
        alert("request chat success!");
    }
    componentDidMount() {
        this.setState({isImgType : this.sortImg(this.props.mem_img)});
    }
    render() {
        return(
            <div className="card_box mem_card">
                <div className="card_tag">
                        <span>
                        {this.props.distance}
                        </span>
                </div>
                <div className="card_img">
                    <img className={this.state.isImgType?"landscape":"portrait"} src={this.props.mem_img}/> 
                </div>
                <div className="card_contnet">
                    <p className="title">{this.memberAge(this.props.birth)}, {this.props.location}</p>
                    <p className="text">{this.props.job}</p>
                    <p className="date">{this.props.languege}</p>
                    <div className="profile_box" onClick={()=>this.requestChat()}>
                        <img src={"http://tribbycommunity.com/uploads/msgs.png"}/>
                    </div>        
                </div>
            </div>
        );
    }
}
MateCard.propTypes = propTypes;
MateCard.defaultProps = defaultProps;
export default MateCard;
