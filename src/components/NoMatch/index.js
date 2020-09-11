import React, { Component, PropTypes } from 'react';
import "./style.scss";

const propTypes = {
};
const defaultProps = {
};
class NoMatch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="NoMatch">
              <p>해당페이지는 잘못된접근입니다</p>
            </div>
        );
    }
}


NoMatch.propTypes = propTypes;
NoMatch.defaultProps = defaultProps;
export default NoMatch;
