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



function MortgageForm() {
    const termKey = { 1: "fixed", 2: "variable" }

    const [mortgageState, setMortgageState] = useState({ allBanks: [], termLength: 1, termLengths: [], termType: "1", homePrice: '500000', downPayment: "10", mortgageAmount: '450000.00', amortization: '25' })
    const [bankState, setBankState] = useState([])
    //function to get new price from home price change


    const bankStateChange = (currState) => {
        const mortgageType = termKey[currState.termType];
        const mortgageLength = currState.termLength;
        const downPayment = parseInt(currState.downPayment) >= 20 ? '2' : '1';

        //fetch rate data from backend

        //get correct banks from list of all banks
        let correctDownPayment = currState.allBanks.filter(x => {
            return x.down_payment_level === downPayment && x.year === mortgageLength && x.type === mortgageType
        })

        correctDownPayment=correctDownPayment.sort((a,b)=>{
            if( parseFloat(a.rate)>parseFloat(b.rate)){
                return 1;
            }else if ( parseFloat(a.rate)<parseFloat(b.rate)){
                return -1
            }else{
                return 0;
            }
        })

        let filteredResults = []

        //remove duplicate banks
        //array is already sorted by rate so if one exists we remove it since it will be higher
        correctDownPayment.forEach(bank => {
            if (!filteredResults.some(el => { return el.source === bank.source })) {
                filteredResults.push(bank)
            }
        })

        //add payment info to each of the filtered banks
        filteredResults.forEach(function (bankObj, index) {
            let principal = parseFloat(currState.mortgageAmount)
            let percentageRate = parseFloat(bankObj.rate) / 12 / 100
            //check if amortization is at least
            let lengthOfLoan = 12 *  (parseInt(currState.amortization)===0 ? 1:parseInt(currState.amortization))
            var monthlyPayment = principal * ((percentageRate * (Math.pow((1 + percentageRate), lengthOfLoan))) / ((Math.pow((1 + percentageRate), lengthOfLoan)) - 1))
            var moneyString = `${monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

            bankObj.payment = moneyString;
        });
        setBankState(filteredResults);


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

        //fetch new term lengths
        fetch(`http://localhost:8080/api/mortgageSearch/typeSearch/?mortgageType=${termKey[termType]}`)
            .then(response => response.json())
            .then(data => {
                var terms = []
                //push new term lengths in
                data.forEach(x => { terms.push(x.year) })

                //set state by adding new list of term lengths
                setMortgageState(prevState => {

                    let currTermLength = prevState.termLength
                    //check if box selecting term length exists in type
                    //if not we set to first value in terms list
                    if (!terms.includes(currTermLength)) {
                        currTermLength = terms[0]
                    }
                    bankStateChange({ ...prevState, termType: termType, termLengths: terms, termLength: currTermLength })
                    return { ...prevState, termType: termType, termLengths: terms, termLength: currTermLength }
                })
            });

    }

    //run on start up to load info for default state
    useEffect(() => {

        //fetch list of term lengths from DB depending on type
        fetch(`http://127.0.0.1:8080/api/mortgageSearch/typeSearch/?mortgageType=${termKey[mortgageState.termType]}`)
            .then(response => response.json())
            .then(data => {
                var terms = []

                //push new term lengths in for the type 
                data.forEach(x => { terms.push(x.year) })

                //get initial list of all banks 
                fetch(`http://127.0.0.1:8080/api/mortgageSearch/all`)
                    .then(response => response.json())
                    .then(data => {

                        var fetchedAllBanks = data;
                        setMortgageState(prevState => {

                            //run bankstate change to show proper banks based on state info
                            bankStateChange({ ...prevState, termLengths: terms, allBanks: fetchedAllBanks })
                            //change mortgage form state as well
                            return { ...prevState, termLengths: terms, allBanks: fetchedAllBanks }
                        })
                    });
            });

    }, [])
    //get bank info from backend and add to this array, do calculations on backend
    return (

        <div className="bg-[#F7FAFC]" >
            {/* overall grid for website */}
            <Head>
                <title>Best Saskatoon Mortgages</title>
                <link rel="shortcut icon" href="/static/favicon.ico" />
            </Head>

            <Grid container spacing={0} pl={2} py={2} justifyContent="flex-start" alignItems="flex-start" direction="row">

                {/* mortgage calculator part */}
                <Grid item px={2} xs={12} sm={8} md={4} lg={3.4}  xl={2.4}>
                    {/* insert each element column wise */}
                    {/* term length/type row */}
                    <Grid container direction="column" justifyContent="center" alignItems="flex-start"sx={{ backgroundColor: "#FFFFFF",maxWidth:450}}>
                        <Grid container direction="row" >
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


                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Grid container direction="column">
                        {/* first row in column is term stuff */}
                        <Grid container justifyContent="center" alignItems="center" direction="row" sx={{ backGroundColor: '#EDF2F7' }} p={5} spacing={1}>
                            <Grid item xs={4}  md={4} lg={4}>
                                <Button variant="contained" sx={{ color: 'white', backgroundColor: '#ED8936', textTransform: 'none' }}>New Mortgage</Button>
                            </Grid>
                            <Grid item xs={4}  md={4} lg={4}>
                                <Button variant="contained" sx={{ color: 'black', backgroundColor: '#FFFFFF', textTransform: 'none' }}>Switch Transfer</Button>
                            </Grid>
                            <Grid item xs={4} md={4} lg={4}>
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
