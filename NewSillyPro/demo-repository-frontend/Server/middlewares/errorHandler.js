import express from 'express'

export default function errorHandler(err,req,res,next){
    res.status(err.statusCode).json({
        Status : "Failed",
        Message : err.message
    })
}