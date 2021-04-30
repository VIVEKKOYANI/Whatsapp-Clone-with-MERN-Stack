//importing
import express from 'express';
import mongoose  from 'mongoose';
import Message from './dbMessages';

//app config
const app = express();
const port = process.env.PORT || 9000;
//middleware

//DB Config
const connection_url = 'mongodb+srv://admin:7zn8FsfPmoer2YO3@cluster0.erm5t.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// ???

//api routes
app.get('/', (req, res) =>  res.status(200).send("hello world"))

app.get('/message/sync', (req, res) => {

    Message.find((err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

app.post('/message/new', (req, res) => {
    const dbMessage = req.body

    Message.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})
//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));