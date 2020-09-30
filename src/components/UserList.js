import React, { useEffect, useState } from 'react';
import { Table, Button, Confirm } from 'semantic-ui-react';
import axios from 'axios';
import config from '../env/config.dev';

const API = `http://${config.host}:${config.port}/api/admin`;

const UserList = (props) => {

  const [users, setUsers] = useState([]);
  const [userFocused, setUserFocused] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    setUsers(props.users);
  })

  const openDeleteConfirmBox = (user) => {
    setUserFocused(user);
    setOpenConfirm(true);
  }
  const closeConfirmBox = () => setOpenConfirm(false)

  const banUser = () => {
    axios.delete(
      `${API}/users/${userFocused._id}`
    )
    .then(response => {
      if (response.status === 200) {
        users.splice(userFocused.idx, 1);
        const newUsers = [...users];
        setUsers(newUsers);
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
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Date Joined</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            users?.map((user, idx) => 
              (<Table.Row key={user._id}>
                <Table.Cell>{user.profile?.firstName} {user.profile?.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.createdAt}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button icon='edit' />
                    <Button icon='delete' value={user} onClick={() => { user.idx = idx; openDeleteConfirmBox(user)}} />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>))
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default UserList;
