import React, { useState } from "react";

import './Home.css';

function Home(props) {

    const [ mintStatus, SetMintStatus ] = useState("");
    const [ mintStatusStyle, SetMintStatusStyle ] = useState({});

    async function MintAtoms(event) {
        event.preventDefault();
        SetMintStatus("minting....!!!");
        SetMintStatusStyle({color : "white"});

        let atoms = Number(event.target.atoms.value);
        console.log("minting " + atoms + " AM's");
        let value = atoms * 0.1;

        props.mintAtoms(value)
            .then((status) => {
                if(!status) {
                    SetMintStatusStyle({color : "red"});
                    SetMintStatus("Please connect wallet before minting atoms");
                }
                else {

                    SetMintStatusStyle({color : "green"});
                    SetMintStatus("minted " + event.target.atoms.value + "into your wallet");
                }  
            });
    }

    return(
        <div className="home-body row">
            <div className="home-parts col-lg-6 col-lg-6 col-sm-12">
                <div className="content">
                    <span>What is atom ( AM token ) ?</span><br/>
                    <p>
                        atom is an ERC20 token build on sepolia network.<br/>
                        Every atom contains 1000 electrons that makes them involve decimal values in transactions<br/>
                        conversion 1 AM = 0.1 ETH on sepolia network
                    </p>
                    <br/><br/>

                    <span>How to buy atoms ?</span><br />
                    <p>
                        This website is an atom faucet.<br/>
                        Anyone can buy atoms using this website.<br/>
                        Connect your metamask wallet to this website and mint new atoms in to your account<br/>
                        users can also burn their atoms to convert them back to ETH.
                    </p>
                    <br/><br/>

                </div>
            </div>

            <div className="home-parts col-lg-6 col-lg-6 col-sm-12">
                <center>
                    <h2>Mint new atoms</h2>

                    <br/><br/><br/>
                    
                    <form onSubmit={MintAtoms}>
                        <input id="atoms" placeholder="Number of atoms to mint" type="number" required min="0.01" step="0.001"/><br/>
                        <p style={mintStatusStyle}>
                            {mintStatus}
                        </p>
                        <br/>
                        <button type="submit"> Mint atoms </button>
                    </form>

                </center>
            </div>
        </div>
    );
}

export default Home;