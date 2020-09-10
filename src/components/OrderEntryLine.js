import React, { useState, useEffect } from 'react'

// Each Entry, get the info from Order Entry File
function OrderEntryLine(props) {
    // Each order info
    const order = props.order
    const handleFocus = (event) => event.target.select();
    return (
        <div className="normalLine center">
            <div className="btnFont removeBtn center" onClick={() => props.removeEntry(props.id)}> x </div>
            <div className="idPoint center"> {props.id + 1}</div>
            <input 
                type="text" 
                value={order[0]} 
                className="productNameInput inputBox" 
                onFocus={handleFocus}
                onChange={(e) => props.changeInput(e, props.id, 'productName')}/>
            <input 
                type="text" 
                value={order[1]} 
                className="unitPrice inputBox" 
                onFocus={handleFocus}
                onChange={(e) => props.changeInput(e, props.id, 'unitPrice')}/>
            <input 
                type="text" 
                value={order[2]} 
                className="quantity inputBox" 
                onFocus={handleFocus}
                onChange={(e) => props.changeInput(e, props.id, 'quantity')}/>
            <div className="totalPrice center"> ${(order[1] * order[2]).toFixed(2)}</div>
        </div>
    )
}


export default OrderEntryLine;