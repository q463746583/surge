import React, { useState, useEffect } from 'react'

// Credit Check Widget
function CreditCheck(props) {
    const handleFocus = (event) => event.target.select();
    return (
        <div id="creditCheck" className="creditCheck center">
        <div className="text"> Credit Limit : </div>
        <input 
            type="text" 
            value={props.maxAmount} 
            className="limitCheckInput " 
            onFocus={handleFocus}
            onChange={(e) => props.changeCreditInput(e)}/>
        </div>
    )
}   

export default CreditCheck;