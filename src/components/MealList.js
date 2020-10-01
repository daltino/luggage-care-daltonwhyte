import React, { useEffect, useState } from 'react';
import { Table, Button, Confirm } from 'semantic-ui-react';
import axios from 'axios';
import config from '../env/config.dev';

const API = `http://${config.host}:${config.port}/api/admin`;

export const MealList = (props) => {

  const [meals, setMeals] = useState([]);
  const [mealFocused, setUserFocused] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    setMeals(props.meals);
  })

  const openDeleteConfirmBox = (meal) => {
    setUserFocused(meal);
    setOpenConfirm(true);
  }
  const closeConfirmBox = () => setOpenConfirm(false)

  const banUser = () => {
    axios.delete(
      `${API}/meals/${mealFocused._id}`
    )
    .then(response => {
      if (response.status === 200) {
        meals.splice(mealFocused.idx, 1);
        const newMeals = [...meals];
        setMeals(newMeals);
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
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Date Added</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            meals?.map((meal, idx) => 
              (<Table.Row key={meal._id}>
                <Table.Cell>{meal.name}</Table.Cell>
                <Table.Cell>{meal.description}</Table.Cell>
                <Table.Cell>{meal.status}</Table.Cell>
                <Table.Cell>{meal.createdAt}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button icon='edit' />
                    <Button icon='delete' value={meal} onClick={() => { meal.idx = idx; openDeleteConfirmBox(meal)}} />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>))
          }
        </Table.Body>
      </Table>
    </div>
  )
}

export default MealList;
