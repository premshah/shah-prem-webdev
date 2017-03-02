(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
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
            //console.log("client");
            return $http.post("/api/user/" + userId + "/website",website);
        }
        function  findWebsitesByUser(userId){
            return $http.get("/api/user/" + userId + "/website");
        }
        function findWebsiteById(websiteId){
            return $http.get("/api/website/" + websiteId);
        }
        function updateWebsite(websiteId, website){
            return $http.put("/api/website/" + websiteId, website);
        }
        function deleteWebsite(websiteId){
            return $http.delete("/api/website/" + websiteId);
        }
    }
}) ();
