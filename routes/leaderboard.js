const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const request = require('request')
const myProxyList = require('../userAgentList')

const  myUserAgents =  myProxyList.myUserAgents;

router.get('/', (req, mainRes)=>{

    let random = Math.floor(Math.random()*myUserAgents.length);
    var customHeaderRequest = request.defaults({
        headers: {
            'User-Agent': myUserAgents[random]
          }
    })

    customHeaderRequest.get('https://www.sololearn.com/Leaderboard/', (err, res, html)=>{
        if(!err){
            
            const $ = cheerio.load(html)
            const check = $('.content h1').text()
            if(check=='Page Not Found' || check=='Error.'){
                mainres.json({Error:"Maybe Provided Id Is Incorrect..:("});
                console.log('yuppp')
            } else{
                // console.log(html)
                let allInfo = []
                $('.item').each((index, ele)=>{
                    let username = $(ele).find('.name').text().trim()
                    let XPs = $(ele).find('.points').text().trim().replace('\nXP', "")
                    let rank = $(ele).find('.rank').text().trim()
                    // console.log(username,XPs,rank)
                    let thisInfo = {
                        username: username,
                        xp: XPs,
                        rank: rank
                    }
                    // console.log(thisInfo)
                    allInfo.push(thisInfo)
                })
                // console.log(allInfo)
                mainRes.json(allInfo)
            }
        }
    })
})

router.get('/:lang', (req, mainRes)=>{
    let random = Math.floor(Math.random()*myUserAgents.length);
    var customHeaderRequest = request.defaults({
        headers: {
            'User-Agent': myUserAgents[random]
          }
    })
    const lang = req.params.lang

    customHeaderRequest.get(`https://www.sololearn.com/Leaderboard/${lang}`, (err, res, html)=>{
        if(!err){
            
            const $ = cheerio.load(html)
            const check = $('.content h1').text()
            if(check=='Page Not Found' || check=='Error.'){
                mainres.json({Error:"Maybe Provided Id Is Incorrect..:("});
                console.log('yuppp')
            } else{
                // console.log(html)
                let allInfo = []
                $('.item').each((index, ele)=>{
                    let username = $(ele).find('.name').text().trim()
                    let XPs = $(ele).find('.points').text().trim().replace('\nXP', "")
                    let rank = $(ele).find('.rank').text().trim()
                    console.log(username,XPs,rank)
                    let thisInfo = {
                        username: username,
                        xp: XPs,
                        rank: rank,
                        lang: lang
                    }
                    // console.log(thisInfo)
                    allInfo.push(thisInfo)
                })
                console.log(allInfo)
                mainRes.json(allInfo)
            }
        }
    })
})

module.exports = router
