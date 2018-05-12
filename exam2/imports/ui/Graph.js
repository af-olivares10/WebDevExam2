import React, {Component} from "react";
import PropTypes from "prop-types";
import {withTracker} from "meteor/react-meteor-data"
import { DatePicker, Input,Form,  Button,Icon } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
import 'antd/dist/antd.css';
import * as d3 from "d3"
export  default class Graph extends Component{
  constructor(props){
    super(props);
    this.state={
    };
  }
  graph = ()=>{
    if(this.props.selected){
      let selectedRoute = this.props.selected
      let buses = [];
      let vacio = [];
      let xa = selectedRoute.tr.stop?vacio:selectedRoute.tr;

      if(xa.length===0)xa.push(selectedRoute.tr);
      for (let bus of xa) {
        let route = bus.stop.filter((d) => d.content!=="--");
        route.forEach((d) => d.date = new Date(+d.epochTime));
        buses.push(route);
      }
      console.log(buses);
      const height = 600;
      const width = 1000;
      d3.selectAll("#here > *").remove();

      const svg = d3.select("#here")
      .attr("width", width)
      .attr("height", height);
      const margin = ({top: 20, right: 30, bottom: 30, left: 150});

      const minDate = d3.min(buses[0], d => d.date);
      const maxDate = new Date(minDate.getTime() + 22*60*60*1000); // minDate + 24 hours
      const x = d3.scaleTime()
      .domain([ minDate, maxDate ])
      .range([margin.left, width - margin.right]);
      const y = d3.scaleBand()
      .domain(d3.range(buses[0].length))
      .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      // .call(g => g.select(".domain").remove());
      const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
      .tickFormat((d) => selectedRoute.header.stop[d].content));

      const line = d3.line()
      .x(d => x(d.date))
      .y((d,i) => y(i) + y.bandwidth()/2);
      svg.append("g")
      .call(xAxis);

      svg.append("g")
      .call(yAxis);

      svg.selectAll(".routes")
      .data(buses)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
      return svg.node();
    }
  }
  componentDidMount() {
    this.graph();
  }
  componentDidUpdate() {
    this.graph();
  }

  render(){
    if(this.props.selected){
      return(
        <div>
          <hr></hr>
          <div className="container form"><svg id = "here" ></svg></div>
        </div>
      )
    }else{
      return(
        <div ></div>
      )
    }
  }
}
