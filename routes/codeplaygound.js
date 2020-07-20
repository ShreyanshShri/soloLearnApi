const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const request = require('request')
const myProxyList = require('../userAgentList')
const slug = require('slug')

const  myUserAgents =  myProxyList.myUserAgents;

router.get('/:ordering/:lang/:page', (req, mainRes2)=>{
    let ordering = req.params.ordering
    let lang = req.params.lang
    let page = req.params.page
    if(lang == 'All'){
        lang = ""
    }

    let codeplaygroundInfo =[];
    let random = Math.floor(Math.random()*myUserAgents.length);
    var customHeaderRequest = request.defaults({
        headers: {
            'User-Agent': myUserAgents[random]
          }
    })
    
    customHeaderRequest.get(`https://www.sololearn.com/Codes?ordering=${ordering}&query=&language=${lang}&page=${page}`, (err, res, html)=>{
        // console.log(html)
        if(err){
            mainRes.json({messsage : 'Oops We got an error...Probably sololearn server is not responding'}, {errorCode : err})
            console.log(err)
        }else{
            
            const $ = cheerio.load(html)
            
            $('.codeContainer').each((index1, ele)=>{
                let code_key = slug($(ele).find('.nameLink').text().trim(), '_', {lower: false})
                let code_text = $(ele).find('.nameLink').text().trim()
                // console.log(code_text, code_key)
                let code_upvotes = parseInt($(ele).find('.positive').text().trim())
                // console.log(code_upvote)
                let userName = $(ele).find('.userName').text().trim()
                // console.log(userName)
                let codeDate = $(ele).find('.codeDate').text().trim()
                // console.log(codeDate)
                let imgLink = $(ele).find('img').attr('src')
                // console.log(imgLink)
                let codeLanguage = $(ele).find('.icon').text().trim()
                // console.log(codeLanguage)
            
                
                let info = {
                    codeInfo :{ 
                        codeName: code_text,
                        codeupvotes: code_upvotes,
                        codeLanguage: codeLanguage,
                        creationDate: codeDate
                    },
                    authorInfo: {
                    username: userName,
                    imgLink: imgLink
                    }
                }
            // console.log(info)
            codeplaygroundInfo.push(info)
            
            })
            
            console.log(codeplaygroundInfo)    
            mainRes2.json(codeplaygroundInfo)
        }
    })
    

})

module.exports = router