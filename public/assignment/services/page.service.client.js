(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage"   : createPage,
            "findPageById" : findPageById,
            "findPagesByWebsiteId" : findPagesByWebsiteId,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };
        return api;

        function createPage(websiteId, page){
            var pg = {
                _id: String(new Date().getTime()),
                name: page.pagename,
                websiteId: websiteId,
                description: page.pagedesc
            }

            pages.push(pg);
            return pg._id;
        }
        function findPagesByWebsiteId(websiteId){
            var pg = [];
            for(page in pages){
                if(pages[page].websiteId==websiteId)
                {
                    pg.push(pages[page]);
                }
            }
            return pg;
        }
        function findPageById(pageId){
            var index;
            for(page in pages){
                if(pages[page]._id==pageId)
                {
                    index = page;
                }
            }
            return pages[index];
        }
        function updatePage(pageId, page){
            var index;
            for(pg in pages){
                if(pages[pg]._id==pageId)
                {
                    index = pg;
                }
            }
            pages[index].name = page.name;
            pages[index].description = page.description;
        }
        function deletePage(pageId){
            var index;
            for(page in pages){
                if(pages[page]._id==pageId)
                {
                    index = page;
                }
            }
            pages.splice(index,1);
        }
    }

}) ();
