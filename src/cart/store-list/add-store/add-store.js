import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useState } from "react";

const storeDictionary = [
    { title: 'Walmart', year: 1994 },
];

const filter = createFilterOptions();
const AddStore = props => {
    const [value, setValue] = useState(null);

    const handleAddStore = e => {
        e.preventDefault();
        console.log(value.title);
        props.onAddStore(value.title);
    }

    return (
        // <form onSubmit={handleAddStore}>
        //     <label>Enter Store Name</label>
        //     <input type='text' value={storeName} name="storeName" onChange={e => setStoreName(e.target.value)} />
        //     <button type="submit">Add</button>
        // </form>
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={storeDictionary}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Add Store" />
            )}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    handleAddStore(e);
                }
            }}
        />
    )
}

export default AddStore;