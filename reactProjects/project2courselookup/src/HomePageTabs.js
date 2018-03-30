import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader,  CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import AutoComplete from 'material-ui/AutoComplete';

const days = [
  <MenuItem value={1} primaryText="Monday" />,
  <MenuItem value={2} primaryText="Tuesday" />,
  <MenuItem value={3} primaryText="Wednesday" />,
  <MenuItem value={4} primaryText="Thursday" />,
  <MenuItem value={5} primaryText="Friday" />,
];

/*
<RadioButtonGroup onChange={(event, value)=>this.setState({req: value})}>


</RadioButtonGroup>
*/

const times = [
  <MenuItem value={6} primaryText="8:00 am" />,
  <MenuItem value={7} primaryText="9:00 am" />,
  <MenuItem value={8} primaryText="10:00 am" />,
  <MenuItem value={9} primaryText="11:00 am" />,
  <MenuItem value={10} primaryText="12:00 pm" />,
  <MenuItem value={11} primaryText="1:00 pm" />,
  <MenuItem value={12} primaryText="2:00 pm" />,
  <MenuItem value={13} primaryText="3:00 pm" />,
  <MenuItem value={14} primaryText="4:00 pm" />,
  <MenuItem value={15} primaryText="5:00 pm" />,
  <MenuItem value={16} primaryText="7:00 pm" />,
];

const CCCReqs = [
  {textKey: 'Foundation Seminar', valueKey: 'FOUN'},
  {textKey: 'Integrated Perspectives', valueKey: 'CCIP'},
  {textKey: 'Foreign language', valueKey: 'CCFL'},
  {textKey: 'Natural Sciences & Mathematics', valueKey: 'NMLG'},
  {textKey: 'Lab science', valueKey: 'LBSC'},
  {textKey: 'Arts & Humanities', valueKey: 'AHLG'},
  {textKey: 'Social Sciences', valueKey: 'SSLG'},
  {textKey: 'Diversity in the U.S', valueKey: 'DUSC'},
  {textKey: 'Environmental Connections', valueKey: 'EVCN'},
  {textKey: 'Global Connections', valueKey: 'GBCC'},
  {textKey: 'Quantitative Reasoning', valueKey: 'CCQR'},
  {textKey: 'Writing Requirement 1', valueKey: 'W1'},
  {textKey: 'Writing Requirement 2', valueKey: 'W2'},
];
const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};

