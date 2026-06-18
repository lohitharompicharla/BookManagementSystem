const Book = require("../models/Book")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

exports.addBook = async(req,res)=>{

try{

const result =
await cloudinary.uploader.upload(
    req.file.path,
    {
        folder:"books"
    }
)

const book = await Book.create({
    title:req.body.title,
    author:req.body.author,
    price:req.body.price,
    description:req.body.description,
    coverImage:result.secure_url
})

res.status(201).json(book)

}catch(err){
    console.log(err)

    res.status(500).json({
        error: err.message
    })
}

}

exports.getBooks = async(req,res)=>{
    const books = await Book.find()
    res.json(books)
}

exports.getBookById = async(req,res)=>{
    const book =
    await Book.findById(req.params.id)

    res.json(book)
}

exports.updateBook = async(req,res)=>{

const book =
await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
)

res.json(book)

}

exports.deleteBook = async(req,res)=>{

await Book.findByIdAndDelete(
    req.params.id
)

res.json({
    message:"Book Deleted"
})

}
