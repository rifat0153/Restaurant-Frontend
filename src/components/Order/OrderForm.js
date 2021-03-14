import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Form from '../../layouts/Form'
import { Button, Select, Input } from '../../controls';

const pMethods = [
  { id: 'none', title: 'Select' },
  { id: 'Cash', title: 'Cash' },
  { id: 'Card', title: 'Card' },
]




const OrderForm = (props) => {

  const { values, errors, handleInputChange } = props;


  return (
    <Form >
      <Grid container>
        <Grid item xs={6}>
          <Input
            disabled
            label="Order Number"
            name="Order Number"
            value={values.orderNumber}
          />
          <Select
            label="Customer"
            name="customerId"
            value={values.customerId}
            onChange={handleInputChange}
            options={[
              { id: 0, title: "Select" },
              { id: 1, title: "Customer 1" },
              { id: 2, title: "Customer 2" },
              { id: 3, title: "Customer 3" },
              { id: 4, title: "Customer 4" },
            ]}
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
          />
        </Grid>
        {JSON.stringify(values, 2, null)}
      </Grid>
    </Form>
  )

}

export default OrderForm