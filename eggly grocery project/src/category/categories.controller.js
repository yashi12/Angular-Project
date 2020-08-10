// angular
//     .module('categories')
//     .controller('CategoriesController',CategoriesController);
// import 'ngstorage';
CategoriesController.$inject = ['categoriesService','$localStorage'];

function CategoriesController(categoriesService,$localStorage) {
    console.log(" category controller func");
    let vm = this;
    if ($localStorage.category) {
        vm.categorieItems = $localStorage.category;
    }
    else{
        categoriesService.getCategories()
            .then(function (result) {
                vm.categorieItems = result;
                $localStorage.category = vm.categorieItems;
                console.log("vm inside",vm.categorieItems);
                console.log("promise result",result);
                categoriesService.getCategories();
            });
        console.log("vm",vm.categorieItems);
    }

}

export default CategoriesController;

console.log("category controller");