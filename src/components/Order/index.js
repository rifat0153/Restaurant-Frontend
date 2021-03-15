import { Grid } from '@material-ui/core';
import React from 'react'
import useForm from '../../hooks/useForm';
import OrderFoodItem from './OrderFoodItem';
import OrderForm from './OrderForm'
import SearchFoodItem from './SearchFoodItem';

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

//generating orderMaster model object
const getFreshModelObject = () => ({
  _id: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: 'none',
  gTotal: 0,
  deletedOrderItemIds: '',
  orderDetails: []
})


const Order = (props) => {

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls } = useForm(getFreshModelObject);

    const addFoodItem = foodItem => {
      let x = {
        orderMasterId: values._id,
        orderDetailId: 0,
        foodItemId: foodItem._id,
        quantity: 1,
        price: foodItem.price,
        foodItemName: foodItem.foodItemName
      }
      setValues({
        ...values,
        orderDetails: [...values.orderDetails, x]
      })
    }

    const removeFoodItem = (index, id) => {
      let x = {...values};

      x.orderDetails = x.orderDetails.filter((item, i) => i != index);

      setValues({...x});

    }


  return (
    <Grid container>
      <Grid item xs={12}>
      <OrderForm
        {...{ values, errors, handleInputChange }}
      />
      </Grid>
      <Grid item xs={6}>
        <SearchFoodItem 
          {...{addFoodItem, 
            orderedFoodItems: values.orderDetails}}
        />
      </Grid>
      <Grid item xs={6}>
        <OrderFoodItem 
          {...{orderedFoodItems: values.orderDetails, removeFoodItem}}
        />
      </Grid>

    </Grid>
  )

}

export default Order;