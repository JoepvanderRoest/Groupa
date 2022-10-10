import logo from '../logo.svg';
import React, { useEffect, useState, useRef, useCallback } from "react";
import '../App.css';
import BoardCard from '../UI_elements/BoardCard';
import BoardSection from '../UI_elements/BoardSection';
import BoardFilterArea from '../navigation/BoardFilterArea';
import { useSlotProps } from '@mui/base';
import './Board.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {dateDictionary} from '../jsLogic/dateDictionary';
import { createDummyCard } from "../jsLogic/createCard";
import CustomModal from '../UI_elements/CustomModal';

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '' + month;
  if (day.length < 2) 
      day = '' + day;

  return [year, month, day].join('-');
}

function Board() {
    const date = new Date()
    const dateDict = dateDictionary(1)
    const InitialDay = dateDict[formatDate(date)]
    const [sprintNumber, setSprintNumber] = useState(dateDict[new Date().getFullYear() + "-" + new Date().getMonth()  + "-" + new Date().getDate()].sprintNumber)
    const [board, setBoard] = useState({"board_sections" : []})
    const [boardSection, setBoardSection] = useState([])
    const [employeeFilter, setEmployeeFilter] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    console.log(board)

  useEffect(() => {
    if(sprintNumber !== undefined){
      console.log(sprintNumber)
    console.log("fired!")
    fetch("http://127.0.0.1:5000/get_board/1/" + sprintNumber)
    .then(response => response.json()
    .then(data => {
        setBoard(data)
        setBoardSection(data.board_sections)
    })
  )}}, [sprintNumber]);
  

  function createCard(){
    const newBoard = createDummyCard(board)
    setBoardSection([...newBoard['board_sections']])
  }

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"board" : board, "sprint_number" : sprintNumber})
  };
  fetch('http://127.0.0.1:5000/save_board/', requestOptions)
      .then(response => response.json()
      )
  }, [setBoardSection]);

  function saveBoardState(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"board" : board, "sprint_number" : sprintNumber})
    };
    fetch('http://127.0.0.1:5000/save_board/', requestOptions)
        .then(response => response.json())
  }


  function switchFromSection(sprintCard, boardSection){
    console.log("switched!!!!")
    if(sprintCard.boardSectionId !== boardSection.id){
        board.board_sections[boardSection.id -1].cards.push({board_section_id: boardSection.id, body: sprintCard.body, card_id: sprintCard.card_id , status: sprintCard.status, title: sprintCard.title, key: sprintCard.card_id, employees : sprintCard.employees})
        board.board_sections[sprintCard.boardSectionId - 1].cards = board.board_sections[sprintCard.boardSectionId - 1].cards.filter( card => {return card.card_id !== sprintCard.card_id})
        setBoardSection([...board.board_sections])
        saveBoardState()
    }
  }

  return (
    <>
    <CustomModal open={open} title={"Woop woop"} handleClose={handleClose} />
    <div className="filterArea"><BoardFilterArea handleOpen={handleOpen} createCard={createCard} setEmployeeFilter={setEmployeeFilter} setSprintNumber={setSprintNumber} dateDict={dateDict} boardSections={boardSection} /></div>
    <div className="BoardOverview">
        <DndProvider backend={HTML5Backend}>
        {
        boardSection.map(board_section => (
            <BoardSection switchFromSection={switchFromSection} 
                          key={board_section.board_section_id} 
                          id={board_section.board_section_id} 
                          title={board_section.title} 
                          cards={board_section.cards}
                          employeeFilter={employeeFilter}
                          sprintNumber={sprintNumber}
                          />
        ))
        }
        </DndProvider>
    </div>
    </>
  );
}

export default Board;
