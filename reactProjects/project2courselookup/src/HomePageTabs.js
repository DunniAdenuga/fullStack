import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import TimeComponent from './TimeComponent'
import ProfComponent from './ProfComponent'
import ReqComponent from './ReqComponent'

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
      showSpecificClasses: false,
      profName: '',
      profButton: false,
      req: -1,
    }
  }

  //tab 1
  handleChange = (event, index, value) => this.setState({value});
  handleChange2 = (event, index, value2) => this.setState({value2});

  //tab 2
  getTextValue = (event, newValue) => this.setState({profName: newValue});



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
        <TimeComponent
        showSpecificClasses={this.state.showSpecificClasses}
        value={this.state.value}
        value2={this.state.value2}
        />
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
      <ProfComponent
      profButton={this.state.profButton}
      profName={this.state.profName}
      />
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
        <ReqComponent
        req={this.state.req}
        />
      </Tab>

    </Tabs>
  </MuiThemeProvider>
   );
 }
}

export default HomePageTabs;
