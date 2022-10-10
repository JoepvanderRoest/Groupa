import logo from '../logo.svg';
import React, { useEffect, useState } from "react";
import '../App.css';
import BoardCard from '../UI_elements/BoardCard';
import { useSlotProps } from '@mui/base';
import './BoardOverview.css'
function BoardOverview() {
    const [boards, setBoards] = useState([])


  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_all_boards")
    .then(response => response.json()
    .then(data => {
        console.log(data)
      setBoards(data)
    })
  )}, []);

  return (
    <div className="BoardOverview">
        {boards.map(board =>{
            return(<BoardCard board_id={board.board_id} name={board.name} logo={board.logo} employee_count={board.employee_count} start_date={board.start_date}/>)
        })}
    </div>
  );
}

export default BoardOverview;
