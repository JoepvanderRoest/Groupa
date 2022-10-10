import React, {useState, useEffect} from "react";
import './Header.css'
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import EmployeeFilter from "./EmployeeFilter";
import SprintFilter from "./SprintFilter";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ButtonGroup from '@mui/material/ButtonGroup';
import NextPlanOutlinedIcon from '@mui/icons-material/NextPlanOutlined';
import { unstable_createCssVarsProvider } from "@mui/system";

const BoardFilterArea = props => {

    const [employeeList, setEmployeeList] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    useEffect(() => {
        fetch("http://127.0.0.1:5000/get_employees/1/18")
        .then(response => response.json()
        .then(data => {
            setEmployeeList(data)
        })
      )}, []);

    return(
    <div className="BoardFitlerArea" sx={{ width: "100%", height: "100%", position: "relative"}}>
      <div className="buttonmenu" style={{ marginLeft: "1%", marginTop: "1%", position: "absolute", transistion:"0.6s"}}>
        <IconButton variant="contained" onClick={() => setMenuVisible(!menuVisible)} size="large" sx={{color: "var(--secondaryColor)"}}>
        <MenuOpenIcon />
        </IconButton >{menuVisible &&
        <ButtonGroup size="small" variant="contained" sx={{fontSize:"11px"}} aria-label="outlined primary button group">
        <Button color="secondary" onClick={() => props.createCard()}><AddIcon /> 
        <span onClick={props.handleOpen} style={{color:"var(--tirthColor)"}} >Add Card</span>
        </Button>
        <Button color="secondary" ><NextPlanOutlinedIcon /> 
        <span style={{color:"var(--tirthColor)"}}>Manage Board</span>
        </Button>
        </ButtonGroup> }
        </div>
        <EmployeeFilter employeeList={employeeList} setEmployeeFilter={props.setEmployeeFilter} />
        <SprintFilter dateDict={props.dateDict} setSprintNumber={props.setSprintNumber} />
        {/* <FormControl sx={{ m: 1, width: 300, position: "absolute", right: "0"}}>
                <InputLabel id="demo-multiple-name-label">Employee</InputLabel>
                <Select     
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={choosenEmployee}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                style={{borderColor:"#fff"}}
                renderValue={(selected) => ( console.log(selected),
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                >
                {employeeList.map((emp) => (
                    <MenuItem
                    key={emp.employee_id}
                    value={emp.first_name + " " + emp.last_name}

                    >
                    <img style={{width : "15px", marginLeft: "5px", marginTop: "-2px"}} src={emp.logo}></img><span style={{marginLeft: "10px"}}>{emp.first_name + " " + emp.last_name}</span>
                    </MenuItem>
                ))}
                </Select>
            </FormControl> */}
    </div>
    );

}

export default BoardFilterArea;
