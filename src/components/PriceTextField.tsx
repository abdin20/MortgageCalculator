import { TextField } from '@mui/material';
import { Grid } from '@mui/material';

function PriceTextField(props) {


    //round to 2 decimals  
    const cleanString = (event) => {

        let currText = event.target.value;
        //remove any commas and dollar signs
        currText = currText.replace(/[$,\s]/g, '')
        //if input has nothing we set default to $0
        if (currText.indexOf("0") === 0) {
            currText = currText.substring(1);
        }
        if (currText.length < 1) {
            currText = "0"
            props.onPriceChange((currText))
            //else we parse the field only if its a number
        } else if (currText.length > 0 && typeof parseFloat(currText) === 'number') {
            //give parent function the new price
            props.onPriceChange((currText))

        }
    }

    // let us account for decmials! 
    let decimal = "";
    let moneyString = props.currentValue.replace(/[$,\s]/g, '');
    //get decimal values

    if (props.currentValue.indexOf(".") > 0) {
        decimal = "." + props.currentValue.substring(props.currentValue.indexOf(".") + 1);
        if (decimal.length > 3) {
            decimal = decimal.substring(0, 3);
        }
        moneyString = props.currentValue.substring(0, props.currentValue.indexOf("."));
    }

    let correctString = "$" + parseInt(moneyString).toLocaleString('en-US') + decimal;
    // let moneyString="$"+(props.currentValue).toLocaleString('en-US', {maximumFractionDigits: 2})
    // let moneyString= `$${rawNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    // let moneyString=`$ +${props.currentValue.toLocaleString('en-US', {maximumFractionDigits: 2})}`
    return (
        <div>
            <Grid item xs={16} px={1}>
                <TextField id="standard-basic" value={correctString} variant="standard" onChange={cleanString} />
            </Grid>

        </div>

    );
}

export default PriceTextField;