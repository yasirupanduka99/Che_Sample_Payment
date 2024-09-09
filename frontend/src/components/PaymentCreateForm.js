import React, { useEffect,useState } from "react";
import axios from "axios";
import './Payment.css';

const PaymentCreateForm = () => {

    const [orderID, setorderID] = useState('');
    const [promotionID, setpromotionID] = useState('');
    const [amount, setamount] = useState('');
    const [date, setdate] = useState('');

    const [total, setTotal] = useState(0);
    const [paymentAmount, setPaymentAmount] = useState(0); 
    const [payableAmount, setPayableAmount] = useState(0);
    const[lastDocument,setLastDocument] = useState('');
    const [selectedPromotion, setSelectedPromotion] = useState("");

    useEffect(() => {
        const getLast = async () => {
            try {
                const res = await axios.get("http://localhost:8090/order/last");
                setLastDocument(res.data.lastDocument);
                setorderID(res.data.lastDocument._id);

                const data = res.data.lastDocument;
                let totalPrice = 0;
                // Iterate through each order and add its price to totalPrice
                // data.forEach(order => {
                //     totalPrice += order.OrderPrice;
                // });

                totalPrice = data.OrderPrice;

                setTotal(totalPrice);
                setPayableAmount(totalPrice);

                console.log("Total price : ",total);
            } catch (err) {
                console.log("Error fetching last document:", err.message);
            }
        }
        getLast();
    }, []);


    const handleChange = (event) => {
        const { value } = event.target;
        setPaymentAmount(value);
    };


    const calculateChange = () => {
        let change;
        if(paymentAmount === 0){
            change = 0;
        }else{
            change = paymentAmount - payableAmount;
        }
       
        return change;
    };

    const handlePromotionChange = (event) => {
        setSelectedPromotion(event.target.value);
        
        let newTotalPrice = total; // Sample total price
        
        switch (event.target.value) {
        case "No discount":
            newTotalPrice -= 0;  
            break;
        case "Morning Brew Discount":
            newTotalPrice -= 10;
            break;
        case "Happy Hour Specials":
            newTotalPrice -= 15;
            break;
        case "Daily Roast Deals":
            newTotalPrice -= 20;
            break;
        case "Loyalty Bean Bonus":
            newTotalPrice -= 25;
            break;
        default:
            break;
        }

        console.log(newTotalPrice);
        setPayableAmount(newTotalPrice);
    };

    const sendData = async(e) => {
        e.preventDefault();

        try{

            const now = new Date();

            let newPaymentData = {
                orderID: orderID,
                promotionID: promotionID,
                amount: payableAmount,
                date: now,
            }

            console.log("OrderID : ",orderID)
            console.log("promotionID : ",promotionID)
            console.log("amount : ",amount)
            console.log("date : ",date)

            axios.post('http://localhost:8090/payment/create',newPaymentData)
            .then((res) => {
                alert(res.data.message);
                console.log(res.data.status);
                console.log(res.data.message);
                // window.location.href=`#`;
            })
            .catch((err) => {
                console.log("💀 :: Error on API URL or newPaymentData object : "+err.message);
            })
                                                                      
        }catch(err){
            console.log("💀 :: sendData function failed! ERROR : "+err.message);
        }
    }

  return (
    <div className="PaymentContainer">

        <div className="PaymentWidthBlanceDiv">

            <div className="paymentTableContainer">
                <div className="orderIdDiv">
                    <p>OrderID: {lastDocument._id}</p>
                </div>

                <div className="paymentTableWrapper">
                    <table class="paymentTable">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Order Items</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{lastDocument.OrderName}</td>
                                    <td>{lastDocument.OrderQuantity}</td>
                                    <td>{lastDocument.OrderPrice}</td>
                                </tr>
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="paymentSideView">
                <div className="calculationPhase">
                    <div className="paymentTotalPhase">
                        <p>Total: <span>{total} LKR</span></p>
                    </div>
                    <div className="paymentPropotionPhase">
                        <p>Add Promotion: </p>
                        <select name="promotion" id="promotion" value={selectedPromotion} onChange={handlePromotionChange}>
                            <option value="No discount">No discount</option>
                            <option value="Morning Brew Discount">Morning Brew Discount</option>
                            <option value="Happy Hour Specials">Happy Hour Specials</option>
                            <option value="Daily Roast Deals">Daily Roast Deals</option>
                            <option value="Loyalty Bean Bonus">Loyalty Bean Bonus</option>
                        </select>
                    </div>
                    <div className="paymentPayableAmountPhase">
                        <p>Payable Amount: <h3>{payableAmount} LKR</h3></p>
                    </div>
                </div>
                <div className="balancePhase">
                    <div className="paymentAmountDiv">
                        <label for="paymentAmount">Payment Amount(LKR):</label>
                        <input type="text" id="paymentAmount" name="paymentAmount" value={paymentAmount} onChange={handleChange} placeholder="Enter amount tendered" />
                    </div>
                    <div className="changeDiv">
                        <p>Change: <h3>{calculateChange()} LKR</h3></p>
                    </div>
                    <div className="PaymentButtonDiv">
                        <button class="custom-button" onClick={sendData}>Done</button>
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
};

export default PaymentCreateForm;
