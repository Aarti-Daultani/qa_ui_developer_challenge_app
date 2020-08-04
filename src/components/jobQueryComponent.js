import {makeStyles} from "@material-ui/styles";
import PropTypes from "prop-types";
import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        margin: 8
    },
    formContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    descriptionParameterInput: {
        margin: 8,
        flex: 1,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

JobQueryComponent.prototype = {
    onQuery: PropTypes.func.isRequired
};

export default function JobQueryComponent(props) {
    const classes = useStyles();
    const {onQuery} = props;
    const [isFullTime, setFullTime] = React.useState(true)
    const [description, setDescription] = React.useState("")
    const [descriptionEnteredOnce, setDescriptionEnteredOnce] = React.useState(false)
    const [location, setLocation] = React.useState("")
    const [locationEnteredOnce, setLocationEnteredOnce] = React.useState(false)
    // has error or empty returns true else false
    function validateDescription() {
        if (description.length < 3) {
            return "Description must be greater than 3 characters"
        }
        return " "
    }

    function validateLocation() {
        if (location.length < 3) {
            return "Location must be greater than 3 characters"
        }
        return " "
    }

    return (
        <Card className={classes.root} variant="outlined" color={"red"}>
            <CardContent>
                <form className={classes.formContent} noValidate autoComplete="off">
                    <TextField
                        value={description}
                        error={descriptionEnteredOnce && Boolean(validateDescription().trim())}
                        helperText={!descriptionEnteredOnce ? " " : validateDescription()}
                        className={classes.descriptionParameterInput} id="outlined-basic" label="Description"
                        onChange={(event) => {
                            setDescription(event.target.value)
                            setDescriptionEnteredOnce(true)
                        }}
                        variant="outlined"/>
                    <TextField
                        value={location}
                        error={locationEnteredOnce && Boolean(validateLocation().trim())}
                        helperText={!locationEnteredOnce ? " " : validateLocation()}
                        className={classes.descriptionParameterInput} id="outlined-basic" label="Location"
                        onChange={(event) => {
                            setLocation(event.target.value)
                            setLocationEnteredOnce(true)
                        }}
                        variant="outlined"/>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isFullTime}
                                onChange={() => setFullTime(!isFullTime)}
                                name="antoine"
                                color={"primary"}/>
                        }
                        label="Full-time"
                    />
                    <Button
                        disabled={Boolean(validateDescription().trim()) && Boolean(validateLocation().trim())}
                        variant="contained"
                        color="primary"
                        onClick={() => onQuery({
                            isFullTime: isFullTime,
                            location: location,
                            description: description,
                        })}>
                        Search
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}