angular.module('categories.items',[
    'eggly.models.categories',
    'eggly.models.items',
    'categories.items.create',
    'categories.items.edit'
    // 'modal'

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('eggly.categories.items',{
                url:'categories/:category',
                views:{
                    'items@':{
                        templateUrl:'categories/items/items.tmpl.html',
                        controller:'ItemsListCtrl as itemsListCtrl'
                    }
                }
            });
    })
    .controller('ItemsListCtrl',function ($stateParams,ItemsModel,CategoriesModel) {
        let itemsListCtrl= this;

        CategoriesModel.SetCurrentCategory($stateParams.category);

        itemsListCtrl.currentCategoryName = $stateParams.category;
        ItemsModel.getItems()
            .then(function (items) {
                itemsListCtrl.groceryItems =items;
            });
        itemsListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
        itemsListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
        itemsListCtrl.deleteItem = ItemsModel.deleteItem;

        itemsListCtrl.showDetails = function () {

        }
    });
function showDetails() {
    console.log("func")
    $('#exampleModalCenter').on('show.bs.modal', function (event) {
        console.log("button");
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('what');
        // var recipient = button.data('whatever.itemName') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('Item chosen: ' + recipient.itemName)
        modal.find('.modal-body').text('Category: '+recipient.category +"\n"+ 'Date: ' +recipient.date )
        // modal.find('.modal-body input').val(recipient)
    })
}
