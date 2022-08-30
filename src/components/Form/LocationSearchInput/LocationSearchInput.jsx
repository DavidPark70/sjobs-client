import React from 'react';
import { TextField } from '@material-ui/core';
import PlacesAutocomplete from 'react-places-autocomplete';

const LocationSearchInput = ({ address, setAddress, handleSelect }) => {
    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div class='MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth'>
                    <TextField
                        style={{ left: '-9px', color: 'black' }}
                        variant='outlined'
                        fullWidth
                        label='Location'
                        name='location'
                        {...getInputProps({
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationSearchInput;

