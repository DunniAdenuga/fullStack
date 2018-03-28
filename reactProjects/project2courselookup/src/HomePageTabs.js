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

const days = [
  <MenuItem value={1} primaryText="Monday" />,
  <MenuItem value={2} primaryText="Tuesday" />,
  <MenuItem value={3} primaryText="Wednesday" />,
  <MenuItem value={4} primaryText="Thursday" />,
  <MenuItem value={5} primaryText="Friday" />,
];

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
      req: '',
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
    this.state.allTimeClasses = []
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
          <p>Time: {m["Meeting Time"]}</p>
          <p>Location: {m.Room}</p>
          <p>Instructor: {m.Instructor}</p>
          <div dangerouslySetInnerHTML={{ __html: m.CrseDesc}} />
        </CardText>

        <CardActions>
          <FlatButton label="Comment" />
        </CardActions>
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
           <p>Time: {m["Meeting Time"]}</p>
           <p>Location: {m.Room}</p>
           <p>Instructor: {m.Instructor}</p>
           <div dangerouslySetInnerHTML={{ __html: m.CrseDesc}} />
         </CardText>

         <CardActions>
           <FlatButton label="Comment" />
         </CardActions>
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
    if(this.state.req != ''){
      console.log(this.state.req)
      var temp = this.state.req
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
           <p>Time: {m["Meeting Time"]}</p>
           <p>Location: {m.Room}</p>
           <p>Instructor: {m.Instructor}</p>
           <div dangerouslySetInnerHTML={{ __html: m.CrseDesc}} />
         </CardText>

         <CardActions>
           <FlatButton label="Comment" />
         </CardActions>
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
          <RadioButtonGroup onChange={(event, value)=>this.setState({req: value})}>
            <RadioButton
            value="FOUN"
            label="Foundation Seminar"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="NMLG"
            label="Natural Sciences & Mathematics"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="LBSC"
            label="Lab science"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="CCFL"
            label="Foreign language"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="CCIP"
            label="Integrated Perspectives"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="AHLG"
            label="Arts & Humanities"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="SSLG"
            label="Social Sciences"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="DUSC"
            label="Diversity in the U.S."
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="EVCN"
            label="Environmental Connections"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="GBCC"
            label="Global Connections"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="CCQR"
            label="Quantitative Reasoning"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="W1"
            label="Writing Requirement 1"
            style={{marginBottom: 16,}}
            />
            <RadioButton
            value="W2"
            label="Writing Requirement 2"
            style={{marginBottom: 16,}}
            />
          </RadioButtonGroup>
        </div>
        {this.getReqCourses()}
      </Tab>

    </Tabs>
  </MuiThemeProvider>
   );
 }
}

export default HomePageTabs;
