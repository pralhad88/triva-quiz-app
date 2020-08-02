import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Dialog } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { setName } from '../store/action/index';

const useStyles = ((theme) => ({
  root: {
    maxWidth: 300,
    marginTop: theme.spacing(2),
  },
  input: {
    [`& fieldset`]: {
      borderRadius: 18,
    }
  },
}));

class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      name: "",
    }
  }


  handleClose = () => { // dialog box opend for asking user name.
    this.setState({
      dialogOpen: false
    })
  }

  handleOpen = () => { // dialog box closed once user filled their name.
    this.setState({
      dialogOpen: true
    })
  }

  handelChange = (event) => { // event handeler to update users name.
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  onSubmit = () => { // once filled user he's/her name then readdy to start quiz.

    const { name } = this.state;
    const { history } = this.props;

    if (!name) { // the feild is mandatory.
      this.props.enqueueSnackbar('fill your name it is mandatory!', { variant: 'error' });
    } else {
      this.props.setName(name)
      history.push("/quiz")
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <Card className={classes.root} elevation={6}>
          <CardActionArea>
            <CardContent className="center-content" >
              <Button variant="contained" color="primary" onClick={this.handleOpen}>Start Game</Button>
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              padding: 10
            },
          }}
        >
          <DialogTitle className="center-content" >What is your name?</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              className={classes.input}
              name='name'
              margin="normal"
              variant="outlined"
              color="primary"
              value={this.state.name}
              onChange={this.handelChange}
            />
          </DialogContent>
          <DialogActions >
            <Button variant="contained" color="primary" onClick={this.onSubmit}>Play</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setName: (name) => dispatch(setName(name)), // dispatced the name for globally to use showing users score card.
});

export default withSnackbar(withStyles(useStyles)(connect(undefined, mapDispatchToProps)(SplashScreen)));