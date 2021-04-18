const router = require('express').Router()


router.get('/api/rooms', ( req, res ) => {
    const rooms = ['Transportation', 'Siblings', 'Paranormal', 'Literature', 'Shit 4chan Says']
    res.send(rooms)
})


module.exports = router