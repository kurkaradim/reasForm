import React from 'react';

class DistrictSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: {}};
	}

    handleChange = (e) => {
        console.log(e.target.value)
        this.props.onChange(e)
    }

	componentDidMount() {
        fetch('/api/districts/all').then((res) => res.json()).then((data) => this.setState({ data }));		
	}

	render() {        
		if (this.state.data.districts) {
            const array = this.state.data.districts
			return (
				<select value={this.props.value} onChange={(e)=> this.handleChange(e)}>
                	<option value="notselected">Please select a district</option>
                    {array.map((reg, i) => {return <option key={i} value={reg}>{reg}</option>})}
                </select>
			);
		} return ''
	}
}

export default DistrictSelect;
