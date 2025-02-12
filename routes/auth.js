const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const checkPlayersInput = require("../middlewares/checkPlayersInput");
const db = require('../db');

// Route pour se connecter
router.post('/login',  async (req, res) => {
    const body = req.body;

    try{
        const query = "SELECT id FROM users WHERE (username = $1 || email = $1) AND password = $2";
        const hash = bcrypt.hashSync(body.password, 8);
        const result = await db.query(query, [body.username, hash]);
        res.json(result.rows[0]);
    }
    catch(err){
        console.log(err);
        res.status(500).send({ "message": "Internal Server Error" });
    }
});

// Route pour s'inscrire
router.post('/register', checkPlayersInput, async (req, res) => {
    const body = req.body;

    try{
        const query = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, role";
        const hash = bcrypt.hashSync(body.password, 8);
        const result = await db.query(query, [body.username, hash, body.email]);
        res.json(result.rows);
    }
    catch(err){
        console.log(err);
        res.status(500).send({ "message": "Internal Server Error" });
    }
});

module.exports = router;
