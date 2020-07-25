let EditPersonDialogModel = function () {
    this.visible = false;
};
EditPersonDialogModel.prototype.open = function (item) {
    console.log(this);
    this.item = angular.copy(item);
    this.visible = true;
};
EditPersonDialogModel.prototype.close = function () {
    this.visible = false;
};
// EditPersonDialogModel.prototype.save = function () {
//     console.log("update");
//     updateItem(this.item);
// };

var app = angular.module('categories.items', [
    'eggly.models.categories',
    'eggly.models.items',
    'categories.items.create',
    'categories.items.edit'

]);
app.config(function ($stateProvider) {
    $stateProvider
        .state('eggly.categories.items', {
            url: 'categories/:category',
            views: {
                'items@': {
                    templateUrl: 'categories/items/items.tmpl.html',
                    controller: 'ItemsListCtrl as itemsListCtrl'
                }
            }
        });
})
    .controller('ItemsListCtrl', ['$stateParams', 'ItemsModel', 'CategoriesModel',function ($stateParams, ItemsModel, CategoriesModel) {
        let itemsListCtrl = this;
        console.log(" start edit dialog");
        itemsListCtrl.editDialog = new EditPersonDialogModel();
        console.log("edit dialog");

        CategoriesModel.SetCurrentCategory($stateParams.category);

        itemsListCtrl.currentCategoryName = $stateParams.category;
        ItemsModel.getItems()
            .then(function (items) {
                itemsListCtrl.groceryItems = items;
            });
        itemsListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
        itemsListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
        itemsListCtrl.deleteItem = ItemsModel.deleteItem;

        itemsListCtrl.showDetails = function () {
        }
        itemsListCtrl.updateItem =function() {
            console.log("update");
            itemsListCtrl.changedItem = angular.copy(editPersonDialog.item);
            ItemsModel.updateItem(itemsListCtrl.changedItem);
            // returnToItems();
        }


    }])
    // .directive('createDirective', function () {
    //     return {
    //         templateUrl: 'categories/items/create/items-create-tmpl.html'
    //     };
    // });

function showDetails() {
    console.log("func")
    $('#exampleModalCenter').on('show.bs.modal', function (event) {
        console.log("button");
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('what');
        var modal = $(this)
        modal.find('.modal-title').text('Item chosen: ' + recipient.itemName)
        modal.find('.modal-body').text('Category: ' + recipient.category + "\n" + 'Date: ' + recipient.date)
        // modal.find('.modal-body input').val(recipient)
    })
}

app.directive('editPersonDialog', [function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
        },
        link: function (scope, element, attributes) {
            console.log("ele",element);
            scope.$watch('model.visible', function (newValue) {
                console.log('model.visible', newValue);
                var modalElement = element.find('.modal');
                console.log("modal element",modalElement);
                modalElement.modal(newValue ? 'show' : 'hide');
            });

            element.on('shown.bs.modal', function () {
                console.log("shown");
                scope.$apply(function () {
                    scope.model.visible = true;
                });
            });

            element.on('hidden.bs.modal', function () {
                console.log("hidden");
                scope.$apply(function () {
                    scope.model.visible = false;
                });
            });
        },
        templateUrl: 'categories/items/edit-person-dialog.html',
    };
}]);

