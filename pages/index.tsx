import Head from 'next/head';
import MortgageForm from './mortgageForm';
import {FC, useEffect, useState} from 'react';



const Home: FC = () => {


    return (
        <>
            <Head>
                <title>Best Saskatoon Mortgages</title>
                <link rel="shortcut icon" href="/favicon.ico" />
            <MortgageForm></MortgageForm>
            </Head>
        

        </>
    );
};

export default Home;

