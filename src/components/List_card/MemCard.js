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
class Acard extends Component {
    constructor(props) {
        super(props);
    }
    textSlice = (text) => {
        const textArray = text.split(",");
        return (textArray[1]===undefined? textArray[0]:textArray[0]+","+textArray[1])
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return(
            <Link to={"/ChatRoom/"+this.props.idx}>
              <div className="card_box">
                <div className="card_img">
                  <img src={this.props.image} />
                  <div className="card_tag">
                  <span >{this.props.tag}</span>
                  </div>
                  
                </div>
                <div className="card_contnet">
                  <p className="title">{this.props.name}</p>
                  <p className="text">
                    <FaMapMarkerAlt className="FaMapMarkerAlt"/>{this.textSlice(this.props.text)}
                  </p>
                  <p className="star">
                    <FaThumbsUps num={this.props.star}/>
                    <FaRegThumbsUps num={5 - this.props.star}/>
                    {this.props.date}
                  </p>
                  <div className="profile_box">
                    <img src={"http://tribbycommunity.com/uploads/msgs.png"}/>
                    <p>{this.props.mem_id} 1 km</p>
                  </div>
                </div>
              </div>
            </Link>
        );
    }
}
Acard.propTypes = propTypes;
Acard.defaultProps = defaultProps;
export default Acard;
