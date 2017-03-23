(function () {
    angular
        .module('wamDirectives', [])
        .directive('wamSortable', sortableDir);

    function sortableDir(WidgetService) {
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
                    WidgetService.reorderWidget(pageId,startIndex,endIndex);
                    console.log([startIndex, endIndex]);
                }
            });
        }
        return {
            link: linkFunc
        };
    }
})();
