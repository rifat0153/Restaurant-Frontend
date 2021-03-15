import { Grid, IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../../api'
import SearchIcon from '@material-ui/icons/Search';
import PlusOneTwoToneIcon from '@material-ui/icons/PlusOneTwoTone';
import ArrowForwardIosTwoToneIcon from '@material-ui/icons/ArrowForwardIosTwoTone';

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none',
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent',
        }
    }
}))



const SearchFoodItem = (props) => {

    const { addFoodItem, orderedFoodItems } = props;

    const [foodItems, setFoodItems] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [searchList, setSearchList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err));

    }, [])

    useEffect(() => {
        let x = [...foodItems];
        x = x.filter( y => {
            return  y.foodItemName.toLowerCase().includes(searchKey.toLowerCase())
            && orderedFoodItems.every(item => item.foodItemId != y._id)
            
        });
        setSearchList(x);
    }, [searchKey, orderedFoodItems])


 
    return (
      <>
       <Paper className={classes.searchPaper}>
            <InputBase
                className={classes.searchInput}
                placeholder='Search for fooditems'
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <IconButton>
                <SearchIcon />
            </IconButton>
        </Paper>
        <List className={classes.listRoot}>
            {
                searchList.map( (item, idx) => (
                    <ListItem
                        key={idx}
                    >
                        <ListItemText
                         primary={item.foodItemName} 
                         secondary={'$'+item.price}
                         />
                         <ListItemSecondaryAction>
                             <IconButton onClick={e => {addFoodItem(item); console.log(item);console.log(orderedFoodItems) }} >
                                <PlusOneTwoToneIcon />
                                <ArrowForwardIosTwoToneIcon />
                             </IconButton>
                         </ListItemSecondaryAction>
                    </ListItem>
                ))
            }

        </List>
            <Grid>
            {'FoodItems'+JSON.stringify(foodItems)}
            </Grid>
            <Grid>
            {'SearchList'+JSON.stringify(searchList)}
            </Grid>
            <Grid>
            {'Ordered'+JSON.stringify(orderedFoodItems)}
            </Grid>
        
  
      </>
       
    )

}

export default SearchFoodItem