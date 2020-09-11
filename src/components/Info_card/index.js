import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./style.scss";

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
    render() {
        return(
            <div className="card_box">
              <div className="card_img">
                <img src={this.props.image}/>
              </div>
              <div className="card_contnet">
                <p className="title">{this.props.title}</p>
                <p >{this.props.text}</p>
              </div>
            </div>
        );
    }
}
List_card.propTypes = propTypes;
List_card.defaultProps = defaultProps;
export default List_card;
