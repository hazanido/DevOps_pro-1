const express = require('express')

const app = express()

app.get('/',(req,res)=>{

    res.send('hello')
})
app.get('/test',(req,res)=>{
    res.send('test hello')
})

module.exports = app