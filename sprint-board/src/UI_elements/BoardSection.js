import logo from '../logo.svg';
import React, { useEffect, useState, useRef } from "react";
import '../App.css';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { CSSTransition } from 'react-transition-group';
import "./BoardSection.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useDrag, useDrop } from "react-dnd";
import ItemTypes  from "../itemTypes/ItemTypes";
import SprintCard from './SprintCard';

const BoardSection = props => {
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(false);
    const [showInput, setShowInput] = useState(false)
    const ref = useRef(null);
    
    const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.CARD,
		drop: (item, monitor) => props.switchFromSection(item.props, props),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	});

    

    return (
        <Card ref={drop} sx={{ margin: "0 auto" , maxWidth: "23%", minWidth: "11%", height: "100%" ,display: 'flex', transition : "0.6s" ,position: "relative", backgroundColor: isOver ? "var(--secondaryColor)" : "white"}}>
        <div className="boardSection">
            <div className="boardHeader">
                <span>{props.title}</span> 
                            <Button onClick={() => setHide(!hide)}>{hide == false ? "-" : "+"}</Button>
            </div>
            <div className="BoardBody" style={hide == false ? {display : "initial"} : {display : "none"} }>
                {props.cards !== undefined ? props.cards.map(card => {return( <SprintCard key={card.card_id} 
                                                                                        id={card.card_id} 
                                                                                        title={card.title} 
                                                                                        status={card.status} 
                                                                                        employees={card.employees} 
                                                                                        body={card.body} 
                                                                                        board_section_id={card.board_section_id} 
                                                                                        employeeFilter={props.employeeFilter}
                                                                                        />)}) : ""}
            </div>
        </div>
        </Card>
      );
}

export default BoardSection;
