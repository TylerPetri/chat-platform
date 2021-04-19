const router = require('express').Router()
const { Rooms } = require('./Models/Index')


router.get('/api/rooms', ( req, res ) => {
    Rooms.find({})
    .then((a) => {
        res.json(a);
    })
    .catch((err) => {
        res.json(err);
    });
})

router.post('/api/rooms', ( req, res ) => {
    const room = JSON.stringify(req.body.data)
    Rooms.create({room:room}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})


module.exports = router