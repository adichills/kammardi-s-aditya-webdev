/**
 * Created by Aditya on 1/18/2018.
 */
(function () {
   angular
       .module('PolisApiTest')
       .controller('polisApiController',polisApiController);

   function polisApiController($http,$routeParams,$location) {
       var model = this;

       model.fetchAccessToken = fetchAccessToken;
       model.authenticate = authenticate;
       model.createList = createList;
       model.fetchAllLists = fetchAllLists;
       model.createContact = createContact;
       model.createNewContact = createNewContact;

       function fetchAllLists(token) {

       }

       function createContact(token) {
           $http.get('/polisapi/createContact/'+token+ '/378bd796-de4b-48cf-bd3c-6bb8b359610b')
               .then(function (response) {
                   console.log(response);
               })
       }

       function createNewContact(listId) {
        var token = $routeParams['token'];
        var address = {
            country:model.country,
            "position": {
                "type": "Point",
                "coordinates": [
                    -71.067513,
                    42.3520436
                ]
            },
            streetAddress: {
                formatted : model.number + " " + model.route,
                number: model.number,
                route: model.route
            },
            postalCode : model.zipcode,
            state: model.state,

            city:model.city,

            formatted:model.number + " " + model.route + model.city + " " + model.state + " " + model.zipcode + " " + model.country
        };
        var profile = {
            name:{
                first:model.firstName,
                last:model.lastName,
                middle:model.middleName
            },
            address: address,
            fields:{
                catperson:"yes"
            },
            email: model.email,
            phone:[model.phone]
        };
        $http.post("/polisapi/createNewContact/" + token + "/" + listId,profile)
            .then(function (response) {
                model.contact = response.data;
            })


       }

       function createList(token,listName) {
           if(typeof token ==='undefined'){
               token = $routeParams['token']
           }
           $http.get('/polisapi/createList/'+token +'/' + listName)
               .then(function (response) {
                   var listObject = JSON.parse(response.data);
                   model.listDetails = JSON.stringify(listObject);
               })
       }


       
       function fetchAccessToken(accessCode) {

           $http.get('/polisapi/accessToken/'+accessCode)
               .then(function (response) {
                   model.accessToken = response.data.access_token;
                   console.log(model.accessToken);
               })
       }

       function authenticate(accessToken) {
           if(typeof accessToken !== 'undefined'){
               $http.get('/polisapi/authenticate/'+accessToken)
                   .then(function (response) {
                       console.log('Authenticated');
                   })
           }
       }


   }
})();
