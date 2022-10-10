import logo from '../logo.svg';
import React, { useEffect, useState } from "react";
import '../App.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CSSTransition } from 'react-transition-group';
import { useDrag} from "react-dnd";
import ItemTypes from '../itemTypes/ItemTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


function check_filter(filterArray, propArray){
  if(filterArray.length > 0){
  for (var i = 0; i < propArray.length; i++) {
      if (filterArray.includes(propArray[i].employee_id)) {
          return true;
      }
  }
  return false
}
  return true
}

const SprintCard = props => {

  const foundemployee =  check_filter(props.employeeFilter, props.employees)
  
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
		item: {
      type: ItemTypes.CARD,
      props : {
      key: props.id,
			card_id: props.id,
      status: props.status,
      title: props.title,
      employees : props.employees,
      body: props.body,
      boardSectionId : props.board_section_id
      }
		},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
  if(foundemployee){
    return (
        <Card ref={drag} sx={{display: "inline-block", margin: "10px" , "border": "2px dashed var(--secondaryColor)", boxShadow: "0px 4px var(--thirthColor)", transition : "0.6s", "&:hover": {boxShadow: "0px 32px 70px -12.125px rgba(0,0,0,0.3)", backgroundColor:"var(--actionColor)"}}}>
          <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <div style={{ position : 'relative', padding: "0px" }}><div style={{position : "absolute", right:"8px"}}> {props.employees !== undefined ? props.employees.map(employee => {return <img style={{width : "12px", padding: "1px" }} src={employee.logo} />}) : ""} </div></div>
            <CardContent sx={{ flex: '1 0 auto', textAlign:"left" }}>
              <Typography component="div" variant="h5">
                {props.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                 {props.body}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            </Box>
          </Box>
        </Card>
      );
    }else{return ""}
}

export default SprintCard;
