import * as categoryRepository from '../repositories/categoryRepository';

export async function findCategoryByName(category:string){
   return await categoryRepository.findCategoryByName(category);
}

export async function findAllCategoriesNames(){
   return await categoryRepository.findAllCategoriesNames();
}