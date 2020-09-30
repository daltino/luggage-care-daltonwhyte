import React, { useEffect, useState } from 'react';
import { Table, Button, Confirm } from 'semantic-ui-react';
import axios from 'axios';
import config from '../env/config.dev';

const API = `http://${config.host}:${config.port}/api/admin`;

export const OrderList = (props) => {

  const [orders, setOrders] = useState([]);
  const [orderFocused, setUserFocused] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    setOrders(props.orders);
  })

  const openDeleteConfirmBox = (order) => {
    setUserFocused(order);
    setOpenConfirm(true);
  }
  const closeConfirmBox = () => setOpenConfirm(false)

  const banUser = () => {
    axios.delete(
      `${API}/orders/${orderFocused._id}`
    )
    .then(response => {
      if (response.status === 200) {
        orders.splice(orderFocused.idx, 1);
        const newOrders = [...orders];
        setOrders(newOrders);
      }
      closeConfirmBox();
    })
    .catch(e => {
      alert(e);
      closeConfirmBox();
    })
  }

  return (
    <div>
      <Confirm
        header='Delete User'
        open={openConfirm}
        onCancel={closeConfirmBox}
        onConfirm={banUser}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Meal</Table.HeaderCell>
            <Table.HeaderCell>Ingredients</Table.HeaderCell>
            <Table.HeaderCell>Date Ordered</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            orders?.map((order, idx) => 
              (<Table.Row key={order._id}>
                <Table.Cell>{order.user.profile?.firstName} {order.user.profile?.lastName}</Table.Cell>
                <Table.Cell>{order.meal}</Table.Cell>
                <Table.Cell>{order.ingredients}</Table.Cell>
                <Table.Cell>{order.createdAt}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button icon='edit' />
                    <Button icon='delete' value={order} onClick={() => { order.idx = idx; openDeleteConfirmBox(order)}} />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>))
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default OrderList;
