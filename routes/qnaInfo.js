const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const request = require('request')
const myProxyList = require('../userAgentList')
const  myUserAgents =  myProxyList.myUserAgents;

router.get('/:ordering/:page', (req, mainRes)=>{
    const ordering = req.params.ordering
    const page = req.params.page
    let random = Math.floor(Math.random()*myUserAgents.length);
    var customHeaderRequest = request.defaults({
        headers: {
            'User-Agent': myUserAgents[random]
          }
    })
    var allInfo = [];

    customHeaderRequest.get(`https://www.sololearn.com/Discuss?ordering=${ordering}&query=&page=${page}`, (err, res, html)=>{
        if(err){
            console.log(err)
            mainRes.status(201).json({message: 'An error Occured'}, {errCode: err})
        }else{

            const $ = cheerio.load(html)
            $('.question').each((index1, ele)=>{
                let question = $(ele).find('.postDetails a:nth-child(1)').text().trim()
                let tags = []
                $(ele).find('.tag').each((index2, ele)=>{
                    let tag = $(ele).text().trim()
                    tags.push(tag)
                })
                let likes = $(ele).find('p').first().text().trim()
                let answers = $(ele).find('a:nth-child(2) p').text().trim()
                // console.log(likes, answers)
                let userName = $(ele).find('.userName').text().trim()
                let postedAt = $(ele).find('.date').text().trim()
                let imgLink = $(ele).find('img').attr('src')
                let thisInfo = {
                    questionInfo: {
                        question: question,
                        upvotes: likes,
                        answers: answers,
                        tags: tags,
                        postedAt: postedAt
                    },
                    userInfo: {
                        userName: userName,
                        imgLink: imgLink
                    }
                }
                allInfo.push(thisInfo)
            })

            // console.log(allInfo)
            mainRes.json(allInfo)
        }

    })
})

router.get('/thread/:slug', (req, mainRes)=>{
    let random = Math.floor(Math.random()*myUserAgents.length);
    var customHeaderRequest = request.defaults({
        headers: {
            'User-Agent': myUserAgents[random]
          }
    })

    res.json({data:'data'})
})

module.exports = router