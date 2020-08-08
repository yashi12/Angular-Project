// import {module_app} from './module.js';
// import {configApp} from "./config.js";

import appModule from "./module.js";

// export let con =  appModule
//     .controller('FormController',ctrlFunc );

function ctrlFunc(categoriesService) {
    const vm=this;
    vm.categorieItems = categoriesService.getCategories();
   // categoriesService.getCategories()
   //      .on('data',(d)=>{
   //          console.log("d",d);
   //          vm.categorieItems = d;
   //      })
   //      .on('error', (e) => {
   //          console.error("e",e);
   //      });
    // categoriesService.getCategories()
    //     .then(function (result) {
    //         vm.categorieItems = result;
    //     })
    categoriesService.show();

    console.log("vm categories",vm.categorieItems);

}
export default ctrlFunc;