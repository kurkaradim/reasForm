import React from 'react';

class RegionSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: {}};
	}

    handleChange = (e) => {
        this.props.onChange(e)
    }

	componentDidMount() {
		fetch('/api/regions').then((res) => res.json()).then((data) => this.setState({ data }));
	}

	render() {
		if (this.state.data.regions) {
            const array = this.state.data.regions
			return (
				<select onChange={(e)=> this.handleChange(e)}>
					<option value="notselected">Please select a region</option>
                    {array.map((reg, i) => {return <option key={i} value={reg}>{reg}</option>})}
                </select>
			);
		} return ''
	}
}

export default RegionSelect;
