import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader,  CardText} from 'material-ui/Card';



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

export default class TimeComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      allClasses: [],
      allTimeClasses: [],
    }
  }

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

 //compareTimes(data){

 //}

  getData(){
   var matchingClasses = []
   //this.state.allTimeClasses = []
   var day = ''
   var time = ''
   var daySign = ''
   if(this.props.showSpecificClasses){
     if((this.props.value !== 0) && (this.props.value2 !== 0)) {
       console.log("here")
       console.log(this.state.allClasses[0]["Meeting Time"])
       //classes = this.state.allClasses
       day = this.getDay(this.props.value)
       time = this.getTime(this.props.value2)
       for(var i = 0; i < this.state.allClasses.length; i++){
         daySign = this.state.allClasses[i]["Meeting Time"].split(" ")
         console.log("daySign: " + daySign)
         if(daySign.length > 1){
           if((daySign[0].search(day) != -1) && (daySign[1].search(time) != -1)) {
             matchingClasses.push(this.state.allClasses[i])
           }
         }
       }
       return this.displayTimeClasses(matchingClasses)
   }
 }
}

displayTimeClasses(matchingClasses){
  console.log("matchingClasses: " + matchingClasses.length)
   var allClass = matchingClasses.map(m =>
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
     <h2>{matchingClasses.length} matches </h2>
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
      return(
      <div>
      {this.getData()}
      </div>
    );
  }
}
