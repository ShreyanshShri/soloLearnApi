const express = require('express')
const app = express()
const cheerio = require('cheerio')
const request = require('request')
const myProxyList = require('./userAgentList')
const slug = require('slug')
const port = 5000;

const  myUserAgents =  myProxyList.myUserAgents;

let userInfo;

app.get('/:sololearn_id', (req, mainRes)=>{

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
        mainres.json({Error:"Maybe Provided Id Is Incorrect..:("});
        console.log('yuppp')
    } else{

        const user_name = $('.name').text().trim();
        // console.log(user_name)
        const user_level = parseInt($('.detail div').first().text().replace(/\n/g, '').slice(5));
        const user_tottal_xp = parseInt($('.detail div').last().text().trim().slice(0, -3));
        const user_profile_pic_url = 'https://api.sololearn.com/Uploads/Avatars/'+sololearn_id+'.jpg';
        const user_cources_list = {};
        const user_codes_list = {};
        const user_certificates_list = [];

        $('.courseWrapper').each((index,ele)=>{
            const cource_name = $(ele).find('a').attr('title');
            const cource_xp = parseInt($(ele).find('.courseXp').text().slice(0, -3));
            user_cources_list[cource_name]=cource_xp; 
        })
       
        $('.codeContainer').each((index2,el)=>{
            const code_text = slug($(el).find('.codeDetails a').text(),'_', {lower: false});
            var code_upvotes = parseInt($(el).find('.positive').html());
            if(Number.isNaN(code_upvotes)){
                code_upvotes=0;
            }
            user_codes_list[code_text]=code_upvotes;    
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


app.get('/codeplayground/:ordering/:lang/:page', (req, mainRes)=>{
    let ordering = req.params.ordering
    let lang = req.params.lang
    let page = req.params.page
    if(lang == 'All'){
        lang = ""
    }
    let random = Math.floor(Math.random()*myUserAgents.length);
    var customHeaderRequest = request.defaults({
        headers: {
            'User-Agent': myUserAgents[random]
          }
    })
    try{
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
                let code_upvote = parseInt($(ele).find('.positive').text().trim())
                // console.log(code_upvote)
                let userName = $(ele).find('.userName').text().trim()
                // console.log(userName)
                let codeDate = $(ele).find('.codeDate').text().trim()
                // console.log(codeDate)
                let imgLink = $(ele).find('img').attr('src')
                // console.log(imgLink)
                let codeLanguage = $(ele).find('.icon').text().trim()
                // console.log(codeLanguage)
            })
            
            
        }
    })

}catch (err){
    console.log(err)
}
})

app.listen(port, ()=> console.log(`Running at port ${port}`))