import React, {Component} from 'react';
import {Paper, TextField, Subheader, RaisedButton} from 'material-ui';
import {green500, amber500} from 'material-ui/styles/colors';

const styles = {
  paperStyle: {
    margin: "20px 10%",
    padding: "20px"
  },
  subHeaderStyle: {
    fontSize: "20px",
    lineHeight: "26px",
    padding: 0
  },
  buttonStyle: {
    margin: 12
  },
  successStyle: {
    color: green500,
    fontSize: "18px",
    lineHeight: "22px",
    padding: 0
  },
  failureStyle: {
    color: amber500,
    fontSize: "18px",
    lineHeight: "22px",
    padding: 0
  }
};

class Mathematics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operandOne: null,
      operandTwo: null,
      operator: null,
      answer: "",
      result: null,
      hintText: "",
      success: false,
      failure: false
    };
  };

  componentWillMount() {
    this.setState({
      operandOne: Math.round(Math.random() * 999),
      operandTwo: Math.round(Math.random() * 999),
      operator: ["+", "-", "*", "/"][Math.floor(Math.random() * 4)]
    });
  };

  onInputChange = (event) => {
    const {operandOne, operator, operandTwo} = this.state;

    let successMessage = "";
    let success = false;

    if (Number(event.target.value) === Math.round(eval(operandOne + operator + operandTwo))) {
      successMessage = "Correct! Well done!";
      success = true;
    }

    this.setState({
      answer: event.target.value,
      hintText: successMessage,
      success: success,
      failure: false
    });
  };

  validate = () => {
    const {operandOne, operator, operandTwo, answer} = this.state;
    const correctAnswer = Math.round(eval(operandOne + operator + operandTwo));

    let failureMessage = "";
    let failure = false;

    if (Number(answer) !== correctAnswer) {
      failureMessage = `The correct answer is ${correctAnswer}, please try again.`;
      failure = true;
    }

    this.setState({
      result: correctAnswer,
      hintText: failureMessage,
      failure: failure
    });
  };

  newEquation = () => {
    this.setState({
      operandOne: Math.round(Math.random() * 999),
      operandTwo: Math.round(Math.random() * 999),
      operator: ["+", "-", "*", "/"][Math.floor(Math.random() * 4)],
      answer: "",
      result: null,
      hintText: "",
      success: false,
      failure: false
    });
  };

  render() {
    const {operandOne, operator, operandTwo, answer, hintText, success, failure} = this.state;

    return (
      <div className="text-center">
        <Paper style={styles.paperStyle} zDepth={4}>
          <Subheader style={styles.subHeaderStyle}>
            Can you solve the equation in your mind?
          </Subheader>

          <h2>
            <span>{operandOne} {operator} {operandTwo} = </span>
            <span style={success ? {color: green500} : (failure ? {color: amber500} : null)}>
              {answer}
            </span>
          </h2>

          {success ? <Subheader style={styles.successStyle}>{hintText}</Subheader> : null}
          {failure ? <Subheader style={styles.failureStyle}>{hintText}</Subheader> : null}

          <TextField hintText="Enter the number" floatingLabelText="Your answer" value={answer}
                     onChange={this.onInputChange} disabled={success || failure}/>

          <RaisedButton label="Give up" secondary={true} onClick={this.validate}
                        style={styles.buttonStyle} disabled={success || failure}/>
          <br/>

          <RaisedButton label="New equation" primary={true} style={styles.buttonStyle}
                        onClick={this.newEquation}/>
        </Paper>
      </div>
    )
  };
}

export default Mathematics;
