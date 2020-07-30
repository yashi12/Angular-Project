angular
    .module('categories')
    .controller('CategoriesController',CategoriesController);

CategoriesController.$inject = ['CategoriesModel'];

function CategoriesController(CategoriesModel) {
    let vm = this;
    CategoriesModel.getCategories()
        .then(function (result) {
            vm.categorieItems = result;
        })
}