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

const BoardCard = props => {

    let [show, setShow] = useState(false);
    useEffect(() => {
      setTimeout(()=>setShow(true), 3000);
    }, [])

    return (

        <Card sx={{ margin: "auto" ,display: 'flex', width: "30%" ,marginBottom: "20px", boxShadow: "0px 8px 40px -12px rgba(0,0,0,0.3)", transition : "0.6s", "&:hover": {boxShadow: "0px 32px 70px -12.125px rgba(0,0,0,0.3)", backgroundColor:"#c4ffb2"}}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width:"80%"}}>
            <CardContent sx={{ flex: '1 0 auto', textAlign:"left" }}>
              <Typography component="div" variant="h5">
                {props.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Employees: {props.employee_count}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
              {props.start_date.split(" ")[0]} 
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Button size="small" color="primary" href={`/board/${props.board_id}`}>
            View
            </Button>
            </Box>
          </Box>
          <CardMedia 
            component="img"
            sx={{ width: 120, height: 120, float:"right", boxShadow: "1px 1px #dbdbdb", padding:"10px", borderRadius:"50%", border : "1px solid #c7c7c7", objectFit:"contain", marginRight:"2%", marginTop:"1.5%"}}
            image={props.logo}
            alt="Board logo"
          />
        </Card>
      );
}

export default BoardCard;
