import DealService from "../service/DealService.js"

class DealController{
    async getAllDeals(req,res){
        try{

const deals=await DealService.getDeals()
return res.status(200).json(deals)
        }catch(error){
            console.log(error)
return res.status(500).json({error:error.message})

        }
    }
    async createDeals(req,res){
        try{
const deal=req.body
const createDeal=await DealService.createDeals(deal)
return res.status(201).json(createDeal)

        }catch(error){
            console.log(error)
           return res.status(500).json({error:error.message}) 
        }
    }

    async updateDeal(req,res){
        const deal=req.body
        const {id}=req.params
        try{
const updateDeal=await DealService.updateDeal(deal,is)
return res.status(200).json(updateDeal)

        }catch(error){
            console.log(error)
           return res.status(404).json({error:error.message}) 
        }
    }
    async deleteDeals(req,res){
        try{
            const{id}=req.params
            await DealService.deleteDeal(id)
            return res.status(202).json({message:"deal delete successfully"})

        }catch(error){
                console.log(error)
           return res.status(404).json({error:error.message}) 
        }
    }

}
export default new DealController()