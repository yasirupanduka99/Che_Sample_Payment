import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateOrderForm from './components/CreateOrderForm';
import PaymentCreateForm from './components/PaymentCreateForm';
import PaymentAll from './components/PaymentAll';
import PaymentUpdateForm from './components/PaymentUpdateForm';
import ProfitCreateForm from './components/ProfitCreateForm.js';
import ProfitAll from './components/ProfitAll.js';
import ProfitUpdateForm from './components/ProfitUpdateForm.js';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
    
       

        <div className='pages'>

          <Routes>

            {/* <Route path='/menucreateform' element={<MenuCreateForm />} />
            <Route path='/' element={<MenuAllItems />} />
            <Route path='/menuupdateform/:id' element={<MenuUpdateForm />} /> */}
            <Route path='/CreateOrder' element={<CreateOrderForm />} />
            {/* <Route path='/OrdersAll' element={<OrdersAll />} />
            <Route path='/OrderUpdate/:id' element={<OrderUpdateForm />} /> */}

            {/* <Route path='/customerCreate' element={<CustomerCreateForm />} />
            <Route path='/customersall' element={<CustomerAll />} />
            <Route path='/customerUpdate/:id' element={<CustomerUpdateForm />} />
            <Route path='/customerView/:id' element={<CustomerOneManager />} />
            <Route path='/customerView2/:id' element={<CustomerOneCashier />} /> */}
             
            {/* <Route path='/createform' element={<PromotionCreateForm />}/>
            <Route path='/updateform/:id' element={<UpdatePromotionForm/>}/>
            <Route path='/allpromotion' element={<AllPromotions/>}/> */}

            <Route path='/create' element={<PaymentCreateForm/>}/>
            <Route path='/getAllPayment' element={<PaymentAll/>}/>
            <Route path='/update/:id' element={<PaymentUpdateForm/>}/>

            <Route path='/createProfit' element={<ProfitCreateForm/>}/>
            <Route path='/getAllProfit' element={<ProfitAll/>}/>
            <Route path='/updateProfit/:id' element={<ProfitUpdateForm/>}/>
        
          </Routes>

        </div>


      </BrowserRouter>

    </div>
  );
}

export default App;