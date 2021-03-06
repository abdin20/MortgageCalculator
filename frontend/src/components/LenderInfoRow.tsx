import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
function LenderInfoRow(props) {

    //curent state of mortgage info form
    //get all the bank info we will be displaying
    const bankInfo = props.bankInfo

    //go thru each bank and make a component for it
    let content = bankInfo.map(bank => {
        let bankImageName = bank.source.toLowerCase().replace(/ +/g, '-')
        const logo = `/static/logos/${bankImageName}.png`
        return (

            <div key={`${(Math.random() + 1).toString(36).substring(7)}`}>
                <Grid container direction="row" className=" resize border-b-2" justifyContent="flex-start" alignItems="center" spacing={1} my={3} sx={{ backgroundColor: "#FFFFFF",maxWidth:950}}>

                    {/* image and bank name */}
                    <Grid item xs={4} sm={3} md={2} lg={3} py={2} my={1}>
                        <Grid container direction='row' justifyContent="center" alignItems="center">
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                <Image src={logo} width="100%" height="100%" objectFit="contain" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={4} pl={1}>
                                <div className="text-gray-700 sm:text-lg text-md">{bank.source}</div>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* rate */}
                    <Grid item xs={4} sm={6} md={6} lg={6}>
                        <Grid container direction='column' justifyContent="center" alignItems="center">
                            <Grid item xs={2} mb={1}>
                                <div className="md:text-3xl sm:text-2xl text-xl font-bold text-gray-700">{`${bank.rate}%`}</div>
                            </Grid>
                            <Grid item xs={3} mb={2} >
                                <div className="text-sm whitespace-nowrap sm:block text-gray-600 mt-1 font-normal">{`${bank.year}-YEAR ${bank.type.toUpperCase()}`}</div>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* monthly payment */}
 
                    <Grid item xs={4} sm={3} md={1} lg={3} my={5} >
                        {/* {{'overflowWrap': 'break-word'}} */}
                        {/* <div className="max-w-fit text-gray-700 md:text-2xl sm:text-xl text-lg">{`$${bank.payment}`}</div> */}
                        <Typography variant="h6" className="text-gray-700 xs:text-[2px] md:text-xl sm:text-base text-xl" mb={1} component="div">{`$${bank.payment.substring(0,20)}`}</Typography>
                    </Grid >

                </Grid >    
            </div>
        )
    });

    return (
        <div>
            <Grid container direction="column">
                <Grid container direction="row" className="border-[#ED8936] border-b-2" justifyContent="center" alignItems="center" mt={0} spacing={1} >
                    <Grid item xs={5} sm={5} md={4} lg={4.5} >
                        <Typography variant="h6" className="font-normal md:text-2xl sm:text-2xl text-xl text-gray-700 tracking-wide" mb={1} component="div"> Lender </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={4} lg={3.6}>
                        <Typography variant="h6" className="font-normal md:text-2xl sm:text-2xl text-xl text-gray-700  tracking-wide" mb={1} component="div"> Rate </Typography>
                    </Grid>
                    <Grid item xs={3.5} sm={3} md={4} lg={2.2} mb={1} >
                        <Typography variant="h6"className=" font-normal md:text-2xl sm:text-2xl text-xl text-gray-700 tracking-wide" mb={1} component="div"> Monthly Payment </Typography>
                    </Grid>
                </Grid>

                {content}
                
            </Grid>
        </div>

    );

}

export default LenderInfoRow;