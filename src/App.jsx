import React, { useState } from 'react';
import { ethers } from 'ethers';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import atom_abi from './atom_erc20.json';

function App() {

    const contactAddress = "0x2eBD9a4E16b7dE2Af9cAC774D1E08087091093D2";
    const [ connectionStatus, SetConnectionStatus ] = useState("connect wallet");
    const [ connectionError, SetConnectionError ] = useState("");

    const [ provider, SetProvider ] = useState();
    const [ signer, SetSigner ] = useState();

    async function ConnectEthers() {

        let tempProvider = await  new ethers.providers.Web3Provider(window.ethereum);
        SetProvider(tempProvider);

        //To verify connection
        await window.ethereum.request({method : 'eth_requestAccounts'})
          .then( result => {console.log(result)});

        let tempSinger = await tempProvider.getSigner();
        SetSigner(tempSinger);
        
        return true;
    }

    function connetWallet() {
        SetConnectionStatus("connecting...");

        if(window.ethereum)
        {
            console.log("conneting...");
            ConnectEthers()
                .then(() => {
                    SetConnectionStatus("Connected");
                })
                .catch((err) => {
                    SetConnectionStatus("Error connecting");
                    console.log(err);
                });
        }
        else {
            SetConnectionError("Error with MetaMask, Make sure you installed metamask on your browser!!!");
            return "false";
        } 
    }

    /** interaction functions */
    async function MintAtoms(value){
        if(connectionStatus !== "Connected")
        {
            //setError - todo
            return false;
        }

        let contract = await new ethers.Contract(contactAddress, atom_abi, signer);

        value = "" + value;
        await contract.mintAtoms({value : ethers.utils.parseEther(value)});
        return true;
    }
        

    return (
        <div>
            <Header connectionStatus={connectionStatus} connect={connetWallet} />
            <Home mintAtoms={MintAtoms} />
        </div>
    );
}

export default App;