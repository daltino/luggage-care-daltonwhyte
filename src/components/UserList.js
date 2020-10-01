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

  const deleteUser = () => {
    axios.delete(
      `${API}/users/${userFocused._id}`
    )
    .then(response => {
      if (response.status === 200) {
        users.splice(userFocused.idx, 1);
        setUsers([...users]);
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
        onConfirm={deleteUser}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Login Code</Table.HeaderCell>
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
                <Table.Cell>{user.unique_code}</Table.Cell>
                <Table.Cell>{user.profile?.firstName} {user.profile?.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.createdAt}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button icon='edit' />
                    <Button
                      icon='delete' value={user}
                      onClick={() => { user.idx = idx; openDeleteConfirmBox(user)}}
                      title='Click to delete user'
                    />
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
