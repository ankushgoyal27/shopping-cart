import Table from 'react-bootstrap/Table';

const ListItem = props => {

    const handleDeleteItem = e => {
        props.onDeleteItem(e.target.value);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {props.list.map((item, i) => {
                    return <tr key={i}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td><button type="button" value={i} onClick={handleDeleteItem}>Delete</button></td>
                    </tr>
                })}
            </tbody>
        </Table>

    )
}

export default ListItem;