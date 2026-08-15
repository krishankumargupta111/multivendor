import { Card, Divider } from '@mui/material'

import TransactionTable from '../transaction/TransactionTable'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { sellerPayment } from '../../redux/features/seller/SellerPayment';
import { fetchTransactionBySeller } from '../../redux/features/seller/TransactionSlice';



function Payment() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  console.log(searchParams)




  const paymentId = searchParams.get("payment_id") || searchParams.get("razorpay_payment_id");
const paymentLinkId = searchParams.get("paymentLinkId");

useEffect(() => {

    if (paymentId) {
      dispatch(sellerPayment({paymentId,paymentLinkId}));
    }
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchTransactionBySeller(jwt));
    }
  }, [dispatch, paymentId]);


const {transaction}=useAppSelector((store)=>store.transaction)

const totalEarning = transaction.reduce((total, item) => {
  return total + (item.order?.totalSellingPrice || 0);
}, 0);

const lastPayment =
  transaction[transaction.length - 1]?.order?.totalSellingPrice || 0;




  return (
    <div className=''>
      <div className='space-y-5'>
      <Card className='p-5 rounded-md space-y-4'>
        <h1>Total Earning</h1>
        <h1 className='font-bold text-xl pb-1 '> ₹{totalEarning}</h1>
        <Divider/>
        <p className='py-2'>Last Payment: <strong>₹{lastPayment}</strong></p>

      </Card>
      <TransactionTable/>
      </div>
    </div>
  )
}

export default Payment
