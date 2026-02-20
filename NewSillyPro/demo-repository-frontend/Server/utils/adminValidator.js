export function validateBlog(blogInfo) {
    if(!blogInfo.title || !blogInfo.content || !blogInfo.summary ){
        const err = new Error("Provide all necessary details")
        err.statusCode = 400
        throw err
    }
    if(blogInfo.title.length < 5 || blogInfo.title.length > 100) {
        const err = new Error("title should 5-100 chars long")
        err.statusCode = 403
        throw err
    }
    if(blogInfo.content.length < 5 || blogInfo.content.length > 10000) {
        const err = new Error("content should 5-10000 chars long")
        err.statusCode = 403
        throw err
    }
    if(blogInfo.summary.length < 10 || blogInfo.summary.length > 100) {
        const err = new Error("summary should 10-100 chars long")
        err.statusCode = 403
        throw err
    }
}