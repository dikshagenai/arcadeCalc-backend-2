const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/countUsers', async (req, res) => {
    try {
        var users = fs.readFileSync("./data/users/usersCount.txt", "utf8");
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error.message)
    }

});


router.post('/incrementUser', async (req, res) => {
    // means one more to be added in the main json
    try {
        var oldUsers = fs.readFileSync("./data/users/usersCount.txt", "utf8");
        fs.writeFileSync("./data/users/usersCount.txt", `${parseInt(oldUsers) + 1}`, "utf8")
        res.status(200).send("New user added successfully!")

    } catch (error) {
        res.status(500).send(error.message)

    }
})


router.post('/addUser', async (req, res) => {
    try {
        var users = await JSON.parse(fs.readFileSync("./data/users/users.json", "utf8"));

        var newUser = req.body.data;
        var finalOutput = JSON.stringify(Object.assign(newUser, users));
        fs.writeFileSync('./data/users/users.json', finalOutput, "utf8");
        res.status(200).send("User added successfully!");

        // users.splice(0, 0, newUser)

    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get('/fetchUsers', async (req, res) => {
    try {
        // var users = require("../data/users/users.json")
        var users = fs.readFileSync("./data/users/users.json", "utf8");
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports = router;
