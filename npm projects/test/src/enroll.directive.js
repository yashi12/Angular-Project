// import {module_app} from './module.js';

import {con} from "./controller.js";
import {configApp} from "./config.js";
//
// configApp
//     .directive('enrollNum', enrollNum);

enrollNum.$inject = ['$q', '$timeout'];

function enrollNum($q, $timeout) {

    let directive = {
        require: 'ngModel',
        link: link,
    };
    return directive;

    function link(scope, elm, attrs, ctrl) {

        let enrollNumberList = [18803033, 18803034, 18803035];

        ctrl.$asyncValidators.enrollNumber = function (modelValue, viewValue) {

            if (ctrl.$isEmpty(modelValue)) {
                return $q.resolve();
            }
            let def = $q.defer();
            $timeout(function () {
                if (enrollNumberList.indexOf(modelValue) === -1) {
                    def.resolve();
                } else {
                    def.reject();
                }
            }, 5000);

            return def.promise;
        };

    }
}

export default enrollNum;