(function () {

    function MainCtrl ($scope) {
        $scope.items = [{
            name: 'Scuba Diving Kit',
            id: 7297510
        },{
            name: 'Snorkel',
            id: 20278916
        },{
            name: 'Wet Suit',
            id: 2389017
        },{
            name: 'Beach Towel',
            id: 1000983
        }];
    }

    angular
        .module('app', [])
        .controller('MainCtrl', MainCtrl);

})();