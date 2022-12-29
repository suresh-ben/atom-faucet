import React, { useState } from 'react';

import './Body.css';

//TransferFrom

function Body(props) {

    function Transfer(event) {
        event.preventDefault();
        let atoms = Number(event.target.transferAtoms.value);
        let value = atoms * 1000;
        let to_address = event.target.toAddress.value;

        console.log("Electrons : " + value);
        props.transfer(to_address, value);
    }

    function Approve(event) {
        event.preventDefault();

        let atoms = Number(event.target.approveAtoms.value);
        let value = atoms * 1000;
        let partyAddress = event.target.thirdParty.value;

        props.approve(partyAddress, value);
    }

    function Allowance(event) {
        event.preventDefault();

        let partyAddress = event.target.partyAddress.value;

        props.allowance(partyAddress);
    }

    function ThirdPartyTransaction(event) {
        event.preventDefault();

        let fromAddress = event.target.partyFromAddress.value;
        let toAddress = event.target.partyToAddress.value;

        let atoms = Number(event.target.thridPartyAmount.value);
        let value = atoms * 1000;

        props.thirdPartyTransaction(fromAddress, toAddress, value);
    }

    return(
        <div className="atom-body">
            <hr />
            <center>
                <div className="transfer-section">

                    <h2>
                        Transfer your atoms
                    </h2>

                    <br /><br /><br /><br />

                    <form onSubmit={Transfer}>
                        <input placeholder="Number of atoms" type="number" id="transferAtoms" required min="0.01" step="0.001" /><br /><br />
                        <input placeholder="Address of reciever" type="text" id="toAddress" /><br /><br />
                        
                        <button type="submit">
                            Transfer atoms
                        </button>
                        <p style={props.transferMessageStyle} > {props.transferMessage} </p>
                    </form>

                </div>

                <hr />
                <br />

                <h1>--- Third party ---</h1>

                <div className="">
                    <div className="Approve-section"> 
                        <h2>
                            Approve third party to do transactions behalf of you
                        </h2>

                        <form onSubmit={Approve} >
                            <input placeholder="Address of third party" type="text" id="thirdParty" /><br /><br />
                            <input placeholder="Increment the allowed atoms" type="number" id="approveAtoms" required min="0.01" step="0.001" /><br /><br />

                            <button type="submit" >
                                Approve third Party
                            </button>
                            <p style={props.approveMessageStyle} > {props.approveMessage} </p>
                        </form>
                    </div>

                    <br /><br /><br /><br />

                    <div className="allow-section" >
                        <h2>
                            Check third party limit...!!!
                        </h2>

                        <form onSubmit={Allowance} >
                            <input placeholder="Address of third party" type="text" id="partyAddress" /><br /><br />
                            <p>
                                Allowed amount to this address is : {props.allowedAmount} atoms
                            </p>

                            <button type="submit" >
                                Check Approved atoms
                            </button>
                            <p style={{color : "red"}} > {props.allowanceError} </p>
                        </form>
                    </div>

                    <br /><br /><br /><br />

                    <div className="transfer-from-section">
                        <h2>
                            Third party transaction
                        </h2>

                        <form onSubmit={ThirdPartyTransaction} >
                            <input placeholder="Enter from address" type="text" id="partyFromAddress" /><br /><br />
                            <input placeholder="Enter to address" type="text" id="partyToAddress" /><br /><br />

                            <input placeholder="Amount" type="number" id="thridPartyAmount" required min="0.01" step="0.001" /><br /><br />

                            <button type="submit">
                                Do Transaction
                            </button>
                            <p style={props.thirdPartyMessageStyle} > {props.thirdPartyMessage} </p>
                        </form>

                    </div>
                </div>

                <hr />

            </center>
        </div>
    );
}

export default Body;