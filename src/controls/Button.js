import { Button as MuiButton, makeStyles} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        '& MuiButton-root': {
            testTransform: 'none'
        }
    }
}))

const Button = (props) => {
    const { children, color, variant, onClick, className, ...rest} = props;
    const classes = useStyles();

  return(
    <MuiButton
        className={classes.root + ' ' + (className || '')}
        variant={variant || 'contained'}
        color={color || 'default'}
        onClick={onClick}
        {...rest}
    >
        {children}
    </MuiButton>
   )

 }

export default Button