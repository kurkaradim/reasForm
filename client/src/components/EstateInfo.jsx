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

		if (estatetype.length > 0) {
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
		console.log(this.state);
		console.log(this.props);
		return (
			<form className="estateInfo">
				<div className="formItem">
					<label>
						Estate type
						<input
							type="text"
							placeholder="Estate type"
							value={values.estatetype}
							onChange={handleChange('estatetype')}
						/>
						{validateEstate === false ? <p className='error'>Estate type cannot be blank</p> : ''}
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
