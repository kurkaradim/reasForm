import React from 'react';
import EstateInfo from './EstateInfo';
import ContactInfo from './ContactInfo';
import Confirmation from './Confirmation';
import Success from './Success';
import "./test.scss";

export default class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            step: 1,
            estatetype: '',
            fullname: '',
            phone: '',
            email: '',
            region: 'notselected',
            district: 'notselected',
        }
    }
    
    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    handleChange = input => e => {
        console.log(input, e)
        this.setState({ [input]: e.target.value });
    }
    
    render(){
        const { step } = this.state;
        const { estatetype, fullname, phone, email, region, district } = this.state;
        const values = { estatetype, fullname, phone, email, region, district};

        switch(step){
            case 1:
                return (
                    <EstateInfo 
                     nextStep={this.nextStep}
                     handleChange={this.handleChange}
                     values={values}
                    />
                )
            case 2:
                return (
                    <ContactInfo 
                    prevStep={this.prevStep}
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                     values={values}
                    />
                )
            case 3:
                return (
                    <Confirmation 
                    prevStep={this.prevStep}
                    nextStep={this.nextStep}
                    values={values}
                    />
                )
            case 4:
                return (
                    <Success />
                )
            default:
                //nothing
        }
    }
}