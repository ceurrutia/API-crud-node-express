import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [];


//get de users

router.get('/', (req, res) => {
  res.json(users);
});

//obtener get id

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id)

  res.send(foundUser)
});

//post
router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`The user: ${user.first_name} ${user.last_name }, ${user.mail} has been added to the Database`);
}) 

//delete

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id)

  res.send(`The user with ID: ${id} has been deleted successfully from database`);
});

//patch

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const { first_name, last_name, mail} = req.body;

  const user = users.find((user) => user.id === id)

  if(first_name) user.first_name = first_name;
  if(last_name) user.last_name = last_name;
  if(mail) user.mail = mail;

  res.send(`User with the ${id} has been updated`)
  
});

export default router