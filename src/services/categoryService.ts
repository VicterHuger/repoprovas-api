import * as categoryRepository from '../repositories/categoryRepository';
export async function findCategoryByName(category:string){
   return await categoryRepository.findCategoryByName(category);
}