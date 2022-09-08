import { useState } from "react";

const AddStore = props => {
    const [storeName, setStoreName] = useState('');

    const handleAddStore = e => {
        props.onAddStore(storeName);
        e.preventDefault();
    }

    return (
        <form onSubmit={handleAddStore}>
            <label>Enter Store Name</label>
            <input type='text' value={storeName} name="storeName" onChange={e => setStoreName(e.target.value)} />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddStore;