import React from 'react'

class Confirmation extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          errorMessage: ''
      }
  }


    Continue = e => {
    e.preventDefault();
    const { estatetype, fullname, phone, email, region, district } = this.props.values
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            estatetype,
            fullname,
            phone,
            email,
            region,
            district
        })
    };
    fetch('/api/lead', requestOptions)
        .then(response => response.json())
        .then(data => this.props.nextStep()).catch(err => {this.setState({errorMessage: err})})

  }

  Previous = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  render(){
    const { estatetype, fullname, phone, email, region, district } = this.props.values
    return (
        <div className='overview'>
          <ul>
              <li>Estate type: {estatetype}</li>
              <li>Region: {region}</li>
              <li>District: {district}</li>
              <li>Full name: {fullname}</li>
              <li>Email: {email}</li>
              <li>Phone: {phone}</li>
          </ul>
  
          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : ''}
          <div>
          <button 
              onClick={ this.Previous }
                type="submit"
              >
                Previous
              </button>
  
              <button 
                onClick={ this.Continue }
                type="submit"
              >
                Confirm & Continue
              </button>
          </div>
         
        </div>
    )
  }
  
}

export default Confirmation