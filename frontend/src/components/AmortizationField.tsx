import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
function AmortizationField(props) {

    //function to sanitize input then send to parent
    const onAmortizationFieldTextChange = (event) => {
        let currText = event.target.value;

        //check for default value to remove 0
        if (currText.indexOf("1") === 0) {
            currText = currText.substring(1);
        }

        //if input has nothing we set default to 0
        if (currText.length < 1) {
            props.onAmortizationChange('1');
            //else we parse the field only if its a number
        } else if (currText.length > 0 && !isNaN(currText)) {
            props.onAmortizationChange(currText);
        }

    }
    return (
        <div>

            <Grid item xs={16}  pt={1} px={1}>
                <InputLabel className="text-blue-800" id="term-type-label">Amortization</InputLabel>
            </Grid>
            <Grid item xs={16} px={1}>
                <TextField id="standard-basic" value={props.currentValue} variant="standard" onChange={onAmortizationFieldTextChange} /> Years
            </Grid>


        </div>)
}

export default AmortizationField;