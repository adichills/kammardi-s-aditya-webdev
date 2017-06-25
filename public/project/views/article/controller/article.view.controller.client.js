(function () {
    angular
        .module("NH")
        .controller("nh_savedArticleController",nh_savedArticleController)
        .controller("nh_publishedArticleController",nh_publishedArticleController)
        .controller("nh_newsMediaArticleController",nh_newsMediaArticleController);

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
            nh_articleService.fetchArticlesByUserId(model.userId,'NEWS')
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
            nh_articleService.fetchArticlesByUserId(model.userId,'PUBLISHER')
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

    function nh_newsMediaArticleController(currentUser,$location,$routeParams,nh_newsMediaService,nh_userService) {

        var model = this;
        model.newsMediaId = $routeParams['newsMediaId'];
        model.sortBy = $routeParams['sortBy'];
        model.mode = $routeParams['name'];

        model.selectArticle =  selectArticle;

        function init() {
            fetchArticlesByNewsMediaId(model.newsMediaId,model.sortBy);
        }
        init();

        function fetchArticlesByNewsMediaId(newsMediaId,sortBy) {
            nh_newsMediaService.fetchArticlesByNewsMediaId(newsMediaId,sortBy)
                .then(function (articlesObject) {
                    model.articles = articlesObject.articles;
                })
        }

        function selectArticle(article) {
            nh_newsMediaService.setSelectedArticle(article);
            $location.url('/article/selectedArticle');
        }
    }
})()