import React, { Component } from "react";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from "@material-ui/core";

class Options extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: [] // it chcek wether chcek box is checked or not. if it is empty then check box is unmarked.
        }
    }

    handelChange = async (event) => {
        const { value, checked } = event.target;
        if (checked) {
            await this.setState({
                selectedOption: [value]
            });
            this.props.selectedOption(value); // updated selected option in question component to calculate score of user. after compaing option with correct answer.
        } else {
            await this.setState({
                selectedOption: []
            });
            this.props.selectedOption(''); // if user unmark selected answer and try to select another one then remove previous selected option. with empty string
        }
    }

    render() {  // It return own option component for each respective question options.
        const { options } = this.props;
        const { selectedOption } = this.state;
        return (
            <div>
                {options.map((option, index) =>
                    
                    <MenuItem key={index} value={option}>
                        <Checkbox
                            checked={selectedOption.length && (selectedOption[0] == option) ? true : false}
                            value={option}
                            onChange={this.handelChange}
                            color="primary"
                        />
                        <Grid item xs={12}>
                        <ListItemText primary={option} />
                        </Grid>
                    </MenuItem>
                )}
            </div>
        )
    }
}

export default Options;