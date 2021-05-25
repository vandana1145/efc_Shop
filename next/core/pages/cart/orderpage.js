import React from "react";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

function Order(props){
    const [cart, setCart] = useState(0)
    return (
        <div>
            Order Summary
            <Head>
                <title>Order Summary</title>
            </Head>        
      </div>
    );
}

export default Order;