import Head from 'next/head';
import MortgageForm from '../src/components/MortgageForm';
import {FC, useEffect, useState} from 'react';



const Home: FC = () => {


    return (
        <>
            <Head>
                <title>Best Saskatoon Mortgages</title>
                <link rel="shortcut icon" href="/static/favicon.ico" />
            </Head>

            <MortgageForm></MortgageForm>

        </>
    );
};

export default Home;

