import CategoryService from "../service/CategoryService.js";
class category{
async getAllCategories  (req, res) {
  try {
    const categories = await CategoryService.getAllCategories();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }}}
export default new category()