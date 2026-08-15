import Category from "../model/Category.js"
import Product from "../model/Product.js"

export const calaculateDiscountPercentage=(mrpPrice,sellingPrice)=>{
if(mrpPrice<=0){
    return 0
}
const discount=mrpPrice-sellingPrice
return Math.round((discount/mrpPrice)*100)
}

class ProductService{
    
    async createProduct(req,seller){
        try{
const discountPercent=calaculateDiscountPercentage(req.mrpPrice,
    req.sellingPrice)
    const category1=await this.createOrGetCategory(req.category.name,req.category,1)
    const category2=await this.createOrGetCategory( req.category2.name,req.category2,2,category1._id)
    const category3=await this.createOrGetCategory( req.category2.name,req.category3,3,category2._id)

    const product=new Product ({
title:req.title,
description:req.description,
images:req.images,
sellingPrice:req.sellingPrice,
mrpPrice:req.mrpPrice,
discountPercent,
size:req.size,
quantity:req.quantity,
color:req.color,
seller:seller._id,
category:category3._id
})
return await product.save()

        }catch(error){
            console.log(error)
throw new Error(error.message)
        }
        
    }

async createOrGetCategory(
    name,
    categoryId,
    level,
    parentId = null
) {
    let category = await Category.findOne({ categoryId });

   

    if (!category) {

           const name = categoryId
            .replace(/_/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());

        category = new Category({
            name,
            categoryId,
            level,
            parentCategory: parentId
        });

        category = await category.save();
    }

    return category;
}

async deleteProduct(productId){
try{
await Product.findByIdAndDelete(productId)
return "product deleted successfully"
}catch(error){
return new Error (error.message)
}
}

async upadateProduct(productId,upadateProductData){
    try{
const product=await Product.findByIdAndUpdate(productId,
    upadateProductData,{new:true})
    return product
    }catch(error){

    }
}



async findProductById(productId){
    try{
const product=await Product.findById(productId)
if(!product){
    throw new Error ('Product not found')
}
return product

    }catch(error){
        throw new Error(error.message)
    }
}

async searchProduct(query){
    try{
const products=await Product.find({title:new RegExp(query,"i")})
return products
    }catch(error){
throw new Error (error.message)
    }
}

async getProductsBySeller(sellerId){
    return await Product.find({seller:sellerId})
}

async getAllProducts(req){

      console.log("Request:", req);
    const filterQuery={}
    if(req.category){
        const category=await Category.findOne({categoryId:req.category})
      console.log("Found Category:", category);
        if(!category){
        return{
            content:[],
            totalpages:0,
            totalElement:0
        }
       }
 filterQuery.category=category._id.toString()
 console.log("Filter Query:", filterQuery);
    }
    if(req.color){
        filterQuery.color=req.color
    }
    if(req.minPrice && req.maxPrice){
        filterQuery.sellingPrice={$gte:req.minPrice,$lte:req.maxPrice}
    }
    if(req.minDiscount){
        filterQuery.discountPercent={$gte:req.minDiscount}
    }
    if(req.size){
        filterQuery.size=req.size
    }
    let sortQuery={}
    if(req.sort==='price_low'){
        sortQuery.sellingPrice=1
    }
     else if(req.sort==='price_high'){
        sortQuery.sellingPrice=-1
    }
    const products=await Product.find(filterQuery)
.sort(sortQuery).skip(req.pageNumber *10).limit(10)
const totalElement=await Product.countDocuments(filterQuery)
const totalpages=Math.ceil(totalElement/10) 
const res={
    content:products,
    totalpages:totalpages,
    totalElement:totalElement
}
return res
}


}

export default new ProductService();