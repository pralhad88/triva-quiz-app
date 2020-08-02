import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import axios from 'axios';
import { Dialog } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Options from "./options";
import Button from '@material-ui/core/Button';
import InformAnswerStatus from './informAnswerStatus';
import { connect } from 'react-redux';
import { updateScore } from '../store/action';

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            questionNumber: 0,
            score: 0,
            selectedOption: '',
            dialogOpen: true,
            dialogOpen2: false,
            answerStatus: false
        }
    }

    componentDidMount() {
        axios.get('https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple') // fetched question from server.
            .then((res) => {
                const newData = res.data.results;
                newData.map((question, index) => { // converted data into formated form 
                    let options = question.incorrect_answers;
                    options.push(question.correct_answer); // get all option in one arry with correct option.
                    newData[index]['options'] = options.sort(); // option are sorted for shuffling all option.
                    delete newData[index].incorrect_answers; // deleted unwanted array from data.
                });
                this.setState({
                    questions: newData, // questions are updated.
                    dialogOpen: false
                })
            }).catch(() => {
                this.props.enqueueSnackbar("Unable to fetch questions Plaese reload the page and try again", { variant: 'error' });
                this.setState({
                    dialogOpen: false
                })
            });
    }

    selectedOption = (option) => { // it update the selecte option with user selected option. 
        this.setState({
            selectedOption: option
        })
    }

    submitAnswer = () => { // this function chcek that if give answer is right or wrong if it is right the score will incressed with one.
        const { questionNumber, questions, selectedOption, score } = this.state;
        if (!selectedOption) { // if option is not seleted then it shows messgae to user select option.
            this.props.enqueueSnackbar("Please Select one correct option!", { variant: 'error' });
        } else {
            if (questions[questionNumber].correct_answer == selectedOption) {
                this.setState({
                    answerStatus: true,
                    score: score + 1
                })
            } else {
                this.setState({
                    answerStatus: false
                })
            }
            this.setState({
                dialogOpen2: true
            })
        }
    }

    dispalyNextQuestion = async () => { // once submited their selected option then this function is display next question.
        const { questionNumber, questions } = this.state;

        await this.setState({
            dialogOpen2: false,
            selectedOption: ''
        });

        if (questionNumber < questions.length) {
            this.setState({
                questionNumber: questionNumber + 1,
            })
        }
    }

    OnSubmit = async () => { // on submitting on test it will display users score card how many questions answer is given correct.
        const { history, updateScore } = this.props;
        const { score } = this.state;
        updateScore(score)
        history.push('score_card')
    }

    render() {
        const { questionNumber, questions } = this.state;
        return <div className="container">
            <Dialog open={this.state.dialogOpen}>
                <DialogContent>
                    <h1>Loading.....</h1>
                </DialogContent>
            </Dialog>
            {questions.length > questionNumber &&
                <Card className='questions' elevation={6} > 
                    <CardContent>
                        <div>
                            <Grid item xs={12}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {`Q. ${questionNumber + 1} ${questions[questionNumber].question}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <h4>Select any one.</h4>
                            </Grid>
                            <Grid item container xs={12}>
                                <Options
                                    options={questions[questionNumber].options}
                                    selectedOption={this.selectedOption}
                                />
                            </Grid>
                            <Grid item xs={12} container direction="row" justify="center" alignItems="center">
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    onClick={this.submitAnswer}
                                >
                                    Submit your answer
                                </Button>
                            </Grid>
                        </div>
                    </CardContent>
                    <CardContent>
                        {questionNumber == questions.length && questions.length && <Grid item xs={12}>
                            <center>
                                <h3>Submit your quiz and get summary of your performance.</h3>
                            </center>
                            <center>
                                <Button variant="contained" color="primary" onClick={this.OnSubmit}>
                                    Submit
                            </Button>
                            </center>
                        </Grid>
                        }
                    </CardContent>
                </Card>
            }
            {questionNumber == questions.length && questions.length && <Card elevation={6}>
                <CardContent>
                    <Grid item xs={12}>
                            <center>
                                <h3>Submit your quiz and get summary of your performance.</h3>
                            </center>
                            <center>
                                <Button variant="contained" color="primary" onClick={this.OnSubmit}>
                                    Submit
                            </Button>
                            </center>
                        </Grid>
                    </CardContent>
                </Card>
            }
            <InformAnswerStatus
                dialogOpen2={this.state.dialogOpen2}
                handelClose={this.dispalyNextQuestion}
                answerStatus={this.state.answerStatus}
            />
        </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateScore: (score) => dispatch(updateScore(score)) // dispatcheed user score for showing he's/her score card.
});

export default withSnackbar((connect(undefined, mapDispatchToProps)(Questions)));