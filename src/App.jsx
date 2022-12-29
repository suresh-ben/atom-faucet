import React, { useState } from 'react';
import { ethers } from 'ethers';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Body from './components/Body/Body';
import Burn from './components/Burn/Burn';
import About from './components/About/About';

import atom_abi from './atom_erc20.json';

function App() {

    const contactAddress = "0x2eBD9a4E16b7dE2Af9cAC774D1E08087091093D2";
    const [ connectionStatus, SetConnectionStatus ] = useState("connect wallet");
    const [ connectionError, SetConnectionError ] = useState("");

    const [ signer, SetSigner ] = useState();

    async function ConnectEthers() {

        let tempProvider = await  new ethers.providers.Web3Provider(window.ethereum);

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
        let transactionStatus = await contract.mintAtoms({value : ethers.utils.parseEther(value)});
        await transactionStatus.wait(1);

        return true;
    }

    const [ transferMessage, SetTransferMessage ] = useState("");
    const [ transferMessageStyle, SetTransferMessageStyle ] = useState({});
    async function Transfer(to_address, value) {
        SetTransferMessage("connecting...!!!");
        SetTransferMessageStyle({color : "white"});

        if(connectionStatus !== "Connected")
        {
            SetTransferMessage("Please connect wallet");
            SetTransferMessageStyle({color : "red"});
            return false;
        }

        let contract = await new ethers.Contract(contactAddress, atom_abi, signer);
        await contract.transfer(to_address, value);
        
        SetTransferMessage("Transfer successful...!!!");
        SetTransferMessageStyle({color : "green"});

        return true;
    }


    const [ approveMessage, SetApproveMessage ] = useState("");
    const [ approveMessageStyle, SetApproveMessageStyle ] = useState({});
    async function Approve(partyAddress, value) {
        SetApproveMessage("connecting...");
        SetApproveMessageStyle({color : "white"});

        if(connectionStatus !== "Connected")
        {
            SetApproveMessage("please connect wallet...!!!");
            SetApproveMessageStyle({color : "red"});
            return false;
        }

        let contract = await new ethers.Contract(contactAddress, atom_abi, signer);
        await contract.approve(partyAddress, value);
        
        SetApproveMessage("Approved !!!");
        SetApproveMessageStyle({color : "green"});
        return true;
    }
    
    const [ thirdPartyAllowedAmount, SetallowedAmount ] = useState("_");
    const [ allowanceError, SetAllowanceError ] = useState("");
    async function Allowance(partyAddress) {
        if(connectionStatus !== "Connected")
        {
            SetAllowanceError("please connect wallet");
            return false;
        }

        let contract = await new ethers.Contract(contactAddress, atom_abi, signer);

        let ownerAddress;
        await window.ethereum.request({method : 'eth_requestAccounts'})
          .then( result => { 
            ownerAddress = result[0] + "";
            console.log(ownerAddress);

            (async () => {
                let allowedAmount = await contract.allowance(ownerAddress, partyAddress);
                allowedAmount = allowedAmount.toString() + "";
                allowedAmount = Number(allowedAmount);
                allowedAmount /= 1000;
                SetallowedAmount(allowedAmount);
            })();
        });
        
        return true;
    }

    const [thirdPartyMessage, SetThirdPartyMessage ] = useState("");
    const [thirdPartyMessageStyle, SetThirdPartyMessageStyle ] = useState({});
    async function ThirdPartyTransaction(fromAddress, toAddress, value) {
        SetThirdPartyMessage("connecting...!!!");
        SetThirdPartyMessageStyle({color : "white"});

        if(connectionStatus !== "Connected")
        {
            SetThirdPartyMessage("Please connect wallet");
            SetThirdPartyMessageStyle({color : "red"});
            return false;
        }

        let contract = await new ethers.Contract(contactAddress, atom_abi, signer);

        contract.transferFrom(fromAddress, toAddress, value);

        SetThirdPartyMessage("Transaction successfull...");
        SetThirdPartyMessageStyle({color : "green"});
        return true;
    }

    const [ burnMessage, SetBurnMessage ] = useState("");
    const [ burnMessageStyle, SetBurnMessageStyle ] = useState({});
    async function BurnAtoms(value) {
        SetBurnMessage("connecting...!!!");
        SetBurnMessageStyle({color : "white"});

        if(connectionStatus !== "Connected")
        {
            SetBurnMessage("please connect wallet !!!");
            SetBurnMessageStyle({color : "red"});
            return false;
        }

        let contract = await new ethers.Contract(contactAddress, atom_abi, signer);

        await contract.burnElectrons(value);

        SetBurnMessage("Successufully burned atoms !!!");
        SetBurnMessageStyle({color : "green"});
        return true;
    }

    return (
        <div>
            <Header connectionStatus={connectionStatus} connect={connetWallet} />
            <center style={{ color : "red" }} >{connectionError}</center>
            <Home mintAtoms={MintAtoms} />

            <Body 
                thirdPartyTransaction={ThirdPartyTransaction} thirdPartyMessage={thirdPartyMessage} thirdPartyMessageStyle={thirdPartyMessageStyle}
                allowance={Allowance} allowedAmount={thirdPartyAllowedAmount} allowanceError={allowanceError}
                approve={Approve} approveMessage={approveMessage} approveMessageStyle={approveMessageStyle}
                transfer={Transfer} transferMessage={transferMessage} transferMessageStyle={transferMessageStyle}
            />

            <Burn burn={BurnAtoms} burnMessage={burnMessage} burnMessageStyle={burnMessageStyle} />
            <About />
        </div>
    );
}

export default App;