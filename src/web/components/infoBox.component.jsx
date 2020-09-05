import React from 'react';
import './infoBox.css';
import {Card, CardContent, Typography} from '@material-ui/core';

const InfoBox = ({title, cases, isBlue, isRed, active, total, ...props}) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && 'infoBox--selected'} ${
        isRed && 'infoBox--red'
      } ${isBlue && 'infoBox--blue'}`}>
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox_cases ${!isRed && 'infoBox_cases-green'}`}>
          {cases}
        </h2>
        <Typography className="infoBox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
