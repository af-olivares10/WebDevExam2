import React, {Component} from "react";
import PropTypes from "prop-types";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";
import ReactDOM from "react-dom";
import { createContainer } from 'meteor/react-meteor-data';
import rUser from '../api/realUsers.js';
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data"

class EnterComponent extends Component{
  constructor(props){
    super(props);
    this.state={

    };
  }
  deployLogin = ()=>{
    Accounts._loginButtonsSession.set('dropdownVisible', true);
  }
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
    }
    enterMod = ()=>{
      if(!Meteor.userId()){
        return (
          (<div>
            <div className = "wait-text">Sign in to join a match.</div>
            <div className="button enter">
              <button type="button" className="btn enter-button " onClick={()=>{this.deployLogin()}} >Sign in</button>
            </div>
          </div>)
        )
      }
      if(this.props.howTo){
        return (<div><div className = "wait-text">Get points by pumping up the ball. Click the ball to pump it. The bigger the ball is, the more points you get. Make sure you click the ball or else you'll get some points discounted. If you pop the ball, you will loose a lot of points.</div>
        <div className="button enter">
          <button type="button" className="btn enter-button " onClick={()=>{this.props.howToF(false)}} > Got it!</button>
        </div>
      </div>)
    }

    if(this.props.onHold){
      let text = this.props.privateNumber? "Waiting for your opponent... Share this code with the person you want to play with: "+ this.props.privateNumber:"Waiting for other players to join the game..."
      return (<div><div className = "wait-text">{text}</div><div className="loader"></div> </div>)
    }
    if(this.props.enterLoader){
      return (<div><div className = "wait-text">Loading...</div><div className="loader"></div> </div>)
    }
    if(this.props.wantToJoin){
      let prof = {profile:"Not loaded yet"};
      if(Meteor.user()){
        prof = Meteor.user();
      }
      return(
        <div className ="enter">
          <div className = "nick-name">
            <input type = "text" className = "input" placeholder="Nickname" ref = "text"/>
          </div>
          <div className = "nick-name">
            <input type = "text" className = "input" placeholder="Match code" ref = "code"/>
          </div>
          <div className="button">
            <button type="button" className="btn enter-button" onClick={()=>{this.props.joinPrivateMatch(this.refs.code.value.trim(), this.refs.text.value.trim(),prof.profile)}} >Join</button>
            <div style ={{  color: "red" }}>{this.props.errorMessage}</div>

          </div>
          <div className="button">
            <button type="button" className="btn howTo-button" onClick={()=>{this.props.joinView(false)}} >Cancel</button>
          </div>
        </div>
      )
    }
    else{
      let prof = {profile:"Not loaded yet"};
      if(Meteor.user()){
        prof = Meteor.user();
      }

      return(
        <div className ="enter">
          <div className = "nick-name">
            <input type = "text" className = "input" placeholder="Nickname" ref = "text"/>
            <div style ={{  color: "red" }}>{this.props.errorMessage}</div>
          </div>
          <div className="button">
            <button type="button" className="btn enter-button" onClick={()=>{this.props.enter(this.refs.text.value.trim(), prof.profile)}} >Enter</button>
          </div>
          <div className="button">
            <button type="button" className="btn long-text-button" onClick={()=>{this.props.createPrivateMatch(this.refs.text.value.trim(), prof.profile)}} >New private game</button>
          </div>
          <div className="button">
            <button type="button" className="btn long-text-button" onClick={()=>{this.props.joinView(true)}} >Join private game</button>
          </div>
          <div className="button">
            <button type="button" className="btn howTo-button" onClick={()=>{this.props.howToF(true)}} >How to play</button>
          </div>
        </div>
      )


    }
  }
  render(){
    return(
      <div className =" container">
        <span ref="container" style= {{"paddingTop":"10px","position":"absolute" ,"transform":"translate(-100px)"}}/>;

        <div className ="pump-it" >
          <div style= {{"color":"white"}}>PUMP</div>
          <div style= {{"color":"#8e0000"}}>IT</div>
        </div>
        <div>
          {this.enterMod()}
        </div>
      </div>
    )

  }
}
export default Enter =  withTracker(()=>{
  return {
    user: Meteor.user()
  }
})(EnterComponent);
