const ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db) {


    app.get('/api/data', (req, res) => {
        db.collection('data').find({}).toArray((err, result) => {
            if (err) {
                res.send({'error': 'error has occured'})
            } else {
                res.send(result)
        }
})
})
    app.post('/api/create', (req, res) => {
        const obj = { username: req.body.username, title: req.body.title, body: req.body.body, comments: [], date: req.body.date};
         db.collection('data').insert(obj, (err, result) => {
            if (err) {
                res.send({'error': 'error has occured'})
            } else {
                res.send(result.ops)
        }
})
})
app.get('/api/find', (req, res) => {
    let param = req.query._id;
     db.collection('data').findOne({'_id' : ObjectId(param)}, (err, result) => {
        if (err) {
            res.send({'error': 'error has occured'})
        } else {
            res.send(result)
    }
})
})
app.put('/api/add', (req, res) => {
    const id = req.body._id;
    const obj = {
        user: req.body.user,
        comment: req.body.comment
    }
     db.collection('data').updateOne({'_id' : ObjectId(id)}, {$push: {comments: obj}}, (err, result) => {
        if (err) {
            res.send({'error': 'error has occured'})
        } else {
            res.send(result)
    }
})
})
app.delete('/api/delete', (req, res) => {
     db.collection('data').deleteOne({'_id' : ObjectId(req.query._id)}, (err, result) => {
        if (err) {
            res.send({'error': 'error has occured'})
        } else {
            res.send(result.ops)
    }
})
})
}
