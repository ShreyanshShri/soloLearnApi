const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const request = require('request')
const myProxyList = require('../userAgentList')
const slug = require('slug')

const  myUserAgents =  myProxyList.myUserAgents;

router.get('/:sololearn_id', (req, mainRes)=>{
    let userInfo;
    const sololearn_id  =req.params.sololearn_id
// console.log(sololearn_id)
    let random = Math.floor(Math.random()*myUserAgents.length);
    var customHeaderRequest = request.defaults({
        headers: {
            'User-Agent': myUserAgents[random]
          }
    })

    customHeaderRequest.get(`https://www.sololearn.com/Profile/${sololearn_id}`,(err,res,html)=>{
    if(err) console.log(err)
    const $ = cheerio.load(html)
    
    if(res.statusCode!= 200){
        mainRes.json({Error:"Maybe Provided Id Is Incorrect..:("});
        console.log('yuppp')
    } else{

        const user_name = $('.name').text().trim();
        // console.log(user_name)
        const user_level = parseInt($('.detail div').first().text().replace(/\n/g, '').slice(5));
        const user_tottal_xp = parseInt($('.detail div').last().text().trim().slice(0, -3));
        const user_profile_pic_url = 'https://api.sololearn.com/Uploads/Avatars/'+sololearn_id+'.jpg';
        let user_cources_list = {};
        let user_codes_list = [];
        let user_certificates_list = [];

        $('.courseWrapper').each((index,ele)=>{
            const cource_name = $(ele).find('a').attr('title');
            const cource_xp = parseInt($(ele).find('.courseXp').text().slice(0, -3));
            user_cources_list[cource_name]=cource_xp; 
        })
       
        $('.codeContainer').each((index2,el)=>{
            let codeKey = slug($(el).find('.codeDetails a').text(),'_', {lower: false});
            let code_text = $(el).find('.codeDetails a').text().trim();
            let code_upvotes = parseInt($(el).find('.positive').html());
            if(Number.isNaN(code_upvotes)){
                code_upvotes=0;
            }
            let codesAndUpvotesInfo = {
                codeName: code_text,
                codeUpvotes: code_upvotes
            }
            user_codes_list.push(codesAndUpvotesInfo);    
        })
        
        $('.certificate').each((index3,e)=>{
            const cert_name = $(e).find('.details').find('.title').text().trim();
            user_certificates_list.push(cert_name);
        })

        userInfo = {
            userBasicInfo: {
                username: user_name,
                userLevel: user_level,
                userXp: user_tottal_xp,
                userProfilePic: user_profile_pic_url
            },
            coursesXpInfo: user_cources_list,
            codeUpvotesInfo: user_codes_list,
            coursesComplted: user_certificates_list 
        }
console.log(userInfo)
    }

})

    mainRes.json(userInfo)
})

module.exports = router