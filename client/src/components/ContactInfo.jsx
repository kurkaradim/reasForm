import React from 'react';

class EstateInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { validateEmail: true, validatePhone: true, validateName: true };
	}

	continue = (e) => {
		e.preventDefault();
		this.validateInputs();
	};

	previous = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	validateInputs = () => {
		const { email, phone, fullname } = this.props.values;

		if (
			email.length > 0 &&
			email.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			this.setState({ validateEmail: true });
		} else {
			this.setState({ validateEmail: false });
		}
		if (fullname.length > 0) {
			this.setState({ validateName: true });
		} else {
			this.setState({ validateName: false });
		}
		if (phone.length === 9 && phone.match(/^[0-9]+$/) != null) {
			this.setState({ validatePhone: true }, () => {
				const { validatePhone, validateEmail, validateName } = this.state;
				if (validateEmail === true && validateName === true && validatePhone === true) {
					this.props.nextStep();
				}
			});
		} else {
			this.setState({ validatePhone: false });
		}
	};

	render() {
		const { values, handleChange, nextStep } = this.props;
		const { validatePhone, validateEmail, validateName } = this.state;
		return (
			<form>
				<div className="formItem">
					<label>
						Full name
						<input
							type="text"
							placeholder="Full name"
							value={values.fullname}
							onChange={handleChange('fullname')}
						/>
						{validateName === false ? <p className='error'>Full name cannot be blank</p> : ''}
					</label>
				</div>
				<div className="formItem">
					<label>
						Phone
						<input
							type="tel"
							placeholder="Telephone number"
							value={values.phone}
							onChange={handleChange('phone')}
						/>
						{validatePhone === false ? <p className='error'>Please provide a czech telephone number</p> : ''}
					</label>
				</div>
				<div className="formItem">
					<label>
						Email
						<input
							type="email"
							placeholder="Email address"
							value={values.email}
							onChange={handleChange('email')}
						/>
						{validateEmail === false ? <p className='error'>Please enter email in the correct format</p> : ''}
					</label>
				</div>

				<button onClick={(e) => this.previous(e)}>Previous</button>
				<button onClick={(e) => this.continue(e)}>Next</button>
			</form>
		);
	}
}

export default EstateInfo;
