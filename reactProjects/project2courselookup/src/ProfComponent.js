import React, { Component } from 'react';
import {Card, CardHeader,  CardText} from 'material-ui/Card';

export default class ProfComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      allProfClasses: [],
    }
  }

  getProfClasses(){
    //this.state.allProfClasses = []
    if((this.props.profButton) && (this.props.profName != '')){
      var temp =  this.props.profName
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


  render(){
    return(
      <div>
      {this.getProfClasses()}
      </div>
    );
  }
}
