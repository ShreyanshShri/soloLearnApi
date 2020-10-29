# -soloLearnApi
A SoloLearn API

## A simple API to get the following info : 

* Info about a user (Code Bits, skills, level, XP [ followers and following info not avaliable ])
* List of all codes of code playground for all the pages(trending, most popular, most recent) with likes and author info
* Leaderboard Info with language filter
* List of all QNA of QnA page for all the pages(trending, most popular, most recent) with likes and author info
* All the details of a QnA thread including answers and posted By..


## Getting info about a user

Make a get request on https://sololearn-api.herokuapp.com/userInfo/{sololearn_id} \
It will return you a json object. 

```
[{
    userBasicInfo: {
        username: user_name,
        userLevel: user_level,
        userXp: user_tottal_xp,
        userProfilePic: user_profile_pic_url
    },
    coursesXpInfo: user_cources_list,
    codeUpvotesInfo: user_codes_list,
    coursesComplted: user_certificates_list 
}]
```

## Fetching data of code playground 

Make a get request to https://sololearn-api.herokuapp.com/codeplayground/{ordering}/{language}/{page} \
Ordering accepts 
* Trending 
* MostRecent
* MostPopular 
(If you want to get codes of all the languages, Enter 'All')

It will return an array of objects. 

```
[{
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
}]
```

## Fetching data of Leaderboard

Make a get request to https://sololearn-api.herokuapp.com/leaderboard <br>

It will return you the following array

```
[{
    username: username,
    xp: XPs,
    rank: rank
}]
```

## Fetching data of Leaderboard (with language filter) 

Make a get request to https://sololearn-api.herokuapp.com/leaderboard/{langFilter} <br>

Filters you can use
* HTML
* Python
* CPlusPlus
* Java
* JavaScript
* CSharp
* C
* SQL
* machine-learning
* data-science
* PHP 
* CSS
* Ruby
* jQuery
* fullstack
* react
* Swift

It will return you the following data

```
[{
    username: username,
    xp: XPs,
    rank: rank,
    lang: lang
}]
```

## Fetching data of QnA page

Make a get request to https://sololearn-api.herokuapp.com/qnaInfo/{ordering}/{page} \
Again Ordering accepts 
* Trending 
* MostRecent
* MostPopular

Again it will return an array of objects

```
[{
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
}]
```

## Fetching data of a given QnA thread (with all the answers) 

Make a get request to https://sololearn-api.herokuapp.com/qnaInfo/thread/id/{questionId} \
You can get the question ID from the data we just fetched of QnA page (Each question has an ID) or simply go to the question, copy the link, get the numeric value and paste it

This one will return a object with two objects... One for question Info and other is an array of objects for all the answers in that thread... 

```
  {
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
  answersInfo: [{
                    answerDetails: {
                        answer: answer,
                        upvotes: upvotesOnAns,
                        postedAt: ansPostedAt
                    }, userDetails: {
                        userName: answeredBy,
                        userimg: answererImg
                    }
                }]
}
```

### And now you are ready to create your own apps with realtime data... 

### Hope you enjoyed... ( This was my first README.md so I dont know how to write it xD, But I tried my best to explain everything)

## Thanks for reading... 🙃
