(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            "createWebsite"   : createWebsite,
            "findWebsiteById" : findWebsiteById,
            "findWebsitesByUser" : findWebsitesByUser,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite
        };
        return api;

        function createWebsite(userId, website){
            var wb = {
                _id: String(new Date().getTime()),
                name: website.websitename,
                developerId: userId,
                description: website.websitedescription
            }

            websites.push(wb);
            return wb._id;
        }
        function  findWebsitesByUser(userId){
            wb = [];
            for (website in websites){
                if(websites[website].developerId==userId)
                {
                    //console.log(websites[website]);
                    wb.push(websites[website]);
                }
            }
            return wb;
        }
        function findWebsiteById(websiteId){
            var index;
            for (website in websites){
                if(websites[website]._id==websiteId)
                {
                    index = website;
                }
            }
            var wbsite = websites[index];
            return wbsite;
        }
        function updateWebsite(websiteId, website){
            var index;
            for (wbs in websites){
                if(websites[wbs]._id==websiteId)
                {
                    index = wbs;
                }
            }
            //console.log(index);
            //console.log(website.name);
            websites[index].name = website.name;
            websites[index].description = website.description;
        }
        function deleteWebsite(websiteId){
            var index;
            for (website in websites){
                if(websites[website]._id==websiteId)
                {
                    index = website;
                }
            }
            websites.splice(index,1);
        }
    }
}) ();
