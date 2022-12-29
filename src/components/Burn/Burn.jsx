import React from 'react';

import './Burn.css'
import burnImage from './burn.png';

function Burn(props) {

    function BurnAtoms(event) {
        event.preventDefault();

        let atoms = Number(event.target.burnAtoms.value);
        let value = atoms * 1000;

        props.burn(value);
    }

    return (
        <div className="burn-body row">
            <div className="col-lg-6 col-md-6 col-sm-12">
                <center>
                    <img className="burn-img" src={burnImage} alt="Buring image" />
                </center>
            </div>

            <div className="burn-atoms-content col-lg-6 col-md-6 col-sm-12">
                <center>
                    <h2 className="alert">
                        Burn your atoms...!!!
                    </h2>

                    <form onSubmit={BurnAtoms}>
                        <input placeholder="Atoms to burn" type="number" id="burnAtoms" required min="0.01" step="0.001" /><br /><br />

                        <button type="submit">
                            Burn atoms
                        </button>
                    </form>
                </center>
            </div>
        </div>
    );
}

export default Burn;