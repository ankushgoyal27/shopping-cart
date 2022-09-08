import Table from "react-bootstrap/esm/Table";

const ViewStore = props => {

    const handleViewItemList = e => {
        props.onViewItemList(e.target.value);
    }

    return (
        props.list.length > 0 &&
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Store</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.list.map((item) => {
                    return <tr key={item.id}>
                        <td>{item.data.storeName}</td>
                        <td><button type="button" value={item.id} onClick={handleViewItemList}>View</button></td>
                    </tr>
                })}
            </tbody>
        </Table>
    )

}

export default ViewStore;