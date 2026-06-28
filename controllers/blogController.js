const Blog = require("../models/Blog");

// GET ALL BLOGS
const getBlogs = async (req, res) => {

    try {

        const blogs = await Blog.find();

        res.json(blogs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// CREATE TEST BLOG
const createBlog = async (req, res) => {

    try {

        const blog = new Blog({

            title: "My First Blog",

            author: "Medha Kaushal",

            category: "Life",

            content: "This is my first MongoDB blog."

        });

        await blog.save();

        res.send("✅ Blog Saved!");

    } catch (error) {

        res.status(500).send(error.message);

    }

};
const addBlog = async (req, res) => {

    try {
        console.log(req.file);

        const blog = new Blog({

            title: req.body.title,

            author: req.body.author,

            category: req.body.category,

            content: req.body.content,

            image: req.file ? req.file.path : ""

        });

        await blog.save();

        res.status(201).json({

            success: true,

            message: "Blog Published Successfully!"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
const updateBlog = async (req, res) => {

    try {

        const updateData = {

    title: req.body.title,

    author: req.body.author,

    category: req.body.category,

    content: req.body.content

};

// Update image only if a new one is uploaded
if (req.file) {

    updateData.image = req.file.filename;

}

const updatedBlog = await Blog.findByIdAndUpdate(

    req.params.id,

    updateData,

    { new: true }

);

        if (!updatedBlog) {

            return res.status(404).json({

                success: false,

                message: "Blog not found"

            });

        }

        res.json({

            success: true,

            message: "Blog Updated Successfully",

            blog: updatedBlog

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
const deleteBlog = async (req, res) => {

    try {

        const deleted = await Blog.findByIdAndDelete(req.params.id);

        if (!deleted) {

            return res.status(404).json({

                success: false,

                message: "Blog not found"

            });

        }

        res.json({

            success: true,

            message: "Blog Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};const getBlogById = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }

        res.json(blog);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getBlogs,
    createBlog,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogById

};