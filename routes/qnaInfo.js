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
            console.log(err.code)
            mainRes.status(res.statusCode).json({errCode: err})
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
                let questionId = $(ele).find('.postDetails a').attr('href').replace('/Discuss/', '').slice(0,7)     
                
                // console.log(questionId)
                let thisInfo = {
                    questionInfo: {
                        questionId: questionId,
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

router.get('/thread/id/:id', (req, mainRes)=>{
    let random = Math.floor(Math.random()*myUserAgents.length);
    var customHeaderRequest = request.defaults({
        headers: {
            'User-Agent': myUserAgents[random]
          }
    })
    const id = req.params.id
    let allData
    let allAnsData = []
    customHeaderRequest.get(`https://www.sololearn.com/Discuss/${id}/`, (err, res, html)=>{
        
        if(err){
            console.log(err)
            // if(err.code == 'ECONNRESET') mainRes.json({message: 'Couldnot process your request due to Bad Network'}, {error: err})
        }else{
            // console.log(html)
            const $ = cheerio.load(html)
// console.log('reached here')
            const question = $('.question .header').text().trim()
            const message = $('.question .message').text().trim()
            const upvotes = $('.question .positive').text().trim() ||$('.question .negative').text().trim()
            let tags = []
            $('.postDetails .tag').each((index, ele)=>{
                let tag = $(ele).text().trim()
                tags.push(tag)
            })
            const authorName = $('.question .userName').text().trim()
            const postedAt = $('.question .date').text().trim()
            const authorImg = $('.question img').attr('src')
            // console.log(question, message, upvotes, tags, authorName, authorImg, postedAt)
            
            //answers
            $('.answer').each((index, ele)=>{
                let answer = $(ele).find('.message').text().trim()
                let upvotesOnAns = $(ele).find('.positive').text().trim() || $(ele).find('.negative').text().trim()
                let answeredBy = $(ele).find('.userName').text().trim()
                let ansPostedAt = $(ele).find('.date').attr('data-date')
                let answererImg = $(ele).find('img').attr('src')
                console.log(ansPostedAt)
                let thisData = {
                    answerDetails: {
                        answer: answer,
                        upvotes: upvotesOnAns,
                        postedAt: ansPostedAt
                    }, userDetails: {
                        userName: answeredBy,
                        userimg: answererImg
                    }
                }
                // console.log(thisData)
                allAnsData.push(thisData)
            })
            allData = {
                questionInfo: {
                    questionDetails: {
                        question: question,
                        message: message,
                        upvotes: upvotes,
                        postedAt: postedAt
                    }, 
                    authorDetails: {
                        authorName: authorName,
                        authorImg: authorImg
                    }
                },
                answersInfo: allAnsData
            }
            console.log(allData)
            mainRes.json(allData)
        }

    })
})

module.exports = router