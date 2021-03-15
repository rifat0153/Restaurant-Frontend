import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core';
import React from 'react'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

const OrderFoodItem = (props) => {

    const { orderedFoodItems, removeFoodItem } = props;

  return(
    <List>
        {
            orderedFoodItems.map((item, idx) => (
                <Paper key={idx}>
                    <ListItem>
                        <ListItemText 
                            primary={item.foodItemName}
                            primaryTypographyProps={{
                                component: 'h1',
                                style: {
                                    fontWeight: '500',
                                    fontSize: '1.2em'
                                }
                            }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                disableRipple
                                onClick={(e) => removeFoodItem(idx, item.orderDetailsId)}
                            >
                                <DeleteForeverTwoToneIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Paper>
            ))
        }
    </List>
   )

 }

export default OrderFoodItem