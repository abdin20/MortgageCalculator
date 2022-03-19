
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
function TermTypeBox(props) {

    //dictionary to easily convert from text to int versions of type
    const typeKey = { fixed: 1, variable: 2, Fixed: 1, Variable: 2 }

    const onSelectTermTypeChange = (event) => {
        props.onTermTypeChange(event.target.value);
    }


    return (
        <div>
             <Grid item xs={16}  pt={1} px={1}>
            {/* <Grid item xl={12} lg={12} md={12} xs={12} px={1}> */}
            <InputLabel className="text-blue-800" id="term-type-label">Type</InputLabel>
            </Grid>
            <Grid item xs={16} px={1}>
            {/* // <Grid item xl={12} lg={12} md={12} xs={12} px={1}> */}
                <Select sx={{minWidth:120}}
                    labelId="term-type-label"
                    id="term-type-select"
                    value={props.currentValue}
                    onChange={onSelectTermTypeChange}
                    autoWidth
                >
                    <MenuItem value={1}>Fixed</MenuItem>
                    <MenuItem value={2}>Variable</MenuItem>
                </Select>
            </Grid>
        </div>
    )
}

export default TermTypeBox;