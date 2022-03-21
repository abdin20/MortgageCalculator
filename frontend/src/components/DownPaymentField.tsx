import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';
function DownPaymentField(props) {



    //use this to clean up input
    const onDownPaymentTextFieldChange = (event) => {
        //regex used to check for valid number
        var regEx = new RegExp("^[0-9]+[.]?[0-9]*$");
        let currText=event.target.value;

        //remove leading zeros unless its decmial
        if(currText.indexOf("0") === 0 && currText.indexOf(".")<0){
           currText=currText.substring(1);
        }
        //check for null input
        if(currText.length<1){
            currText="0"
            props.onDownPaymentChange((currText))
            //else we parse the field only if its a number
        }else if(currText.length>0 && regEx.test(currText)){
            //check if its higher than 100
            if(parseFloat(currText)>100){
                currText="100";
            }
            props.onDownPaymentChange((currText))
            
        }
    }

    // let us account for decmials! 
    let decimal="";
    let moneyString=props.currentValue
    //get decimal values

    if(props.currentValue.indexOf(".")>0){
        decimal="."+props.currentValue.substring(props.currentValue.indexOf(".")+1);
        if(decimal.length>3){
            decimal=decimal.substring(0,3);
        }
        moneyString=props.currentValue.substring(0,props.currentValue.indexOf("."));
    }

    //add the decimals to the string
    let correctString = `${moneyString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` + decimal;

    return (
        <div> <Grid item xs={16} pt={1} px={1}>
             <InputLabel className="text-blue-800" id="term-type-label">Downpayment</InputLabel>
             </Grid>
             <Grid item xs={16} px={1}>
            <TextField id="standard-basic" value={correctString} variant="standard" onChange={onDownPaymentTextFieldChange} />%
            </Grid>
        </div>)
}

export default DownPaymentField;
