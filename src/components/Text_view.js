import React from 'react';
import { connect } from 'react-redux';

class Text_view extends React.Component{
    render() {
        return (
            <h1>TEXT: {this.props.value}</h1>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        value: state.con_text.text
    };
}

Text_view = connect(mapStateToProps)(Text_view);

export default Text_view;
