import React, {useState, useEffect} from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';


const EmployeeFilter = props => {

    const [choosenEmployee, setChoosenEmployee] = useState([]);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

  
    const handleChange = (event) => {
        const choosenEmployees = event.target.value
        console.log(choosenEmployees)
        const {
          target: { value },
        } = event;
        setChoosenEmployee(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
        props.setEmployeeFilter(          
          // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
      };


    const MenuProps = {
        PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
        },
    };

    return(
            <FormControl sx={{ m: 1, width: 300, position: "absolute", right: "0"}}>
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
                          <Chip key={value} label={props.employeeList.filter(employee => employee.employee_id === value)[0].first_name} />
                        ))}
                      </Box>
                    )}
                    >
                    {props.employeeList.map((emp) => (
                        <MenuItem
                        key={emp.employee_id}
                        value={emp.employee_id}
                        label={emp.first_name + " " + emp.last_name}
    
                        >
                        <img style={{width : "15px", marginLeft: "5px", marginTop: "-2px"}} src={emp.logo}></img><span style={{marginLeft: "10px"}}>{emp.first_name + " " + emp.last_name}</span>
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
        );
}

export default EmployeeFilter;