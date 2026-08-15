import HomeCategory from "../model/HomeCategory.js";

class  HomeCategoryService{

async getAllHomeCategories(){
    return await HomeCategory.find()
}

async createHomeCategory(homeCategory){
    return await HomeCategory.create(homeCategory)
}

async createCategories(homeCategories){
    const existingCategories=await HomeCategory.find()
    if(existingCategories.length==0){
        return await HomeCategory.insertMany(homeCategories)
    }
    return existingCategories

}

async updateHomeCategory(category,id){
    const existingCategory=await HomeCategory.findById(id)
    if(!existingCategory){
        throw new Error("category not found")
    }

    return await HomeCategory.findByIdAndUpdate(existingCategory._id,
        category,
        {new:true}
    )
}


}
export default new HomeCategoryService()