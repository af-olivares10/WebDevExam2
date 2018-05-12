import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTracker} from "meteor/react-meteor-data"
import { DatePicker, Input,Form,  Button,Icon } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
import 'antd/dist/antd.css';
import {Graphi} from "../api/graph";

import * as d3 from "d3"
export   class Comments extends Component{
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.chain){
      return(
        <span>
          <hr></hr>
          <h1 style ={{textAlign:"center",marginTop:"50px"}}>
            Comments
          </h1>
            {(Meteor.user())?
              (<div className = "comment-area">
              <textarea ref = "comment" className="form-control" rows="5" id="comment" placeholder="Type your comment here..."></textarea>
              <div className="button" style={{marginBottom:"20px"}}>
                <button type="button" className="btn btn-success"  onClick={()=>{this.props.addComment(this.refs.comment.value)}}>Comment</button>
              </div>
              <div>
              { this.props.graphs.map((d,i)=>{
                if(d.chain === this.props.chain){
                  return(<div key = {i}><hr></hr><h4>{d.username}</h4><div>{d.text}</div></div>)
                }
              })}
            </div>
          </div>):(
            <div className = "comment-area">
              <h3>Log in to see and add comments!</h3>
            </div>
          )
        }
        </span>
      )
    }else{
      return(
        <span ></span>
      )
    }
  }
}
export default withTracker(()=>{
  Meteor.subscribe('graphs');
  Meteor.subscribe('userData');

  return {
    graphs: Graphi.find({}).fetch(),
    user: Meteor.user()

  }
})(Comments);
