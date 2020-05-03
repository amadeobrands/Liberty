import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import './portis.css';
//extermal support
import { Button } from '@material-ui/core';
import Portis from '@portis/web3';
import Web3 from 'web3';



const portisLoginBtn = props => {

    const portis = new Portis('3febd4a7-570f-4515-bc40-2963e3db29b3', 'rinkeby');
    const web3 = new Web3(portis.provider);
  
    const openPortisClick = async () => { 
        portis.showPortis();
        //web3.eth.getAccounts((error, accounts) => {
        //console.log(accounts);
        //});

        // const ethxpub = await portis.getExtendedPublicKey(
        // "m/44'/60'/0'/0/0",
        // "Ethereum"
        // );
        // console.log("ethxpub", ethxpub);
    
        // const btcxpub = await portis.getExtendedPublicKey("m/44'/0'/0'", "Bitcoin");
        // const btcwallet = portis.showBitcoinWallet("m/49'/0'/0'/0/0");
        // console.log("btcxpub", btcxpub);
        // console.log("my btc wallet:", btcwallet);

        portis.onLogin((walletAddress, email, reputation) => {
            console.log(walletAddress, email, reputation);
          });
    }

    return (
        <Button variant="contained" color="primary" onClick={openPortisClick}>Log Into Portis Wallet</Button>
    );
  };
  
  export default withRouter(portisLoginBtn);
  