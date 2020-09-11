import React from 'react';
import { connect } from 'react-redux';
import { setText } from '../actions';

class Text_con extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          text: '123'
      }
      this.onChangeDiff = this.onChangeDiff.bind(this);
  }
  onChangeDiff(e){
      this.setState({ text: e.target.value});
      this.props.onUpdateDiff(e.target.value);
  }
  render(){
      return (
        <input type="text" value={ this.state.text } onChange={this.onChangeDiff}></input>
      )
  }
}


let mapDispatchToProps = (dispatch) => {
    return {
        onUpdateDiff: (text) => dispatch(setText(text)),
    }
}

Text_con = connect(undefined, mapDispatchToProps)(Text_con);

export default Text_con;
