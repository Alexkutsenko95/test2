import React from "react";
import Select from 'react-select';
import ArrCountries from '../data/countries'

class SelectFormik extends React.Component {

    state = {
        options: []
    };

    componentDidMount(){
        const countries = JSON.parse(JSON.stringify(ArrCountries));

        const options = countries.map(country => {
            country.label = country.Code.toLowerCase();
            country.value = country.Name;
            delete country.Code;
            delete country.Name;
            return country
        });

        this.setState(() => ({options}));
    }

    handleChange = value => {
        this.props.onChange("country", value);
    };

    handleBlur = () => {
        this.props.onBlur("country", true);
    };

    render() {

        return (
            <div style={{ margin: "1rem 0" }}>
                <label htmlFor="color">Choose your country</label>
                <Select
                    id="color"
                    options={this.state.options}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                />
                {!!this.props.error && this.props.touched && (
                    <div style={{ color: "red", marginTop: ".5rem" }}>
                        {this.props.error}
                    </div>
                )}
            </div>
        );
    }
}

export default SelectFormik