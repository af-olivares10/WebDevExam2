import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTracker} from "meteor/react-meteor-data"
import { DatePicker, Input,Form,  Button,Icon , Select} from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
import Graph from "./Graph";
import 'antd/dist/antd.css';
import * as d3 from "d3"
export  class App extends Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      agencies:[],
      agency:0,
      routes:[],
      route:0,
      sClasses:[],
      sClass:0,
      directions:[],
      direction:0,
      sClassesObj:[],
      selected:0
    };
  }

  componentDidMount() {
    this.getAgencies2();
  }
  getAgencies =()=>{
    fetch('http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList')
    .then((response) => response.json())
    .then((agencies) => {
      let agenciesTemp = [];
      for(let agency of agencies["agency"] ){
        agenciesTemp.push(agency.tag)
      }
      this.setState({agencies:agenciesTemp});
    }
  )
  .catch((error) => {
    console.error(error);
  });
}
getAgencies2 =()=>{
  Meteor.call("findagencies",(err,agencies)=>{
    let agenciesTemp = [];
    for(let agency of agencies["agency"] ){
      agenciesTemp.push(agency.tag)
    }
    this.setState({agencies:agenciesTemp});
  });
}


handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      console.err(values);
    }
  });
}
handleAgChange=(agency) =>{
  this.setState({routes:[],sClasses:[],directions:[]})
  Meteor.call("findRoutesByAgency",{agency},function(err,responseJson){

        if(responseJson["route"]){
          let x = responseJson["route"].tag?[]:responseJson["route"];
          if(x.length===0)x.push(responseJson["route"]);
          this.setState({routes:x,agency:agency});
        }
        else{
          this.setState({routes:[{tag:"No data provided"}],agency:agency});

        }

  }.bind(this))
}
handleRouteChange = (route)=>{
  if(route!=="No data provided"){
    this.setState({sClasses:[],directions:[]})
    Meteor.call("findRoutesByAgencyAndRoute",{agency:this.state.agency,route},function(err,responseJson){
      if(responseJson["route"]){
        let x = responseJson["route"].serviceClass?[]:responseJson["route"];
        if(x.length===0)x.push(responseJson["route"]);
        let sClasses =[];
        for(let r of x){
          if(sClasses.indexOf(r.serviceClass)===-1){
            sClasses.push(r.serviceClass);
          }
        }
        this.setState({sClasses:sClasses,route:route,data:x});
      }
      else{
        this.setState({sClasses:["No data provided"],route:route});
      }
    }.bind(this))
  }
}
handleSClassChange = (sClass)=>{
  if(sClass!=="No data provided"){
  this.setState({directions:[]})
  let sClasses = this.state.data.filter((d) => d.serviceClass===sClass);
  let directions =[];
  for(let r of sClasses){
    if(directions.indexOf(r.direction)===-1){
      directions.push(r.direction);
    }
  }
  this.setState({directions:directions,sClass:sClass,sClassesObj:sClasses});
}

}
handleDirectionChange = (direction)=>{

  let route = this.state.sClassesObj.filter((d) => d.direction===direction)[0];
  this.setState({selected:route});
}
render(){
  const { getFieldDecorator } = this.props.form;

  return(
    <div >
      <div className = "container" style = {{marginTop:"70px",marginBottom:"70px"}} className = "form">

        <Form onSubmit={this.handleSubmit} >
          <div className = "form-text">Agency name</div>
          <FormItem className = "form-item">
            {getFieldDecorator("agency", {
              rules: [{ required: true }],
            })(
              <Select placeholder="Agency" onChange={this.handleAgChange} >
                {
                  this.state.agencies.map(
                    (ag) => (<Select.Option value={ag} key={ag}>{ag}</Select.Option>)
                  )
                }
              </Select>
            )}
          </FormItem>
          <FormItem className = "form-item">
            <div className = "form-text">Route</div>

            { (this.state.routes.length>0)?
              (getFieldDecorator("route", {
                rules: [{ required: true}],
              })(
                <Select placeholder="Route"  onChange={this.handleRouteChange}>
                  {
                    this.state.routes.map(
                      (r) =>
                      (<Select.Option value={r.tag} key={r.tag}>{r.tag}</Select.Option>)
                    )
                  }
                </Select>
              )):
              (<Select defaultValue="lucy"  disabled>
                <Option value="lucy">Route</Option>
              </Select>)

            }
          </FormItem>
          <FormItem className = "form-item">
            <div className = "form-text">Service class</div>
            { (this.state.sClasses.length>0)?
              (getFieldDecorator("sClass", {
                rules: [{ required: true}],
              })(
                <Select placeholder="Service class"  onChange={this.handleSClassChange}>
                  {
                    this.state.sClasses.map(
                      (r) =>
                      (<Select.Option value={r} key={r}>{r}</Select.Option>)
                    )
                  }
                </Select>
              )):
              (<Select defaultValue="lucy"  disabled>
                <Option value="lucy">Service class</Option>
              </Select>)

            }
          </FormItem>
          <FormItem className = "form-item">
            <div className = "form-text">Direction</div>
            { (this.state.directions.length>0)?
              (getFieldDecorator("direction", {
                rules: [{ required: true}],
              })(
                <Select placeholder="Service class"  onChange={this.handleDirectionChange}>
                  {
                    this.state.directions.map(
                      (r) =>
                      (<Select.Option value={r} key={r}>{r}</Select.Option>)
                    )
                  }
                </Select>
              )):
              (<Select defaultValue="lucy"  disabled>
                <Option value="lucy">Service class</Option>
              </Select>)

            }
          </FormItem>
          {/* <FormItem style={{  marginBottom: "5px" }}>
            <div style ={{  color: "red" }}></div>
            <Button type="primary" htmlType="submit"><Icon type="right-circle-o" />GO!</Button>
            <br></br>
          </FormItem> */}
        </Form>

      </div>
      <Graph selected= {this.state.selected}></Graph>
    </div>
  )
}
}
const WrappedApp = Form.create()(App);

export default WrappedApp;
