import { Grid, InputAdornment, makeStyles, Button as MuiButton, ButtonGroup } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Form from '../../layouts/Form'
import { Button, Select, Input } from '../../controls';
import { Replay } from '@material-ui/icons';
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReorderIcon from '@material-ui/icons/Reorder';
import { createAPIEndpoint, ENDPOINTS } from '../../api';

const pMethods = [
  { id: 'none', title: 'Select' },
  { id: 'Cash', title: 'Cash' },
  { id: 'Card', title: 'Card' },
]


const useStyles = makeStyles(theme => ({
  adornmentText: {
    '& .MuiTypography-root': {
      color: '#f3b33d',
      fontWeight: 'bolder',
      fontSize: '1.5em'
    }
  },
  submitButtonGroup: {
    backgroundColor: '#f3b33d',
    margin: theme.spacing(1),
    color: '#000',
    '& .MuiButton-label': {
      textTransform: 'none'
    },
    '& hover': {
      backgroundColor: '#f3b33d',
    }
  }
}))


const OrderForm = (props) => {

  const { values, errors, handleInputChange } = props;
  const classes = useStyles();

  const [customerList, setCustomerList] = useState([]);


  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
    .then( res => {
      let customerList = res.data.map( item => ({
        id: item._id,
        title: item.customerName
      }));
      customerList = [{id: '0', title: 'select'}].concat(customerList);
      setCustomerList(customerList);
    } )
    .catch(err => console.log(err));
  }, [])


  return (
    <Form >
      <Grid container>
        <Grid item xs={6}>
          <Input
            disabled
            label="Order Number"
            name="Order Number"
            value={values.orderNumber}
            InputProps={{
              startAdornment: <InputAdornment
                position="start"
                className={classes.adornmentText}
              >#
               </InputAdornment>

            }}
          />
          <Select
            label="Customer"
            name="customerId"
            value={values.customerId}
            onChange={handleInputChange}
            options={customerList}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Payment Method"
            name="pMethod"
            value={values.pMethod}
            onChange={handleInputChange}
            options={pMethods}
          /> <Input
            disabled
            label="Grand Total"
            name="gTotal"
            values
            value={values.gTotal}
            InputProps={{
              startAdornment: <InputAdornment
                position="start"
                className={classes.adornmentText}
              >
                $
                </InputAdornment>

            }}
          />

          <ButtonGroup className={classes.submitButtonGroup}>
            <MuiButton size="large" type="Submit" endIcon={<RestaurantMenuIcon />}>
              Submit
        </MuiButton>
            <MuiButton size="large" startIcon={<ReplayIcon />} >

            </MuiButton>
          </ButtonGroup>
          <Button
            size="large"
            startIcon={<ReorderIcon />}
          >
            Orders
          </Button>
        </Grid>


        {/* {JSON.stringify(values, 2, null)} */}
      </Grid>
    </Form>
  )

}

export default OrderForm