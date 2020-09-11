import React,{ Component, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { set_text } from "../../actions";
import mypage from '../../img/mypage.png';
import "./style.scss";
import Modal from '../Modal';
const Head_view = ({ logo, links, showMenu, onClick, renderLink, styles,logo_left }) => {
	const [popUp, setPopUp] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
  const dispatch = useDispatch();
  return(
    <React.Fragment>
      <header className="pl-header">
        {
            logo_left === mypage ?
            <div className={'logo_left'} onClick={()=>alert("You should be login")} >
                <img src={logo_left} />
            </div>
            : <Link to="/mypage">
                <div className={'logo_left'} >
                    <img src={logo_left} />
                </div>
            </Link>
        }
       
        <h3 onClick={()=>dispatch(set_text("@@@"))}>
          <Link to="/main" >
            <img src={logo}/>
          </Link>
        </h3>
        <i className="far fa-bell fa-2x"></i>
        <a id="menu" className={`pl-nav-button ${showMenu ? "active" : ""}`} onClick={onClick}/>
      </header>
      <div className={`pl-menu ${showMenu ? "open" : ""}`}>
        <ul>
            <li>
                <a href="http://tribbycommunity.com/main">Community</a>
            </li>
            {links.map(link => (
                <li key={`${link.name}${link.href}`} onClick={onClick}>
                {renderLink(link)}
                </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  )
};

Head_view.defaultProps = {
  renderLink: link => <Link to={link.href}>{link.name}</Link>
};

Head_view.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  showMenu: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  renderLink: PropTypes.func
};

export default Head_view;
