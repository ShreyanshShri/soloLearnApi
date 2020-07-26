const express = require('express')
const app = express()
const cors = require('cors')
const codeplaygroundRoute =require('./routes/codeplaygound')
const userInfoRoute = require('./routes/userInfo')
const qnaInfoRoute = require('./routes/qnaInfo')
const leaderboardRoute = require('./routes/leaderboard')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json({limit:'1mb'}))

app.use('/userInfo', userInfoRoute)
app.use('/codeplayground', codeplaygroundRoute)
app.use('/qnaInfo', qnaInfoRoute)
app.use('/leaderboard', leaderboardRoute)

app.use((req, res, next)=>{
    res.json({
        message: 'Invalid route...',
        validRoutes: {
         forUserInfo: '/userInfo/<sololearn_id>',
         forCodePlaygroundInfo: '/codeplayground/<ordering>/<language(Enter All if want to get data of all languages)>/<page>',
         forQnaPage: '/qnaInfo/<ordering>/<page>',
         forQnaThread: '/qnaInfo/thread/id/<questionId>'   
        }
    })
})

app.listen(port, ()=> console.log(`Running at port ${port}`))
