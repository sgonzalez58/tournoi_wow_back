const checkPlayersInput = (req, res, next) => {
    const body = req.body;

    if(body.username == undefined){
        res.status(400).send({ "message": "The field 'username' is required" });
        return;
    }

    if(body.password == undefined){
        res.status(400).send({ "message": "The field 'password' is required" });
        return;
    }

    if(body.email == undefined){
        res.status(400).send({ "message": "The field 'email' is required" });
        return;
    }

    next();
}

module.exports = checkPlayersInput;