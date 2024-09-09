import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

//import CSS files
import './PaymentAll.css'

//getAll
export const ProfitAll = () => {

  const[ ProfitAll, setProfitAll ] = useState([]);
  const[ amount, setAmount ] = useState();

  useEffect(() => {
    const getAllProfits = async () => {

      try{
        await axios.get('http://localhost:8090/profit/getAllProfit')
        .then((res) => {
          setProfitAll(res.data.allProfits);
          console.log(res.data.message);
          console.log('status : '+res.data.status);
        }).catch((err) => {
          console.log("💀 :: Error on API URL! ERROR : ",err.message);
        })
      }catch(err){
        console.log("💀 :: getAllProfits function failed!"+err.message);
      }
    }

    getAllProfits();

  },[])



  return (
    <div className='tablecontainer'>

      <div className='tablecontainer'>

        <h1>Profits</h1>
        <div>
          <Link to='/createProfit'>
            <button type="button" className="btn btn-secondary btn-lg AddItemBtn">Add Profit</button>
          </Link>
        </div>
        <ToastContainer/>
                  <table className="table table-striped">
                  <thead>
                      <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Income</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Other</th>
                      <th scope="col">Profit</th>
                      <th scope="col" className='op'>Operations</th>
                      
                      </tr>
                  </thead>
                  <tbody>
                    {ProfitAll.map((profits,index) => (
                      <tr key={profits._id}>
                      <td>{index+1}</td>
                      {/* <td>{profits.date}</td> */}
                      <td>{moment(profits.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                      <td>{profits.income}</td>
                      <td>{profits.salary}</td>
                      <td>{profits.other}</td>
                      <td>{profits.profit}</td>
                      
                      <td>
                        <table className='EditDeleteBTNs'>
                          <tbody>
                            <tr>
                              <td>
                                <Link to={`/updateProfit/${profits._id}`}><button type="button" className="btn btn-success">Edit</button></Link>&nbsp;
                              </td>
                            </tr>
                          </tbody>
                          
                        </table>
                      </td>
                      
                      </tr>

                    ))}
                      
                  </tbody>
                  </table>


                </div>
      </div>
  )
};

export default ProfitAll;

