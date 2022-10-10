import React, {useState, useEffect} from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function convertDateListToSprints(datelist){
  const sprintlist = []
  datelist.forEach(date => {
    if(!sprintlist.includes(date.sprintNumber)){
    sprintlist.push(date.sprintNumber)
    }
  })
  return sprintlist
}

const SprintFilter = props => {
    let sprintList = Object.values(props.dateDict)
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [choosenSprint, setChoosenSprint] = useState(props.dateDict[new Date().getFullYear() + "-" + new Date().getMonth()  + "-" + new Date().getDate()].sprintNumber);
    sprintList = convertDateListToSprints(sprintList)



    const handleChange = (event) => {
        const Sprint = event.target.value
        setChoosenSprint(Sprint)
        props.setSprintNumber(Sprint)
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
            <FormControl sx={{ m: 1, width: 300, position: "absolute", right: "20%"}}>
                    <InputLabel id="demo-multiple-name-label">SprintNumber</InputLabel>
                    <Select     
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={choosenSprint}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    //style={{borderColor:"#fff"}}
                    >
                    {sprintList.map((sprintNumber) => (
                        <MenuItem
                        key={sprintNumber}
                        value={sprintNumber}
                        > {sprintNumber}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
        );
}

export default SprintFilter;