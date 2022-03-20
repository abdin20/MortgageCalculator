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
                <Grid container direction="row" className=" resize border-b-2" justifyContent="flex-start" alignItems="center" spacing={1} my={3}>

                    {/* image and bank name */}
                    <Grid item xs={4} sm={3} md={2} lg={3} py={2}>
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
                                <div className="text-sm whitespace-nowrap sm:block text-gray-600 mt-1 font-normal"  >{`${bank.year}-YEAR ${bank.type.toUpperCase()}`}</div>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* monthly payment */}
                    <Grid item xs={4} sm={3} md={1} lg={3} mt={-4} >
                        <div className="text-gray-700 md:text-2xl sm:text-xl text-lg">{`$${bank.payment}`}</div>
                    </Grid >

                </Grid >
            </div>
        )
    });

    return (
        <div>
            <Grid container direction="column">
                <Grid container direction="row" className="border-[#ED8936] border-b-2" justifyContent="flex-left" alignItems="center" mt={0} spacing={1}>
                    <Grid item xs={5} sm={4.2} md={4.3} lg={5.1} >
                        <Typography className="font-normal md:text-2xl sm:text-2xl text-xl text-gray-700 tracking-wide" mb={1} component="div"> Lender </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3.4} md={3.5} lg={3.9}>
                        <Typography className="font-normal md:text-2xl sm:text-2xl text-xl text-gray-700  tracking-wide" mb={1} component="div"> Rate </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4.2} md={3.8} lg={2} >
                        <Typography className="font-normal md:text-2xl sm:text-2xl text-xl text-gray-700 tracking-wide" mb={1} component="p"> Monthly Payment </Typography>
                    </Grid>
                </Grid>

                {content}
                
            </Grid>
        </div>

    );

}

export default LenderInfoRow;