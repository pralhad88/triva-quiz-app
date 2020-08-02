import React from 'react';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import rightImage from '../assets/right.jpeg'
import wrongImage from '../assets/wrong.jpeg';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginTop: theme.spacing(1),
    },
    media: {
        height: 100,
        paddingTop: '56.25%', // 16:9
    },
}));

function InformAnswerStatus({ dialogOpen2, handelClose, answerStatus }) { // informing if answer is right or wrong.
    const image = answerStatus ? rightImage : wrongImage; // if answer is wrong or right according to that it pick-up the image
    const Message = answerStatus ? 'Congratulation it is right answer' : "Sorry it is wrong answer"; // if answer is wrong or right according to that it display the message
    const fontColor = answerStatus ? "green" : "red"; // if answer is wrong or right according to that it pick-up the color of message

    const classes = useStyles();

    return <div>
        <Dialog open={dialogOpen2}>
            <DialogContent>
                <Card className={classes.root} elevation={6}>
                    <CardContent>
                        <p style={{ color: fontColor }}>
                            {Message}
                        </p>
                    </CardContent>
                    <CardMedia
                        image={image}
                        className={classes.media}
                    />
                    <CardContent>
                        <div style={{ display: "flex", justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handelClose} // onclicking on this function it open new question.
                            >
                                Next Question
                </Button>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    </div>
}

export default InformAnswerStatus;