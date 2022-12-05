import express from 'express';
import {v4 as uuidv4} from 'uuid';
const router = express.Router();

let users =[];

//Fetch records of all users
router.get('/', (req,res) => 
{ 
    console.log(users); 
    res.send(users);
});


//Records inserted of users
router.post('/', (req,res) => 
{ 
    const user = req.body;
    users.push({...user,id: uuidv4()});
    res.send(`Users with username ${user.firstName} added to database`);
});

//Records fetch for particular id
router.get('/:id', (req,res) => 
{ 
    const { id } = req.params;
    const foundUser = users.find((user) => user.id == id);
    res.send(foundUser);
});


//Records deleted successfully
router.delete('/:id', (req,res) => 
{ 
    const { id } = req.params;
    users = users.filter((user) => user.id != id);
    res.send(`Delete Users with userid ${id} deleted from database`);
});


//Records updated for users
router.patch('/:id', (req,res) => 
{ 
    const { id } = req.params;
    const {firstName , lastName , age} = req.body;
    const user = users.find((user) => user.id == id);

    if(firstName){
        user.firstName = firstName;
    }
    if(lastName){
        user.lastName = lastName;
    }
    if(age){
        user.age = age;
    }
    res.send(`Updated Users with id ${id} updated from database`);
});

export default router;