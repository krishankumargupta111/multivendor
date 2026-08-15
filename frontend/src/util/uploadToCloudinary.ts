export const uploadToCloudinary=async(file:any)=>{
    const cloud_name="dhtv41wqg"
    const upload_preset="helloBazar"

    const url=`https://api.cloudinary.com/v1_1/${cloud_name}/upload`
const data=new FormData()

data.append("file",file)
data.append("upload_preset",upload_preset)
data.append("cloud_name",cloud_name)
    const res=await fetch(url,{
        method:"POST",
        body:data
    })

    const fileData=await res.json()

    console.log("imgae url",fileData.url)
    return fileData.url

}