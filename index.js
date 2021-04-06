import express from 'express'
import mongoose from 'mongoose'
import User from './user.model.js'

const app = express()
app.use(express.json())
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.once('open', () => {
    console.log("Connnected to database")
})

app.post('/', async (req, res) => {
    const user = new User(req.body)
    try {
        const newUser = await user.save()
        res.json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const newUser = await User.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }

})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        let deletedUser = await User.deleteOne({ _id: id })
        res.json(deletedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.listen(3000)