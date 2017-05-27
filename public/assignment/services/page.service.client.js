/**
 * Created by Aditya on 5/26/2017.
 */
(function () {
    angular
        .module('WAM')
        .service('pageService', pageService);

    function pageService() {

        this.findpageById = findpageById;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.deletepage = deletepage;
        this.createpage = createpage;
        this.updatepage = updatepage;

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }

        ];

        function findPageByWebsiteId(websiteId) {
            var results = [];

            for(var v in pages) {
                if(pages[v].websiteId === websiteId) {
                    pages[v].created = new Date();
                    pages[v].accessed = new Date();
                    results.push(pages[v]);
                }
            }

            return results;
        }


        function updatepage(pageId,page) {
            for(var i in pages){
                if(pages[i]._id === pageId){
                    pages[i].name = page.name;
                    pages[i].description = page.description;
                }
            }
        }

        function createpage(page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function deletepage(pageId) {
            var page = findpageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findpageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        
    }
})();