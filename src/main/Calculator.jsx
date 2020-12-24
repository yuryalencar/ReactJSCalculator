import React, {Component} from 'react';
import Button from '../components/Button';
import Display from '../components/Display';
import './Calculator.css';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation:null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState};

    constructor(props){
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory(){
        this.setState({...initialState});
    }

    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true});
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;

            const values = [... this.state.values];
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
            } catch (e){
                values[0] = this.state.values[0];
            }
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current : equals ? 0 : 1,
                clearDisplay: !equals,
                values
            });
        }
    }

    addDigit(digit){
        
        if(digit === '.' && this.state.displayValue.includes('.')){
            return
        }
        
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + digit;

        this.setState({displayValue, clearDisplay: false});

        if(digit !== '.'){
            const indexArray = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [... this.state.values];
            values[indexArray] = newValue;
            this.setState({ values });
            console.log(values);
        }
    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button id='ac' label="AC" click={this.clearMemory} triple/>
                <Button id='/' label="/" click={this.setOperation} operation/>
                <Button id='7' label="7" click={this.addDigit}/>
                <Button id='8' label="8" click={this.addDigit}/>
                <Button id='9' label="9" click={this.addDigit}/>
                <Button id='*' label="*" click={this.setOperation} operation/>
                <Button id='4' label="4" click={this.addDigit}/>
                <Button id='5' label="5" click={this.addDigit}/>
                <Button id='6' label="6" click={this.addDigit}/>
                <Button id='-' label="-" click={this.setOperation} operation/>
                <Button id='1' label="1" click={this.addDigit}/>
                <Button id='2' label="2" click={this.addDigit}/>
                <Button id='3' label="3" click={this.addDigit}/>
                <Button id='+' label="+" click={this.setOperation} operation/>
                <Button id='0' label="0" click={this.addDigit} double/>
                <Button id='.' label="." click={this.addDigit}/>
                <Button id='=' label="=" click={this.setOperation} operation/>
            </div>
        );
    }
}