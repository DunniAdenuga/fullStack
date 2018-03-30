import React, { Component } from 'react';
import {Card, CardHeader,  CardText} from 'material-ui/Card';

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

export default class ReqComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      allReqClasses: [],
    }
  }
  

  getReqCourses(){
    //look into getting semester first
    //this.state.allReqClasses = []
    if(this.props.req != -1){
      console.log(this.props.req)
      var temp = CCCReqs[this.props.req].valueKey
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


  render(){
    return(
      <div>
      {this.getReqCourses()}
      </div>
    );
  }

}
