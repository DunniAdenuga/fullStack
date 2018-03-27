import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

class Display extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayTime: false,
      displayProf: false,
      displayReq: false,
    }
  }

  updateTime(){
    this.setState({
      displayTime: true
    })
  }

  displayTime(){
    if(this.state.displayTime == true){
      return(
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
          <label class="form-check-label" for="defaultCheck1">
            Monday
          </label>
        </div>
      );
    }
  }

  render(){
    return(
      <div class="row">
        <div class="col-4">
          <button type="button" class="btn btn-light" id="byTime" onClick={() => this.updateTime()}>Search by Time</button>
          {this.displayTime()}
        </div>
        <div class="col-4">
          <button type="button" class="btn btn-light col-4" id="byProf">Search by Professor</button>
        </div>
        <div class="col-4">
          <button type="button" class="btn btn-light col-4" id="byReq">Search Required courses</button>
        </div>
      </div>
    );
  }
}

export default Display;
