import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, Button, AppBar, makeStyles, Toolbar } from '@material-ui/core'
import firebaseApp from './auth/firebaseApp'
import { AuthContext } from './auth/Auth'
import logo from '../images/logo1.png'
import HideOnScroll from './HideOnScroll'
import ReloadContext from './ReloadContext'
// import ScrollTop from './ScrollTop'
// import Fab from '@material-ui/core/Fab';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles(theme => ({
  space: {
    padding: theme.spacing(1),
  },
  logo: {
    textDecoration: 'none',
    // color: '#000',
    padding: '10px',
  },
  button: {
    color: '#fff',
    borderColor: '#fff',
  },
  appbar: {
    background: '#000',
    // height: '8%',
  },
}))

const Navigation = props => {
  const { setReload } = useContext(ReloadContext)
  const classes = useStyles()
  const history = useHistory()
  const { authenticated } = useContext(AuthContext)

  const signOut = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        history.push('/login')
      })
  }

  return (
    <HideOnScroll {...props}>
    <AppBar className={classes.appbar}>
        <Grid
          container
          alignItems='center'
          justify='space-between'
          className={classes.space}
        >
          <Grid item>
            <Link to='/' className={classes.logo} onClick={() => setReload(true)}>
              <img src={logo} alt='Student Artco' />
            </Link>
          </Grid>
          <Grid item>
            <Grid container spacing={5}>
              <Grid item>
                <Button
                  component={Link}
                  to='/browse'
                  className={classes.button}
                >
                  Browse
                </Button>
              </Grid>
              {authenticated === true ? (
                <Grid item>
                  <Button
                    component={Link}
                    to='/admin/dashboard'
                    className={classes.button}
                  >
                    Dashboard
                  </Button>
                </Grid>
              ) : null}
              <Grid item>
                {authenticated === true ? (
                  <Button
                    onClick={signOut}
                    variant='outlined'
                    className={classes.button}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to='/login'
                    className={classes.button}
                  >
                    Sign In
                  </Button>
                )}
              </Grid>
              <Grid item>
                {authenticated === true ? (
                  <Button disabled />
                ) : (
                  <Button
                    component={Link}
                    to='/register'
                    variant='outlined'
                    disableElevation
                    className={classes.button}
                  >
                    Join
                  </Button>
                )}
                <Button disabled />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      
    </HideOnScroll>
  )
}

export default Navigation
