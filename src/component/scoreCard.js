import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      padding: 15
    },
    media: {
      height: 140,
    },
});

function ScoreCard({name, score, history}) { // It dipaly users score card. 
    const classes = useStyles()

    function startGameAgain() { // if user wants to play game again then this function is applicable.
        history.push('/quiz')
    }
    
    function endGame() { // If user don't want to play game again then this function is applicable.
        history.push('/')
    }
    return <div className="container">
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" >Hello, {name}</Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="h3">
                        Thank you so much {name}, you gave {score} correct answers out of 5.
                        if you wnat to play the game again then just click on below button or click on quit button to end the game.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" color="primary" onClick={startGameAgain}>
                    Play Again
                </Button>
                <Button variant="contained" color="primary" onClick={endGame}>
                    Quit Game
                </Button>
            </CardActions>
        </Card>
    </div>   
}

const mapStateToProps = (state) => ({ // getting score and user name from redux store.
    name: state.state.name, 
    score: state.state.score
  });
export default connect(mapStateToProps, undefined)(ScoreCard);