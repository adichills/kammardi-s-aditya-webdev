/**
 * Created by Aditya on 1/19/2018.
 */
var app = require('../../express');
var request=require('request');



app.get('/polisapi/accessToken/:code',fetchAccessToken);
app.get('/polisapi/authenticate/:token',authenticate);
app.get('/polisapi/createList/:token/:listName',createList);
app.get('/polisapi/fetchAllLists/:token',fetchAllLists);
app.get('/polisapi/createContact/:token/:listId',createContact);
app.post('/polisapi/createNewContact/:token/:listId',createNewContact);

function createNewContact(req,res) {
    var token = req.params['token'];
    var listId = req.params['listId'];
    var data = req.body;
    var options = {
        url : 'https://api.sandbox.polisapp.com/v1/contacts',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body : JSON.stringify({
            data:{
                listId:listId,
                profile:{
                    name:data.name,
                    address:data.address,
                    email:data.email,
                    phone:data.phone
                },
                fields:data.fields


            }
        })
    }
    callPolisWithAccessToken(options,function (response) {
        res.json(response);
    })

}


function fetchAllLists(req,res) {
    var token = req.params['token'];
    var options = {
        url: 'https://api.sandbox.polisapp.com/v1/lists?filter=/data/organizationId+eq+"65576faf-4937-4871-8029-bb6f4e902f5f"&limit=100&skip=0&sort=["data/name","ASC"]',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    };
    callPolisWithAccessToken(options,function (response) {
        res.json(response.data)
    })
}

function createList(req,res) {
    var token = req.params['token'];
    var listName = req.params['listName'];
    var options = {
        url:'https://api.sandbox.polisapp.com/v1/lists',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body: JSON.stringify(
        { 'data': {
            'name': listName,
            'organizationId': '65576faf-4937-4871-8029-bb6f4e902f5f'
        }})
    }

    callPolis(options,function (response) {
        res.json(response);
    })
}

function authenticate(req,res) {
    var token = req.params['token'];
    var options ={
        url:'https://api.sandbox.polisapp.com/v1/integrations/credentials',
        // '?clientId=rEQ9rgzCwE6Zs1tAKJqw8PhFmyGDkZWc'
        // +'&organizationId=65576faf-4937-4871-8029-bb6f4e902f5f'+'&accessToken='+token,
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body: JSON.stringify(
            { 'data': {
            'clientId': 'rEQ9rgzCwE6Zs1tAKJqw8PhFmyGDkZWc',
            'organizationId': '65576faf-4937-4871-8029-bb6f4e902f5f',
            'accessToken': token
        }})
    };

    callPolisWithAccessToken(options,function (response) {
        res.json(response);
    })

}



function callPolis(url,callback){
    return request.post(url,function (err,res,body) {
        if(err){
            callback(err);
        }
        else{
            callback(body);
        }
    })
}


function callPolisWithAccessToken(url,callback){
    return request.post(url,function (err,res,body) {
        if(err){
            callback(err);
        }
        else if(res.statusCode === 201 || res.statusCode===200){
            callback(body);
        }
    })
}

function callback(data) {
    return data;
}

function fetchAccessToken(req,res) {
    var code = req.params['code'];
    var url = 'https://api.sandbox.polisapp.com/auth/oauth2/token?client_id=rEQ9rgzCwE6Zs1tAKJqw8PhFmyGDkZWc&client_secret=fhhKDJls7krI1NfQ6SELciigNKtl9Gll&code='+code+'&grant_type=authorization_code';
    callPolis(url,function (response) {
        var token = JSON.parse(response);
        res.json(token);
    })


}

function createContact(req,res) {
    var token = req.params['token'];
    var id = req.params['listId'];
    var url = 'https://api.sandbox.polisapp.com/v1/contacts';
    var contactDetails = req.body;
    var payload = {
      listId:id,
      profile: {
          "name": contactDetails.name,
          "address": contactDetails.address

      },
      fields:contactDetails.fields

    };
    var options = {
        url: url,
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body: JSON.stringify(
            {
                "data": {
                    "listId": "378bd796-de4b-48cf-bd3c-6bb8b359610b",
                    "profile": {
                        "name": {
                            "first": "Johnny",
                            "last": "Walker",
                            "title": "Mr"
                        },
                        "address": {
                            "country": "United States of America",
                            "position": {
                                "type": "Point",
                                "coordinates": [
                                    -71.067513,
                                    42.3520436
                                ]
                            },
                            "formatted": "100 Boylseton Street, Boston, MA 02266, USA",
                            "streetAddress": {
                                "formatted": "100 Boylseton Street",
                                "number": "100",
                                "route": "Boylseton Street"
                            },
                            "postalCode": "02266",
                            "state": "Massachusettes",
                            "county": "Suffolk County",
                            "city": "Boston",
                            "neighborhood": "Downtown Boston"
                        },
                        "email": "john@testemail.com",
                        "phone": [
                            "9781234568",
                            "3171234568",
                            "2631234568"
                        ],
                        "gender": "m",
                        "languages": [
                            "en"
                        ],
                        "birthdate": "1987-09-03",
                        "age": 30
                    },
                    "notes": "test notes",
                    "fields": {
                        "dogliker": "true",
                        "bestpet": "Cat",
                        "buypet": [
                            "Horse",
                            "Snake"
                        ],
                        "catlikeness": 4,
                        "mothername": "Jane Doe"
                    }
                }
            }
        )
    };

    callPolisWithAccessToken(options,function (response) {
        res.json(response);
    })


}