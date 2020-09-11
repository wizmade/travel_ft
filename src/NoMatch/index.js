import React, { Component, PropTypes } from 'react';

const propTypes = {
};
const defaultProps = {
};
class NoMatch extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>해당페이지는 잘못된접근입니다</div>
        );
    }
}
NoMatch.propTypes = propTypes;
NoMatch.defaultProps = defaultProps;
export default NoMatch;
