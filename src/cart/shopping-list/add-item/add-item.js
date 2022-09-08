import { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const AddItem = (props) => {

    const [data, setData] = useState({
        itemName: '',
        category: '',
        quantity: '',
        unit: '',
        pricePerUnit: '',
        date: new Date(),
        addedBy: ''
    });

    const updateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleAddItem = e => {
        props.onAddItem(data);
        resetData();
        e.preventDefault();
    }

    const resetData = () => {
        setData({
            itemName: '',
            category: '',
            quantity: '',
            unit: '',
            pricePerUnit: '',
            date: new Date(),
            addedBy: ''
        });
    }

    return (
        <form onSubmit={handleAddItem}>
            <Container>
                <Row>
                    <Col>
                        <label>Enter Item</label>
                        <input type="text" value={data.itemName} name="itemName" onChange={updateField} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Select Category</label>
                        <input type="text" value={data.category} name="category" onChange={updateField} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Enter Quantity</label>
                        <input type="text" value={data.quantity} name="quantity" onChange={updateField} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Select Unit</label>
                        <select value={data.unit} name="unit" onChange={updateField}>
                            <option value="select">Select</option>
                            <option value="kg">kg</option>
                            <option value="lbs">lbs</option>
                            <option value="nos">nos</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Enter Price/Unit</label>
                        <input type="text" value={data.pricePerUnit} name="pricePerUnit" onChange={updateField} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button type="submit">Add Item </button>
                    </Col>
                </Row>
            </Container>
        </form>
    )
}

export default AddItem;