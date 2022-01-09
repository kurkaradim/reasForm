import React from 'react';

class DistrictSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: {}};
	}

    handleChange = (e) => {
        this.props.onChange(e)
    }

	componentDidMount() {
		fetch('/api/districts/all').then((res) => res.json()).then((data) => this.setState({ data }));		
	}

	render() {        

		if (this.props.region != "notselected" && this.state.data.districts != undefined) {
			console.log(this.state)
            const array = this.state.data.districts[this.props.region];
			return (
				<select value={this.props.value} onChange={(e)=> this.handleChange(e)}>
                	<option value="notselected">Please select a district</option>
                    {array.map((reg, i) => {return <option key={i} value={reg}>{reg}</option>})}
                </select>
			);
		} else {
			return (
				<select value={"noneselected"}>
						<option value="notselected">No region selected</option>
				</select>)
		}
	}
		
}

export default DistrictSelect;
