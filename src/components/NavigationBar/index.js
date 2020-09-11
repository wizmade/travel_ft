import React,{ Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { set_text } from "../../actions";
import "./style.scss";

function NavigationBar() {
    return (
        <div className="navi">
            NavigationBar
        </div>
    )
}

export default NavigationBar;
