# -soloLearnApi
A SoloLearn API

## A simple API to get the following data: 

* Info about a user (Code Bits, skills, level, XP [ followers and following info not avaliable ])
* List of all codes of code playground for all the pages(trending, most popular, most recent) with likes and author info
* List of all QNA of QnA page for all the pages(trending, most popular, most recent) with likes and author info
* All the details of a QnA thread including answers and posted By..


## How to get info about a user

Make a get request on https://sololearn-api.herokuapp.com/userInfo/{sololearn_id}\
It will return data in json format...something like this

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

Now you can iterate through each of the objects of the array and get data.

## How to get data of code playground 

Make a get request to https://sololearn-api.herokuapp.com/codeplayground/{ordering}/{language}/{page}\
Ordering accepts 
* Trending 
* MostRecent
* MostPopular
If you want to get codes of all the languages, Enter 'All'

It will give you following data

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

Again you can iterate through each of the code objects and get all data

## How to get data of QnA page

Make a get request to https://sololearn-api.herokuapp.com/qnaInfo/{ordering}/{page}\
Again Ordering accepts 
* Trending 
* MostRecent
* MostPopular

It will return you following data

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

As always you can iterate through each of the objects and get all data xD

## How to get data of a QnA thread with all the answers

Make a get request to https://sololearn-api.herokuapp.com/qnaInfo/thread/id/{questionId}\
You can get the question ID from the data we just fetched of QnA page (Each question has an ID) or simply go to the question, copy the link, get the numeric value and paste it

It will give you following data

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

Now again you can simply get data about the question but for answers it will send you an array so again you have to iterate thorugh each of the objects on the array and then you can easily get data for each answer.

### Hope you enjoyed... ( This was my first README.md so I dont know how to write it xD, But I tried my best)

## Thank you for reading...
