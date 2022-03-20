import Box, { BoxProps } from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import Head from 'next/head';


//import custom components
import TermLengthBox from './TermLengthBox';
import AmortizationField from './AmortizationField';
import DownPaymentField from './DownPaymentField';
import PriceTextField from './PriceTextField';
import TermTypeBox from './TermTypeBox';
import LenderInfoRow from './LenderInfoRow';


//item component for stuff in box
// function Item(props: BoxProps) {
//     const { sx, ...other } = props;
//     return (
//         <Box
//             sx={{
//                 ...sx,
//             }}
//             {...other}
//         />
//     );
// }

var banks = []
function MortgageForm() {
    const termKey = { 1: "fixed", 2: "variable" }

    const [mortgageState, setMortgageState] = useState({ termLength: 1, termLengths: [], termType: "1", homePrice: '500000', downPayment: "10", mortgageAmount: '450000.00', amortization: '25' })
    const [bankState, setBankState] = useState([])
    //function to get new price from home price change
    
    
    const bankStateChange=(currState)=>{
        const mortgageType = termKey[currState.termType];
        const mortgageLength = currState.termLength;
        const downPayment = parseInt(currState.downPayment) >= 20 ? '2' : '1';

        //fetch rate data from backend
        fetch(`http://localhost:8080/api/mortgageSearch/rateSearch/?mortgageType=${mortgageType}&mortgageLength=${mortgageLength}&downPayment=1`)
            .then(response => response.json())
            .then(data => {

                //get correct downpayment level
                let correctDownPayment = data.filter(x => { return x.down_payment_level === downPayment })

                let filteredResults = []

                //remove duplicate banks
                //array is already sorted by rate so if one exists we remove it since it will be higher
                correctDownPayment.forEach(bank => {
                    if (!filteredResults.some(el => { return el.source === bank.source })) {
                        filteredResults.push(bank)
                    }
                })

                filteredResults.forEach(function (bankObj, index) {
                    // part and arr[index] point to the same object
                    // so changing the object that part points to changes the object that arr[index] points to
                    let principal = parseFloat(currState.mortgageAmount)
                    let percentageRate = parseFloat(bankObj.rate) / 12 / 100
                    let lengthOfLoan = 12 * parseInt(currState.amortization)
                    var monthlyPayment = principal * ((percentageRate * (Math.pow((1 + percentageRate), lengthOfLoan))) / ((Math.pow((1 + percentageRate), lengthOfLoan)) - 1))
                    var moneyString = monthlyPayment.toFixed(2).toLocaleString('en-US')
                    bankObj.payment = moneyString;
                });

                console.log(filteredResults)
                setBankState(filteredResults);
            });
        



    }

    const priceChangeHandler = (price) => {

        setMortgageState(prevState => {

            // calculate the new mortgage amount
            let newMortgageAmount = `${(1 - (parseFloat(prevState.downPayment) / 100)) * parseFloat(price)}`
            bankStateChange({ ...prevState, homePrice: price, mortgageAmount: newMortgageAmount });
            return { ...prevState, homePrice: price, mortgageAmount: newMortgageAmount }
        })

    }
    //function to get new price from mortgage change
    const mortgagePriceChangeHandler = (price) => {

        setMortgageState(prevState => {
            let newDownPayment = 0;
            if (parseFloat(price) > parseFloat(prevState.homePrice)) {
                newDownPayment = 100
            } else {
                newDownPayment = (1 - ((parseFloat(price) / parseFloat(prevState.homePrice)))) * 100
            }

            let newDownString = `${Math.ceil(newDownPayment)}`;
            bankStateChange({ ...prevState, downPayment: newDownString, mortgageAmount: price });
            return { ...prevState, downPayment: newDownString, mortgageAmount: price }
        })


    }

    //function to get new price from downpayment change
    const downPaymentChangeHandler = (downPaymentPrice) => {


        setMortgageState(prevState => {
            // calculate the new mortgage amount
            let newMortgageAmount = `${(1 - (parseFloat(downPaymentPrice) / 100)) * parseFloat(prevState.homePrice)}`

            bankStateChange({ ...prevState, downPayment: downPaymentPrice, mortgageAmount: newMortgageAmount })
            return { ...prevState, downPayment: downPaymentPrice, mortgageAmount: newMortgageAmount }
        })

    }

    //handle amortization changes
    const amortizationChangeHandler = (years) => {
        setMortgageState(prevState => {

            // calculate the new mortgage amount
            bankStateChange({ ...prevState, amortization: `${Math.floor(parseInt(years))}` })
            return { ...prevState, amortization: `${Math.floor(parseInt(years))}` }
        })
    }

    const termLengthChangeHandler = (years) => {

        //change number of years
        setMortgageState(prevState => {
            bankStateChange({ ...prevState, termLength: years })
            return { ...prevState, termLength: years }
        })
    }

    const termTypeChangeHandler = (termType) => {

        //fetch list of term lengths from DB depending on type
        fetch(`http://localhost:8080/api/mortgageSearch/typeSearch/?mortgageType=${termKey[termType]}`)
            .then(response => response.json())
            .then(data => {
                var terms = []
                //push new term lengths in
                data.forEach(x => { terms.push(x.year) })
                setMortgageState(prevState => {

                    bankStateChange({ ...prevState, termType: termType, termLengths: terms })
                    return { ...prevState, termType: termType, termLengths: terms }
                })
            });
    }

    //run on start up to load info for default state
    useEffect(()=>{
        
        //this will get the term lengths and update state immediately
        termTypeChangeHandler(mortgageState.termType);

    }, [])
    //get bank info from backend and add to this array, do calculations on backend
    return (

        <div className="bg-[#F7FAFC]" >
            {/* overall grid for website */}
            <Head>
                <title>Best Saskatoon Mortgages</title>
                <link rel="shortcut icon" href="/static/favicon.ico" />
            </Head>

            <Grid container spacing={0} px={4} py={2} justifyContent="flex-start" alignItems="flex-start" direction="row">

                {/* mortgage calculator part */}
                <Grid item justifyContent="left" px={1} xs={12} sm={12} md={12} lg={3} sx={{ maxWidth: 275 }} >
                    {/* insert each element column wise */}

                    {/* term length/type row */}
                    <Grid container direction="column" sx={{ backgroundColor: "#FFFFFF", maxWidth: 275 }}>
                        <Grid container direction="row">
                            <TermLengthBox currentValue={mortgageState.termLength} termLengths={mortgageState.termLengths} onTermLengthChange={termLengthChangeHandler} termType={1}></TermLengthBox>
                            <TermTypeBox currentValue={mortgageState.termType} onTermTypeChange={termTypeChangeHandler}></TermTypeBox>

                        </Grid>

                        {/* house price row */}
                        <Grid item xs={16} pt={1} px={1}><InputLabel className="text-blue-800" id="term-type-label">Home Price</InputLabel></Grid>
                        <PriceTextField currentValue={mortgageState.homePrice} onPriceChange={priceChangeHandler} />

                        {/* downpayment row */}
                        <DownPaymentField currentValue={mortgageState.downPayment} onDownPaymentChange={downPaymentChangeHandler} />

                        {/* mortgage amount row */}
                        <Grid item xs={16} pt={1} px={1}> <InputLabel className="text-blue-800" id="term-type-label">Mortgage Amount</InputLabel></Grid>
                        <PriceTextField currentValue={mortgageState.mortgageAmount} onPriceChange={mortgagePriceChangeHandler} />

                        {/* amortization row */}
                        <AmortizationField currentValue={mortgageState.amortization} onAmortizationChange={amortizationChangeHandler} />

                    </Grid>
                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={8} >
                    <Grid container direction="column">
                        {/* first row in column is term stuff */}
                        <Grid container justifyContent="center" alignItems="center" direction="row" sx={{ backGroundColor: '#EDF2F7' }} p={2} spacing={1}>
                            <Grid item xs={3} >
                                <Button variant="contained" sx={{ color: 'white', backgroundColor: '#ED8936', textTransform: 'none' }}>New Mortgage</Button>
                            </Grid>
                            <Grid item xs={3} >
                                <Button variant="contained" sx={{ color: 'black', backgroundColor: '#FFFFFF', textTransform: 'none' }}>Switch Transfer</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" sx={{ color: 'black', backgroundColor: '#FFFFFF', textTransform: 'none' }}>Refinancing</Button>
                            </Grid>
                        </Grid>

                        <LenderInfoRow mortgageState={mortgageState} bankInfo={bankState}></LenderInfoRow>


                    </Grid>
                </Grid>


            </Grid>




        </div >);
}

export default MortgageForm
