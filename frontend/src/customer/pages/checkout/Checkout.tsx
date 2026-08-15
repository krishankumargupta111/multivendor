import { Button, Modal, Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import AddressCard from "./AddressCard";
import { Add } from "@mui/icons-material";
import AddressForm from "./AddressForm";
import { useEffect, useState } from "react";
import PricingCard from "../cart/PricingCard";
import { createOrder, fetchAddresses } from "../../../redux/features/customer/OrderSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useNavigate } from "react-router";
const style = {

  position: "absolute",
  top: "50%",  
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList=[{name:'RAZORPAY'},{name:'STRIPE'}]

function Checkout() {
  const navigate=useNavigate()
  const dispatch=useAppDispatch()
  const[paymentGateway,setPaymentGateway]=useState(paymentGatewayList[0].name)
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedAddress, setSelectedAddress] = useState(0);

  const handleChangePaymentGateway=(e:any)=>{
    setPaymentGateway(e.target.value)
  }
  const handleChange = (e: any) => setSelectedAddress(e.target.value);
  
useEffect(() => {
    dispatch(fetchAddresses(localStorage.getItem("jwt")));
}, []);



const addresses = useAppSelector(
  (store) => store.order.addresses
);



const handleCheckout = async () => {
  try {
    const result = await dispatch(
      createOrder({
        jwt: localStorage.getItem("jwt"),
        addressId: selectedAddress,
        paymentGateway,
      })
    ).unwrap();
const paymentLinkId = result?.paymentLinkId;


    const fakePaymentId = `pay_fake_${Math.floor(100000 + Math.random() * 900000)}`;

    if (!paymentLinkId) {
      console.error("Error: Backend did not return a valid paymentLinkId!");
      return;
    }

    navigate(`/seller/payment?payment_id=${fakePaymentId}&paymentLinkId=${paymentLinkId}`)
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
      <div
        className="space-y-5 lg:space-y-0 lg:grid grid-cols-3
        lg:gap-9 "
      >
        <div className="col-span-2 space-y-5">
          <div className="flex justify-between items-center">
            <span>Select delivery address</span>
            <Button onClick={handleOpen} variant="outlined">
              Add new Adddress
            </Button>
          </div>
          <div className="text-xs font-medium space-y-5">
            <p>Saved Addreses</p>
            <div className="space-y-3">
             {addresses.map((item) => (
  <AddressCard
    key={item._id}
    item={item}
value={item._id}
    selectedValue={selectedAddress}
    handleChange={handleChange}
  />
))}
            </div>
          </div>
          <div className="py-4 px-5 rounded-md border border-gray-300">
            <Button onClick={handleOpen} startIcon={<Add />}>
              Add new Address
            </Button>
          </div>
        </div>
        <div className="col-span-1 text-sm space-y-3">
          <section className="space-y-3 border border-gray-300 p-5 rounded-md">
            <h1 className="text-teal-600 font-medium pb-2
            text-center">Choose Payment Gateway</h1>
             <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" 
             name="row-radio-buttons-group"
             value={paymentGateway}
             onChange={handleChangePaymentGateway}>
      {paymentGatewayList.map((item)=> <FormControlLabel value={item.name}
       control={<Radio />} label={item.name} />) }
         </RadioGroup>
          </section>
          <section className="border border-gray-300 rounded-md">
            <PricingCard/>
            <div className="p-5">
              <Button onClick={handleCheckout}
               variant="contained" fullWidth sx={{py:"11px"}}>
                CheckOut</Button>
            </div>
          </section>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} 
            onClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}

export default Checkout;
