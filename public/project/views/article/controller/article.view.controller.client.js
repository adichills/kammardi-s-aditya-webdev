(function () {
    angular
        .module("NH")
        .controller("nh_savedArticleController",nh_savedArticleController)
        .controller("nh_publishedArticleController",nh_publishedArticleController);

    function nh_savedArticleController(currentUser,$location,$routeParams,nh_articleService,nh_userService) {

        var model = this;
        model.userId = currentUser._id;
        model.articles = [];
        model.mode = 'Saved';
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

    function nh_publishedArticleController(currentUser,$location,$routeParams,nh_articleService,nh_userService) {
        var model = this;
        model.userId = currentUser._id;
        model.articles = [];
        model.mode = 'Published';
        model.username = $routeParams['username'];
        model.selectArticle = selectArticle;
        model.createArticle = createArticle;
        model.showCreateArticle = true;

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

        function createArticle() {
            var article = {};
            article._user = model.userId;
            article.articleType = "PUBLISHER";
            nh_articleService.saveArticle(article)
                .then(function (newArticle) {
                    $location.url("/publisher/article/edit/"+newArticle._id);
                })
        }

        function selectArticle(article) {
            $location.url("/article/"+article._id);
        }




    }
})()