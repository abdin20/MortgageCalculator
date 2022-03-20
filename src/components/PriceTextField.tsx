import { TextField } from '@mui/material';
import { Grid } from '@mui/material';

function PriceTextField(props) {


    //round to 2 decimals  
    const cleanString = (event) => {
        var regEx = new RegExp("^[0-9]+[.]?[0-9]*$");
        var decimalRegEx = new RegExp("^[0]+[.][0-9]*$")
        let currText = event.target.value;
        //remove any commas and dollar signs
        currText = currText.replace(/[$,\s]/g, '')
        
        //remove leading zero only if its not a decimal
        if (currText.indexOf("0") === 0 && currText.indexOf(".")<0) {
            currText = currText.substring(1);
        }
            //if input has nothing we set default to $0
        if (currText.length < 1) {
            currText = "0"
            props.onPriceChange((currText))
            //else we parse the field only if if matches the regex we set
        } else if (currText.length > 0 && (regEx.test(currText) || decimalRegEx.test(currText))) {
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
    //add commas
    let correctString = `$${moneyString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` + decimal;
    return (
        <div>
            <Grid item xs={16} px={1}>
                <TextField id="standard-basic" value={correctString} variant="standard" onChange={cleanString} />
            </Grid>

        </div>

    );
}

export default PriceTextField;