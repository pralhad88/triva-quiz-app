import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Header() { //header for application Name
  return <div className="appbarwrapper">
    <AppBar position="fixed" color='primary' >
      <Toolbar>
        <Grid
          justify="space-between"
          container
        >
          <Grid item>
            <Typography className='title' variant="h4">
              Triva Quiz
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </div>
}

export default Header;