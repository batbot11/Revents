import React from "react";
import {Form, Label} from "semantic-ui-react";
import Script from "react-load-script";
import PlacesAutocomplete from "react-places-autocomplete";

const styles = {
    autocompleteContainer: {
        zIndex: 1000
    }
}

class PlaceInput extends React.Component{
    state ={
        scriptLoaded: false
    }

    handleScriptLoad = () => (this.setState({scriptLoaded: true}));

    render() {
        const {input, width, onSelect, placeholder, options, meta: {touched, error}} = this.props;
        return(
           <Form.Field error={touched && !!error} width={width} >
            <Script 
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJW1DNdJfsoveoCLjJaLbHSDxVoxV0p8c&libraries=places"
        onLoad={this.handleScriptLoad}
        />
        {this.state.scriptLoaded &&
            <PlacesAutocomplete
            inputProps={{...input, placeholder}}
            onSelect={onSelect}
            options ={options}
            styles = {styles}
            /> }
            {touched && error && <Label color="red" >{error}</Label>}

           </Form.Field>
           
        );
    }
}

export default PlaceInput;