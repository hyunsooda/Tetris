
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';


const AppBarStyle = {
  width : 500,
  margin : '0 auto'
}

const PaperStyle = {
  position : 'absolute',
  background : '#e6ffee',
  left : '28.5%',
  top : '17%',
  height: 150,
  width: 150,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
}

const iconStyles = {
  marginRight: 24,
};


const Title = () => (
  <MuiThemeProvider>
    <AppBar
    title="HS Tetris"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    style={AppBarStyle}
    />
  </MuiThemeProvider>
);
const ScoreBoard = () => (
  <MuiThemeProvider>
    <div>
      <Paper style={PaperStyle} zDepth={3} circle >
          <canvas id='record' style={{width:150,height:150}} />
      </Paper>
  </div>
  </MuiThemeProvider>  
)





ReactDOM.render(
  <Title />,
  document.getElementById('title')
);

ReactDOM.render(
  <ScoreBoard />,
  document.getElementById('scoreBoard')
)


export {Title,ScoreBoard};



