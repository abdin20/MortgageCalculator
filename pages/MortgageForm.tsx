import Box, { BoxProps } from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import Head from 'next/head';


//import custom components
import TermLengthBox from 'src/components/TermLengthBox';
import AmortizationField from 'src/components/AmortizationField';
import DownPaymentField from 'src/components/DownPaymentField';
import PriceTextField from 'src/components/PriceTextField';
import TermTypeBox from 'src/components/TermTypeBox';
import LenderInfoRow from 'src/components/LenderInfoRow';


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


function MortgageForm() {

    const [mortgageState, setMortgageState] = useState({ termLength: 1, termLengths: [1, 2, 3, 4], termType: "1", homePrice: '500000', downPayment: "10", mortgageAmount: '450000.00', amortization: '2' })
    //function to get new price from home price change
    const priceChangeHandler = (price) => {

        setMortgageState(prevState => {

            // calculate the new mortgage amount
            let newMortgageAmount = `${(1 - (parseFloat(prevState.downPayment) / 100)) * parseFloat(price)}`
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
            return { ...prevState, downPayment: newDownString, mortgageAmount: price }
        })


    }

    //function to get new price from downpayment change
    const downPaymentChangeHandler = (downPaymentPrice) => {


        setMortgageState(prevState => {
            // calculate the new mortgage amount
            let newMortgageAmount = `${(1 - (parseFloat(downPaymentPrice) / 100)) * parseFloat(prevState.homePrice)}`
            return { ...prevState, downPayment: downPaymentPrice, mortgageAmount: newMortgageAmount }
        })

    }

    //handle amortization changes
    const amortizationChangeHandler = (years) => {
        setMortgageState(prevState => {

            // calculate the new mortgage amount
            return { ...prevState, amortization: `${Math.floor(parseInt(years))}` }
        })
    }

    const termLengthChangeHandler = (years) => {

        //change number of years
        setMortgageState(prevState => {
            return { ...prevState, termLength: years }
        })
    }

    const termTypeChangeHandler = (termType) => {

        //fetch list of term lengths from DB depending on type
        var terms = [1, 20, 100];
        if (termType === 1) {
            terms = [1, 2, 10];
        } else {
            terms = [1, 5, 25];
        }


        //DONT FORGET TO UPDATE TERMLENGTH HERE TOO
        setMortgageState(prevState => {
            return { ...prevState, termType: termType, termLengths: terms }
        })

    }

    // var bankInfo=[];

    const bankInfo = [{
        "id": 260,
        "source": "BMO",
        "year": 2,
        "down_payment_level": 3,
        "first_mortgage": true,
        "long_amortization": false,
        "rate_type": "fixed",
        "rate": 3.16,
        "posted": false,
        "refinance_rate": null,
        "type": "fixed",
        "payment": '$2,403'
    },
    {
        "id": 260,
        "source": "TD",
        "year": 2,
        "down_payment_level": 3,
        "first_mortgage": true,
        "long_amortization": false,
        "rate_type": "fixed",
        "rate": 3.16,
        "posted": false,
        "refinance_rate": null,
        "type": "fixed",
        "payment": '$3,453'
    },
    {
        "id": 260,
        "source": "Spectrum Canada",
        "year": 2,
        "down_payment_level": 3,
        "first_mortgage": true,
        "long_amortization": false,
        "rate_type": "fixed",
        "rate": 3.16,
        "posted": false,
        "refinance_rate": null,
        "type": "fixed",
        "payment": '$10,000'
    }
    ]
    //get bank info from backend and add to this array, do calculations on backend


    return (

        <div className="bg-[#F7FAFC]" >
            {/* overall grid for website */}
            <Head>
                <title>Best Saskatoon Mortgages</title>
                <link rel="shortcut icon" href="/static/favicon.ico" />
            </Head>
           
            <Grid container spacing={0} px={4} py={2}  justifyContent="flex-start" alignItems="flex-start" direction="row">

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

                        <LenderInfoRow mortgageState={mortgageState} bankInfo={bankInfo}></LenderInfoRow>


                    </Grid>
                </Grid>


            </Grid>




        </div >);
}

export default MortgageForm
