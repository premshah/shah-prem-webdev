(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir($http) {
        function linkFunc(scope, element, attribute) {
            var startIndex = -1;
            var endIndex = -1;
            var pageId = attribute.pgid;
            //console.log(pageId);
            element.sortable({
                axis: 'y',
                scroll: true,
                start: function (event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function (event, ui) {
                    endIndex = ui.item.index();
                    $http.put("/page/" + pageId + "/widget?initial=" + startIndex + " &final=" + endIndex);
                    console.log([startIndex, endIndex]);
                }
            });
        }
        return {
            link: linkFunc
        };
    }
})();
