(function () {
    angular
        .module("NH")
        .controller("nh_savedArticleController",nh_savedArticleController);

    function nh_savedArticleController(currentUser,$location,$routeParams,nh_articleService,nh_userService) {

        var model = this;
        model.userId = currentUser._id;
        model.articles = [];
        model.selectArticle = selectArticle;
        model.username = $routeParams['username'];

        function init1() {
            if (model.username !==null && typeof model.username !== 'undefined'){
                return nh_userService.findUserByUsername(model.username)
                    .then(function (user) {
                        model.userId = user._id;
                    })
            }
        }

        function init2() {
            nh_articleService.fetchArticlesByUserId(model.userId)
                .then(function (articles) {
                    model.articles = articles;
                },function (err) {
                    model.message = "Error while fetching saved articles";
                })
        }

        if(model.username!==null && typeof model.username !=='undefined'){
            init1()
                .then(function () {
                    init2();
                })
        }
        else {
            init2();
        }



        function selectArticle(article) {
            $location.url("/article/"+article._id);
        }
    }
})()