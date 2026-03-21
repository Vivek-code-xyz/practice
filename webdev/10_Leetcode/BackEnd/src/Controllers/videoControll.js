
// import { v2 as cloudinary } from 'cloudinary'
// import { Problem } from '../models/problem'
// import { Video } from '../models/problemVideo'

// cloudinary.config({
//     cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
//     api_key : process.env.CLOUDINARY_API_KEY,
//     api_secret : process.env.CLOUDINARY_API_SECRET
// })


// export const generateUploadSignature = async (req,res)=>{

//     try{
//         if(req.result.role !== "admin") throw new Error ("Permission Denied")

//         const {problemId}  = req.params
//         const userId = req.result._id

//         if(!problemId || !userId) throw new Error("ProblemId and UserId are required")

//         const problem = await Problem.findById(problemId)

//         if(!problem) throw new Error("Problem Not Found")   

//         const timestamp = Math.round(new Date().getTime() / 1000);
//         const publicId = `problem_videos/${problemId}_${userId}_${timestamp}`;

//         const uploadParams = {
//             timestamp,
//             public_id: publicId,
            
//         }

//         const signature = cloudinary.utils.api_sign_request(uploadParams, process.env.CLOUDINARY_API_SECRET)

//         res.status(200).json({
//             signature,
//             publicId,
//             timestamp,
//             cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//             apiKey: process.env.CLOUDINARY_API_KEY,
//             upload_url : `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`
//         })

//     }catch(err){
//         res.status(400).json({error: err.message + "failed to generate upload credentials" })
//     }
// }

// export const saveVideoMetaData = async (req,res)=>{
//     try{
//         if(req.result.role !== "admin") throw new Error ("Permission Denied")
//         const {problemId,cloudinaryPublicId,secureUrl,duration,description} = req.body
//         if(!problemId || !cloudinaryPublicId || !secureUrl ||!duration) throw new Error("All Fields are Required")
//         const userId = req.result._id
        

//         const cloudinaryResource = await cloudinary.api.resource(cloudinaryPublicId,{resource_type:"video"})
//         if(!cloudinaryResource) throw new Error("Cloudinary Resource Not Found")

//         const ExistingVideo = await Video.findOne({problemId,userId,cloudinaryPublicId})

//         if(ExistingVideo) throw new Error("Video Already Exists")


//         const tumbnailUrl = cloudinary.url(cloudinaryResource.public_id, { resource_type: 'image', format: 'jpg',transformation: [
//             { width: 400, height: 225, crop: 'fill' },{quality:"auto"},{start_offset:"auto"},{end_offset:"auto"}
//           ] })

//         const video = new Video({
//             problemId,
//             userId,
//             cloudinaryPublicId,
//             secureUrl,
//             tumbnailUrl,
//             duration,
//             description
//         })

//         await video.save()

//         res.status(200).json({message: "Video MetaData Saved Successfully"})

//     }catch(err){
//         res.status(400).json({error: err.message + "failed to save video metadata" })
//     }
// }

// export const deleteVideo = async (req,res)=>{
//     try{
//         if(req.result.role !== "admin") throw new Error ("Permission Denied")
//         const {videoId} = req.params

//         const video = await Video.findById(videoId)

//         if(!video) throw new Error("Video Not Found")   
//         await cloudinary.uploader.destroy(video.cloudinaryPublicId,{resource_type:"video",invalidate:true})
//         await video.deleteOne()
//         res.status(200).json({message: "Video Deleted Successfully"})

//     }catch(err){
//         res.status(400).json({error: err.message + "failed to delete video" })
//     }
// }