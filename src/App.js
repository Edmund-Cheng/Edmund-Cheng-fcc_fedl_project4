import React from 'react';
import './App.css';

const NumPad = ({numKey, numVal, handleClick}) => {
    return (
        <button className="num-pad" id={numKey} onClick={handleClick(numVal)}>
            {numVal}
        </button>
    );
};
class JsCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPads: [
                {
                    "key": "seven",
                    "value": "7"                    
                },
                {
                    "key": "eight",
                    "value": "8"                    
                },
                {
                    "key": "nine",
                    "value": "9"                    
                },
                {
                    "key": "four",
                    "value": "4"                    
                },
                {
                    "key": "five",
                    "value": "5"                    
                },
                {
                    "key": "six",
                    "value": "6"                    
                },
                {
                    "key": "one",
                    "value": "1"                    
                },
                {
                    "key": "two",
                    "value": "2"                    
                },
                {
                    "key": "three",
                    "value": "3"                    
                }             
            ],
            numPads2: [
                {
                    "key": "zero",
                    "value": "0"                    
                },
                {
                    "key": "decimal",
                    "value": "."                    
                }
            ],
            operPads: [
                {
                    "key": "divide",
                    "value": "/"                    
                },
                {
                    "key": "multiply",
                    "value": "*"                    
                },
                {
                    "key": "subtract",
                    "value": "-"                    
                },
                {
                    "key": "add",
                    "value": "+"                    
                },
                {
                    "key": "equals",
                    "value": "="                    
                }            
            ],

            mathExpression: '',
            currentValue: '0',
            calFlag: false
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleButtonClick(value) {
        return () => {
            let tempExpression = this.state.mathExpression;
            let tempValue = this.state.currentValue;
            /* handle one to nine */
            if (value.match("[1-9]")) {
                let expression = '';
                if (this.state.calFlag) {
                    expression = value;
                    tempValue = value;
                    this.setState({
                        currentValue: tempValue,
                        mathExpression: expression,
                        calFlag: false
                    })
                } else {
                    expression = tempExpression.concat(value);
                    if (tempValue.match(/[+\-*/]$/)) {
                        this.setState({
                            currentValue: value,
                            mathExpression: expression
                        });
                        console.log("1a - " + value);
                    } else {
                        if (tempValue == '0') {
                            tempValue = value;
                        } else {
                            tempValue = tempValue + value;
                        }
                        this.setState({
                            currentValue: tempValue,
                            mathExpression: expression
                        });
                        console.log("1b - " + value);
                    }
                }
            };
            /* handle zero */
            if (value.match("[0]")) {
                let expression = '';
                if (this.state.calFlag) {
                    expression = '';
                    tempValue = value;
                    this.setState({
                        currentValue: tempValue,
                        mathExpression: expression,
                        calFlag: false
                    })
                } else {
                    expression = tempExpression.concat(value);
                    if (tempExpression.match(/[0-9.]$/)) {
                        expression = tempExpression.concat(value);
                        this.setState({
                            currentValue: tempValue + value,
                            mathExpression: expression
                        });
                        console.log("2 - " + value);                
                    }
                }
            };
            /* handle decimal point */
            if (value.match("[\.]")) {
                let expression = '';
                if (this.state.calFlag) {
                    expression = value;
                    tempValue = value;
                    this.setState({
                        currentValue: tempValue,
                        mathExpression: expression,
                        calFlag: false
                    })
                } else {
                    if (!tempExpression.match(/\.$/)) {
                        expression = tempExpression.concat(value);
                        const test = expression.match("\.[0-9]+\.")
                        if (!expression.match(/\.[0-9]+\./)) { 
                            this.setState({
                                currentValue: tempValue + value,
                                mathExpression: expression
                            });
                            console.log("3 - " + value);
                        }
                    }
                }
            };
            /* handle add multiply divide */
            if (value.match(/[+*/]/g)) {
                let expression = '';
                if (this.state.calFlag) {
                    expression = this.state.currentValue + value;
                    tempValue = value;
                    this.setState({
                        currentValue: tempValue,
                        mathExpression: expression,
                        calFlag: false
                    })
                } else {
                    if (tempExpression != '') {
                        if (!tempExpression.match(/[+\-*/]$/)) {
                            expression = tempExpression + value; 
                            this.setState({
                                currentValue: value,
                                mathExpression: expression
                            });
                            console.log("4a - " + value );
                        } else {
                            expression = tempExpression.replace(/[+\-*/]+$/,value);
                            this.setState({
                                currentValue: value,
                                mathExpression: expression
                            });
                            console.log("4b - " + value );
                        }
                    }    
                }
            };
            /* handle subtract */
            if (value.match(/[-]/g)) {
                let expression = '';
                if (this.state.calFlag) {
                    expression = this.state.currentValue + value;
                    tempValue = value;
                    this.setState({
                        currentValue: tempValue,
                        mathExpression: expression,
                        calFlag: false
                    })
                } else {
                    if (!tempExpression.match(/-$/)) {
                        expression = tempExpression + value; 
                        this.setState({
                            currentValue: value,
                            mathExpression: expression
                        });
                        console.log("4 - " + value );
                    }
                }
            };
            /* handle equals */            
            if (value.match("[=]")) {
                if (tempExpression.match(/[+\-*/]$/)) {
                    tempExpression = tempExpression.replace(/[+\-*/]+$/,'');
                }
                const result = eval(tempExpression).toString();
                const expression = tempExpression + value + result;
                this.setState({
                    currentValue: result,
                    mathExpression: expression,
                    calFlag: true
                });
                console.log("5 - " + value);
            };
            /* handle clear */
            if (value === "AC") {
                this.setState({
                    currentValue: '0',
                    mathExpression: ''
                });
                console.log("6 - " + value);
            }
            
        };
    }
    render() {
        return (
            <div id="Js-Calculator">
                <div className="app_title">
                    <h1>Javascript Calculator</h1>
                </div>
                <div className="display-container">
                    <div id="display-result">
                        <div id="display-exp" className="final-result">
                            {this.state.mathExpression}
                        </div>
                        <div id="display" className="current-value">
                            {this.state.currentValue}
                        </div>
                    </div>
                    <div id="display-col">
                        <div id="display-col-1">
                            <div id="display-row-1">
                                <NumPad
                                    numKey="clear"
                                    numVal="AC"
                                    handleClick={this.handleButtonClick}
                                />
                            </div>
                            <div id="display-row-2">
                                {this.state.numPads.map(item => (
                                    <NumPad
                                        numKey={item.key}
                                        numVal={item.value}
                                        handleClick={this.handleButtonClick}
                                    /> 
                                ))}        
                            </div>
                            <div id="display-row-3">
                                {this.state.numPads2.map(item => (
                                    <NumPad
                                        numKey={item.key}
                                        numVal={item.value}
                                        handleClick={this.handleButtonClick}
                                    /> 
                                ))}
                            </div>
                        </div>
                        <div id="display-col-2">
                            {this.state.operPads.map(item => (
                                <NumPad
                                    numKey={item.key}
                                    numVal={item.value}
                                    handleClick={this.handleButtonClick}
                                /> 
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JsCalculator;
