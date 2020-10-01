import React, { useEffect, useState } from 'react';
import { Table, Button, Confirm } from 'semantic-ui-react';
import axios from 'axios';
import config from '../env/config.dev';

const API = `http://${config.host}:${config.port}/api/admin`;

export const IngredientList = (props) => {

  const [ingredients, setMeals] = useState([]);
  const [ingredientFocused, setUserFocused] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    setMeals(props.ingredients);
  })

  const openDeleteConfirmBox = (ingredient) => {
    setUserFocused(ingredient);
    setOpenConfirm(true);
  }
  const closeConfirmBox = () => setOpenConfirm(false)

  const deleteIngredient = () => {
    axios.delete(
      `${API}/ingredients/${ingredientFocused._id}`
    )
    .then(response => {
      if (response.status === 200) {
        ingredients.splice(ingredientFocused.idx, 1);
        setMeals([...ingredients]);
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
        onConfirm={deleteIngredient}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Options</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Date Added</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            ingredients?.map((ingredient, idx) => 
              (<Table.Row key={ingredient._id}>
                <Table.Cell>{ingredient.name}</Table.Cell>
                <Table.Cell>{ingredient.description}</Table.Cell>
                <Table.Cell>{ingredient.options.join(', ')}</Table.Cell>
                <Table.Cell>{ingredient.status ? 'Active' : 'Inactive'}</Table.Cell>
                <Table.Cell>{ingredient.createdAt}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      icon={ingredient.status ? 'lock open' : 'lock'}
                      title={ingredient.status ? 'Click to lock Ingredient' : 'Click to unlock Ingredient'} />
                    <Button icon='edit' />
                    <Button
                      icon='delete' value={ingredient}
                      onClick={() => { ingredient.idx = idx; openDeleteConfirmBox(ingredient)}}
                      title='Click to delete ingredient'
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

export default IngredientList;
