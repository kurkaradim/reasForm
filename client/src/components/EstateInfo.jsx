import React from 'react';
import RegionSelect from './RegionSelect';
import DistrictSelect from './DistrictSelect';

class EstateInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { validateDistrict: true, validateEstate: true, validateRegion: true };
	}

	continue = (e) => {
		e.preventDefault();
		this.validateInputs();
	};

	validateInputs = () => {
		const { estatetype, region, district } = this.props.values;

		if (estatetype != "notselected") {
			this.setState({ validateEstate: true });
		} else {
			this.setState({ validateEstate: false });
		}
		if (region != "notselected") {
			this.setState({ validateRegion: true });
		} else {
			this.setState({ validateRegion: false });
		}
		if (district != "notselected") {
			this.setState({ validateDistrict: true }, () => {
				const { validateDistrict, validateEstate, validateRegion } = this.state;
				if (validateDistrict === true && validateEstate === true && validateRegion === true) {
					this.props.nextStep();
				}
			});
		} else {
			this.setState({ validateDistrict: false });
		}
	};

	render() {
		const { values, handleChange, nextStep } = this.props;
		const { validateEstate, validateRegion, validateDistrict } = this.state;


		return (
			<form className="estateInfo">
				<div className="formItem">
					<label>
						Estate type
						<select value={values.estatetype} onChange={handleChange('estatetype')}>
							<option value="notselected">Please select an estate type:</option>
							<option value="Apartment">Apartment</option>
							<option value="House">House</option>
							<option value="Land">Land</option>
						</select>
						{validateEstate === false ? <p className='error'>Estate has to be selected</p> : ''}
					</label>
				</div>
				<div className="formItem">
					<label>
						Region
						<RegionSelect value={values.region} onChange={handleChange('region')} />
						{validateRegion === false ? <p className='error'>Region not selected</p> : ''}
					</label>
				</div>
				<div className="formItem">
					<label>
						District
						<DistrictSelect
							value={values.district}
							region={values.region}
							onChange={handleChange('district')}
						/>
						{validateDistrict === false ? <p className='error'>District not selected</p> : ''}
					</label>
				</div>

				<button onClick={(e) => this.continue(e)}>Next</button>
			</form>
		);
	}
}

export default EstateInfo;
