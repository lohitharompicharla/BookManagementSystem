const express = require("express")
const router = express.Router()

const multer = require("multer")

const auth =
require("../middleware/authMiddleware")

const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controller/bookController")

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },

    filename:(req,file,cb)=>{
        cb(
            null,
            Date.now()+"-"+file.originalname
        )
    }

})

const upload = multer({
    storage
})

router.post(
    "/add/book",
    auth,
    upload.single("image"),
    addBook
)

router.get("/books",getBooks)
router.get("/books/:id",getBookById)

router.put(
    "/books/:id",
    auth,
    updateBook
)

router.delete(
    "/books/:id",
    auth,
    deleteBook
)

module.exports = router