class HomePageTabs extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0,
      value2: 0,
      allClasses: [],
      allTimeClasses: [],
      showSpecificClasses: false,
      profName: '',
      profButton: false,
      allProfClasses: [],
      req: -1,
      allReqClasses: [],
    }
  }

  //tab 1
  handleChange = (event, index, value) => this.setState({value});
  handleChange2 = (event, index, value2) => this.setState({value2});

  //tab 2
  getTextValue = (event, newValue) => this.setState({profName: newValue});

   getDay(data){
    if(data == 1){
      return 'M'
    }else if(data == 2){
      return 'T'
    }else if(data == 3){
      return 'W'
    }else if(data == 4){
      return 'R'
    }else if(data == 5){
      return 'F'
    }
  }

  getTime(data){
    var initTime = times[data - 6]
    console.log(initTime.props.primaryText)
    var time = initTime.props.primaryText.split(" ")[0]
    console.log("time: " + time)
    return time
  }

   getData(){
    //var matchingClasses = []
    //this.state.allTimeClasses = []
    var day = ''
    var time = ''
    var daySign = ''
    if(this.state.showSpecificClasses){
      if((this.state.value !== 0) && (this.state.value2 !== 0)) {
        console.log("here")
        console.log(this.state.allClasses[0]["Meeting Time"])
        //classes = this.state.allClasses
        day = this.getDay(this.state.value)
        time = this.getTime(this.state.value2)
        for(var i = 0; i < this.state.allClasses.length; i++){
          daySign = this.state.allClasses[i]["Meeting Time"].split(" ")
          console.log("daySign: " + daySign)
          if(daySign.length > 1){
            if((daySign[0].search(day) != -1) && (daySign[1].search(time) != -1)) {
              this.state.allTimeClasses.push(this.state.allClasses[i])
            }
          }
        }
        return this.displayTimeClasses()
    }
  }
}

 displayTimeClasses(){
   console.log("this.state.allTimeClasses: " + this.state.allTimeClasses.length)
    var allClass = this.state.allTimeClasses.map(m =>
      <div class="mx-auto justify-content-center col-8 pb-5">
      <Card>
        <CardHeader
          title={m.Course}
          subtitle={m.Title}
        />
        <CardText>
          <p><b>CRN</b>: {m.CRN}</p>
          <p><b>Time</b>: {m["Meeting Time"]}</p>
          <p><b>Location</b>: {m.Room}</p>
          <p><b>Instructor</b>: {m.Instructor}</p>
          <p><b>CCCReq</b>: {m.CCCReq.toString()}</p>
          <div dangerouslySetInnerHTML={{ __html: m.CrseDesc.substring(0, 9) + "http://www.bannerssb.bucknell.edu" + m.CrseDesc.substring(9, m.CrseDesc.length)}} />
        </CardText>
      </Card>
    </div>
    )
    return(
      <div>
      <h2>{this.state.allTimeClasses.length} matches </h2>
      {allClass}
      </div>
    );
  }

  getProfClasses(){
    //this.state.allProfClasses = []
    if((this.state.profButton) && (this.state.profName != '')){
      var temp =  this.state.profName
      console.log("getProf")
      const url = 'https://www.eg.bucknell.edu/~amm042/service/q?text='+ temp+'&limit=99999'
      fetch(url)
      .then(rsp => rsp.json())
      .then(allPC => {
        console.log(allPC)
        this.setState({
          allProfClasses: allPC.message
        })
      })
      .catch(err => console.log("ERR",err))
      return this.displayProfClasses()
    }
  }

  displayProfClasses(){
    console.log("profClasses: " + this.state.allProfClasses.length)
     var allClass = this.state.allProfClasses.map(m =>
       <div class="mx-auto justify-content-center col-8 pb-5">
       <Card>
         <CardHeader
           title={m.Course}
           subtitle={m.Title}
         />
         <CardText>
           <p><b>CRN</b>: {m.CRN}</p>
           <p><b>Time</b>: {m["Meeting Time"]}</p>
           <p><b>Location</b>: {m.Room}</p>
           <p><b>Instructor</b>: {m.Instructor}</p>
           <p><b>CCCReq</b>: {m.CCCReq.toString()}</p>
           <div dangerouslySetInnerHTML={{ __html: m.CrseDesc.substring(0, 9) + "http://www.bannerssb.bucknell.edu" + m.CrseDesc.substring(9, m.CrseDesc.length)}} />
         </CardText>
       </Card>
     </div>
     )
     return(
       <div>
       <h2>{this.state.allProfClasses.length} matches </h2>
       {allClass}
       </div>
     );
  }

  getReqCourses(){
    //look into getting semester first
    //this.state.allReqClasses = []
    if(this.state.req != -1){
      console.log(this.state.req)
      var temp = CCCReqs[this.state.req].valueKey
      const url = 'https://www.eg.bucknell.edu/~amm042/service/q?CCCReq=' + temp +'&limit=99999'
      fetch(url)
      .then(rsp => rsp.json())
      .then(allRC => {
        console.log(allRC)
        this.setState({
          allReqClasses: allRC.message
        })
      })
      .catch(err => console.log("ERR",err))
      return this.displayReqClasses()
    }
  }

  displayReqClasses(){
    console.log("reqClasses: " + this.state.allReqClasses.length)
     var allClass = this.state.allReqClasses.map(m =>
       <div class="mx-auto justify-content-center col-8 pb-5">
       <Card>
         <CardHeader
           title={m.Course}
           subtitle={m.Title}
         />
         <CardText>
           <p><b>CRN</b>: {m.CRN}</p>
           <p><b>Time</b>: {m["Meeting Time"]}</p>
           <p><b>Location</b>: {m.Room}</p>
           <p><b>Instructor</b>: {m.Instructor}</p>
           <p><b>CCCReq</b>: {m.CCCReq.toString()}</p>
           <div dangerouslySetInnerHTML={{ __html: m.CrseDesc.substring(0, 9) + "http://www.bannerssb.bucknell.edu" + m.CrseDesc.substring(9, m.CrseDesc.length)}} />
         </CardText>
       </Card>
     </div>
     )
     return(
       <div>
       <h2>{this.state.allReqClasses.length} matches </h2>
       {allClass}
       </div>
     );
  }

  componentWillMount(){
    const url = 'https://www.eg.bucknell.edu/~amm042/service/q?limit=99999'
    fetch(url)
    .then(rsp => rsp.json())
    .then(allC => {
      console.log(allC)
      this.setState({
        allClasses: allC.message
      })
    })
    .catch(err => console.log("ERR",err))
  }

  render(){
   return (
  <MuiThemeProvider>
    <Tabs>
      <Tab
        icon={<FontIcon className="material-icons">alarm</FontIcon>}
        label="Search by Time" >
        <div class="row justify-content-center">
          <div class="col-4 mr-5">
          <SelectField
          multiple={false}
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText="Days"
          >
            {days}
          </SelectField>
          </div>

          <div class="col-4">
          <SelectField
          multiple={false}
          value={this.state.value2}
          onChange={this.handleChange2}
          floatingLabelText="Times"
          >
            {times}
          </SelectField>
          </div>

          <div class="col-2">
          <IconButton
          iconStyle={{width: 60, height: 60,}}
          style={{ width: 120,height: 120, paddingTop: 32,}}
          onClick={()=>this.setState({showSpecificClasses: true})}
          iconClassName="material-icons"
          tooltip="Search">search </IconButton>
          </div>

        </div>
        {this.getData()}
      </Tab>

      <Tab
        icon={<FontIcon className="material-icons">face</FontIcon>}
        label="Search by Professor" >

        <div class="row justify-content-center mt-3">
          <div class="col-4 mr-5">
              <TextField
                hintText="Professor's Name"
                errorText="This field is required"
                onChange={this.getTextValue}
              />
          </div>
          <div class="col-2">
            <RaisedButton label="Search" primary={true} style={{margin: 12}} onClick={()=>this.setState({profButton: true})} />
          </div>
        </div>
        {this.getProfClasses()}
      </Tab>

      <Tab
        icon={<FontIcon className="material-icons">check_circle</FontIcon>}
        label="Search by Requirements" >
        <div class="row justify-content-center mt-3">
        <AutoComplete
        floatingLabelText="Type in Requirement"
        filter={AutoComplete.fuzzyFilter}
        openOnFocus={false}
        dataSource={CCCReqs}
        dataSourceConfig={dataSourceConfig}
        onNewRequest={(chosenRequest, index)=> this.setState({req: index})}
      />
        </div>
        {this.getReqCourses()}
      </Tab>

    </Tabs>
  </MuiThemeProvider>
   );
 }
}

export default HomePageTabs;
