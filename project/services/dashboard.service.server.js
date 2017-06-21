var app = require('../../express');

var nh_dashboardModel = require('../model/dashboard/dashboard.model.server');


//api
app.get('/api/nh/dashboard/:userId',fetchDashboardForUserId);
app.put('/api/nh/dashboard/:dashboardId',updateDashboard);


function fetchDashboardForUserId(req,res) {
    var userId = req.params['userId'];
    nh_dashboardModel.findDashBoardByUserId(userId)
        .then(function (dashboard) {
            res.json(dashboard);
        },function (err) {
            res.send(err);
        })
}

function updateDashboard(req,res){
    var dashboardId = req.params['dashboardId'];
    var dashboard = req.body;
    nh_dashboardModel.updateDashboard(dashboardId,dashboard)
        .then(function (dashboard) {
            res.send(dashboard);
        },function (err) {
            res.send(err);
        })
}