
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
function TermLengthBox(props) {


    var years= props.termLengths;

    //example output from db

    let menuItems = years.map(year => {
        return (<MenuItem key={year} value={year}>{year} Years</MenuItem>)
    })


    const onSelectTermLengthChange = (event) => {
        props.onTermLengthChange(event.target.value);
    }


    return (
        <div>

            <Grid item xs={16}  pt={1} px={1}>
                <InputLabel className="text-blue-800" id="term-length-label">Term Length</InputLabel>
            </Grid>
            <Grid item xs={16} px={1}>
            {/* <Grid item xl={12} lg={12} md={12} xs={12} px={1}> */}
                <Select sx={{minWidth:120}}
                    labelId="term-length-label"
                    id="term-length-select"
                    value={props.currentValue}
                    onChange={onSelectTermLengthChange}
                >
                    {menuItems}
                </Select>
            </Grid>




        </div>
    )
}

export default TermLengthBox;