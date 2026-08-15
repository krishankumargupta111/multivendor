import Category from "../model/Category.js";
import Deal from "../model/Deal.js"
import HomeCategory from "../model/HomeCategory.js";
class DealService{
    async getDeals(){
        return await Deal.find().populate({path:"category"})
    }

 async createDeals(deal) {
     console.log("Received Data:", deal);
    const category = await Category.findById(deal.categoryId);



    if (!category) {
        throw new Error("Category not found");
    }

    const newDeal = new Deal({
        discount: deal.discount,
        category: category._id,
    });

    const savedDeal = await newDeal.save();

    return await Deal.findById(savedDeal._id).populate("category");
}

    async updateDeal(deal,id){
        const existingDeal=await Deal.findById(id).populate({path:"category"})
        if(existingDeal){
            return await Deal.findByIdAndUpdate(
                existingDeal._id,
                {discount:deal.discount},
                 {new:true}
            )
        }
        throw new Error("Deal not found")
    }
    async deleteDeal(id){
        const deal=await Deal.findById(id)
        if(!deal){
            throw new Error ("deal not found")
        }
        await Deal.deleteOne({_id:id})
    }
}

export default new DealService()