import React, { useState, useEffect } from 'react'
import OrderEntryLine from './OrderEntryLine'
import CreditCheck from './CreditCheck'

function OrderEntry() {

    // orders save all orders's information, 
    // ['', 0, 1]: [productName, UnitPrice, Quantity]
    const [orders, setOrders] = useState([['', 0, 1]])
    // which coupon used, init is none
    const [couponSelect, setCouponSelect] = useState(0)
    // totalPrice for all products 
    const [totalPrice, setTotalPrice] = useState(0)
    // credit Limit 
    const [maxAmount, setMaxAmout] = useState(5000)

    // when init the app, default credit limit is $5000
    // save the limit across session by localstorage
    useEffect(() => {
        if (!localStorage.getItem('maxAmount')) {
            setMaxAmout(5000)
        }
        else {
            setMaxAmout(localStorage.getItem('maxAmount'))
        }
    }, []);

    // when total price large then credit limit, blink
    useEffect(() => {
        localStorage.setItem('maxAmount', maxAmount);
        if (totalPrice > maxAmount) {
            document.getElementById("pay").style.backgroundColor = "grey";
            document.getElementById("pay").style.backgroundImage = "none";
            document.getElementById('creditCheck').style.animation = "blinkingBackground 1.5s infinite";
            document.getElementById('orderEntryContainer').style.animation = "blinkingBorderColor 1.5s infinite";
            document.getElementById('paymentBar').style.animation = "blinkingBorderColor 1.5s infinite";
        }
        else {
            document.getElementById("pay").style.backgroundColor = "#045de9";
            document.getElementById("pay").style.backgroundImage = "linear-gradient(315deg, #045de9 0%, #09c6f9 74%)";
            document.getElementById('creditCheck').style.animation = "none";
            document.getElementById('orderEntryContainer').style.animation = "none";
            document.getElementById('paymentBar').style.animation = "none";
        }
    }, [totalPrice, maxAmount])

    // Check product name, can not be empty or duplicated
    const hasDuplicateProduct = () => {
        let nameSet = new Set()
        for (const order of orders) {
            if (order[0] === "") {
                alert('Product Name can not be empty')
                return true
            }
            if (nameSet.has(order[0])) {
                alert(`Product: ${order[0]} is existing, can't have same name product`)
                return true
            }
            else {
                nameSet.add(order[0]) 
            }
        }
        return false
        
    }

    // Remove an entry 
    const removeEntry = (id) => {
        const orders_copy = [...orders]
        orders_copy.splice(id,1)
        setOrders(orders_copy)
    }

    // Add new Entry, check product name duplication first 
    const addNewEntry = () => {
        if (!hasDuplicateProduct()) {
            setOrders([...orders, ['',0,1]])
        }
        
    }

    // Input update
    const changeInput = (e, id, fieldName) => {
        const orders_copy = [...orders]
        const value = e.target.value
        if (fieldName === 'productName') {
            orders_copy[id][0] = value
        }
        else {
            if (!isNaN(value) && value.split(".").length < 3) {
                
                if (fieldName === 'unitPrice') {
                    let orginalPrice = orders_copy[id][1] * orders_copy[id][2]
                    orders_copy[id][1] = e.target.value
                    let currentPrice = orders_copy[id][1] * orders_copy[id][2]
                    setTotalPrice(totalPrice + currentPrice - orginalPrice)

                }
                else {
                    if (value.split(".").length === 1) {
                    let orginalPrice = orders_copy[id][1] * orders_copy[id][2]
                    orders_copy[id][2] = e.target.value
                    let currentPrice = orders_copy[id][1] * orders_copy[id][2]
                    setTotalPrice(totalPrice + currentPrice - orginalPrice)
                }
                }
            }
        }
        setOrders(orders_copy)
    }

    // Credit Limit Update
    const changeCreditInput = (e) => {
        const value = e.target.value
        if (!isNaN(value) && value.split(".").length < 3) {
            setMaxAmout(e.target.value)
        }
    }

    // Coupon selection 
    const selectCoupon = (num) => {
        setCouponSelect(num)
    }


    return (
        <div className='orderEntryBackground'>
            <h1>Surge - Sales Terminal</h1>
            <CreditCheck maxAmount={maxAmount} changeCreditInput={changeCreditInput}/>
            <div id="orderEntryContainer" className='orderEntryContainer'>
                <div className='instructionBar center'>
                    <h3 className='productName center lineBorder'> Product Name</h3>
                    <h3 className='unitPrice center lineBorder'> Unit Price</h3>
                    <h3 className='quantity center lineBorder'>Quantity</h3>
                    <h3 className='totalPrice center lineBorder'>Total Price</h3>
                </div>

                <div className="paddingTop"> </div>

                {orders.map((order, index) => {
                    return (
                    <OrderEntryLine id={index} key={index} order={order} 
                    removeEntry={removeEntry}
                    changeInput={changeInput}/> )
                })}

                <div className="normalLine center">
                    <div className="addBtn center btnFont" onClick={addNewEntry}> Add a new product </div>
                </div>
            </div>


            <div id="paymentBar" className='paymentBar'>
                    <div id="pay" className='payBtn center'>
                        <h1>Pay</h1>
                    </div>
                    <div className='couponSelect center'>
                        <div className="btnFont"> Coupon Select</div>
                        <div className="couponCollection center">
                        {couponSelect !== 0
                        ? <div className="coupon center" onClick={() => selectCoupon(0)}> None</div> 
                        : <div className="coupon center selectedCoupon"> None</div> }

                        {couponSelect !== 1
                        ? <div className="coupon center " onClick={() => selectCoupon(1)}> <div>$5</div> <div>OFF</div> </div> 
                        : <div className="coupon center selectedCoupon"> <div>$5</div> <div>OFF</div> </div>}

                        {couponSelect !== 2
                        ? <div className="coupon center" onClick={() => selectCoupon(2)}> <div>10%</div> <div>OFF</div> </div> 
                        : <div className="coupon center selectedCoupon"> <div>10%</div> <div>OFF</div> </div>} 
                    </div>
                    </div>
                    <div className="center col currentTotal">
                            <div className="btnFont"> Current Total : </div>
                            {couponSelect === 0 && <div className="couponCollection center priceFont">${totalPrice}</div>}
                            {couponSelect === 1 && <div className="couponCollection center priceFont">${totalPrice - 5}</div>}
                            {couponSelect === 2 && <div className="couponCollection center priceFont">${totalPrice * 0.9}</div>}
                    </div>
                </div>
        </div>
        
    )
}

export default OrderEntry;