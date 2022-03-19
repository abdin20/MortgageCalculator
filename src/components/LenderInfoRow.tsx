import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
function LenderInfoRow(props) {

    //curent state of mortgage info form
    const mortgageState = props.mortgageState;

    //get all the bank info we will be displaying
    const bankInfo = props.bankInfo


    let content = bankInfo.map(bank => {
        let bankImageName = bank.source.toLowerCase().replace(/ +/g, '-')
        console.log(bankImageName)
        const logo = `/logos/${bankImageName}.png`
        return (

            <div key={`${(Math.random() + 1).toString(36).substring(7)}`}>
                <Grid container direction="row" className=" resize border-b-2" justifyContent="flex-start" alignItems="center" my={0.5} spacing={1}>

                    {/* image and bank name */}
                    <Grid item xs={1} sm={2} md={2} lg={3} >
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Grid item xs={1.5} >
                                <Image src={logo} width="25px" height="25px" />
                            </Grid>
                            <Grid item xs={10.5} >
                                <Typography className="text-gray-700 sm:text-lg text-md" mb={1} variant="h7" component="div">{bank.source}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* rate */}
                    <Grid item xs={1} sm={2} md={6} lg={6}>
                        <Grid container direction='column' justifyContent="center" alignItems="center">
                            <Grid item xs={2}>
                                <Typography className="md:text-3xl sm:text-2xl text-xl font-bold text-gray-700"mb={1} variant="h7" component="dive">{`${bank.rate}%`}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography className="text-sm hidden whitespace-nowrap sm:block text-gray-600 mt-1 font-normal" mb={1} variant="h7" component="div">{`${bank.year}-YEAR ${bank.type.toUpperCase()}`}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={1} sm={2} md={1} lg={3}>
                        {/* <Typography  className="border-[#ED8936] border-b-2 md:text-2xl sm:text-xl text-lg" component="div">{`${bank.payment}`}</Typography> */}
                        <div className="md:text-2xl sm:text-xl text-lg">{`${bank.payment}`}</div>
                    </Grid >

                </Grid >
            </div>
        )
    });

    return (
        <div>
            {/* <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" sx={{ backgroundColor: '#ED8936', minWidth: '300', maxWidth: 550 }} mt={1} spacing={1}> */}
            {/* <Grid container className="border-[#ED8936] border-b-2" direction="row" justifyContent="flex-start" alignItems="center" mt={1} > */}
            <Grid container direction="column">
            <Grid container direction="row" className="border-[#ED8936] border-b-2" justifyContent="flex-left" alignItems="center"  mt={0} spacing={1}>
                <Grid item xs={1} sm={2} md={4.3} lg={5.4} >
                    <Typography className="font-normal py-1 sm:px-4 text-md text-gray-700 tracking-wide"  mb={1} component="div"> Lender </Typography>
                </Grid>
                <Grid item xs={1} sm={2} md={3.5} lg={3.3}>
                    <Typography className="font-normal py-1 sm:px-4 text-md text-gray-700 tracking-wide" mb={1} component="div"> Rate </Typography>
                </Grid>
                <Grid item xs={1} sm={2} md={3.8} lg={2} >
                    <Typography className="font-normal py-1 sm:px-4 text-md text-gray-700 tracking-wide" mb={1} component="p"> Monthly Payment </Typography>
                </Grid>
            </Grid>
         
            {content}
            </Grid>
        </div>

    );

}

export default LenderInfoRow;