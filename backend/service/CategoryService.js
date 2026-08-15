import Category from "../model/Category.js";

class CategoryService {
  async getAllCategories() {
    const categories = await Category.find();

    console.log("Categories:", categories);
    
    return categories;
}
}

export default new CategoryService();