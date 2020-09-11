import React, { Component, PropTypes } from 'react';
import { Route, BrowserRouter as Router,Link} from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import history from './history/';
import Main from './Main';
import Info from './Info';
import Join from './Join';
import Test from './Test';
import Login from './Login';
import Header from './Header';
import NoMatch from './NoMatch/';
import Logout from './Logout';
import Mypage from './Mypage';
import Chat from './Chat/Chat.js';
import ChatRoom from './Chat/ChatRoom.js';
import Add_Accompany from './Accompany/Add_Accompany.js';
import Update_Accompany from './Accompany/Update_Accompany.js';
import List_Accompany from './Accompany/List_Accompany.js';
import Joined_Accompany from './Accompany/Joined_Accompany.js';
import SearchForm from './Search_head/SearchForm';
import AroundSearch from './Search_head/AroundSearch';
import Select_type from './Select_type';
import Select_interests from './Select_interests';
import MateAround from './Around/MateAround';
import EventAround from './Around/EventAround';
import Member from './Member';
import Rating from './Rating';

class AuthRouter extends Component{
    constructor(props){
      super(props);
      this.state = {lc:0,}
    }
    
    render(){
        return(
          <Router history={history}>
            <Header/>
            <CacheSwitch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/join"  component={Join} />
              <Route exact path="/mypage"  component={Mypage} />
              <Route exact path="/memberInfo/:idx" component={Member} />
              <Route exact path="/logout" component={Logout}/>
              <CacheRoute  exact path="/main" component={Main}/>
              <CacheRoute  exact path="/MateAround" component={MateAround}/>
              <CacheRoute  exact path="/EventAround" component={EventAround}/>
              <Route exact path="/AroundSearch/:pathname" component={AroundSearch}/>
              <Route exact path="/test" component={Test}/>
              <Route exact path="/info/:idx" component={Info}/>
              <Route exact path="/Update_Accompany/:idx" component={Update_Accompany}/>
              <Route exact path="/SearchForm" component={SearchForm}/>
              <Route exact path="/Add_Accompany" component={Add_Accompany}/>
              <Route exact path="/List_Accompany" component={List_Accompany}/>
              <Route exact path="/Joined_Accompany" component={Joined_Accompany}/>
              <Route exact path="/Chat" component={Chat}/>
              <Route exact path="/ChatRoom/:idx" component={ChatRoom}/>
              <Route exact path="/Select_type" component={Select_type}/>
              <Route exact path="/Select_interests" component={Select_interests}/>
              <Route exact path="/Rating/:idx" component={Rating}/>
              <CacheRoute exact path="/" component={Login}/>
            </CacheSwitch>
          </Router>
        );
    }
}



export default AuthRouter;
