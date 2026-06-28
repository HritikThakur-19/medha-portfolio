// ==========================
// CHECK LOGIN
// ==========================

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}
const quill = new Quill("#editor", {

    theme: "snow",

    placeholder: "Write your blog...",

    modules: {

        toolbar: [

            [{ header: [1, 2, 3, false] }],

            ["bold", "italic", "underline"],

            [{ list: "ordered" }, { list: "bullet" }],

            ["link", "blockquote", "code-block"],

            ["clean"]

        ]

    }

});
/*const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}*/
const form = document.getElementById("blogForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "title",
        document.getElementById("title").value
    );

    formData.append(
        "author",
        document.getElementById("author").value
    );

    formData.append(
        "category",
        document.getElementById("category").value
    );

    formData.append(
        "content",
        quill.root.innerHTML
    );

    const image = document.getElementById("image");

    if (image.files.length > 0) {
        formData.append("image", image.files[0]);
    }

    try {

        const blogId = document.getElementById("blogId").value;

const url = blogId
    ? `/api/blogs/${blogId}`
    : "/api/blogs";

const method = blogId
    ? "PUT"
    : "POST";

const response = await fetch(url,{

    method,

    headers:{

        Authorization: token

    },

    body:formData

});
        const data = await response.json();

        alert(data.message);
document.getElementById("blogId").value = "";

loadAdminBlogs();
        form.reset();

    } catch (error) {

        console.error(error);

        alert("Error publishing blog.");

    }

});
async function loadAdminBlogs() {

    const response = await fetch("/api/blogs");

    const blogs = await response.json();

    document.getElementById("blog-count").textContent = blogs.length;

    const container = document.getElementById("admin-blog-list");

    container.innerHTML = "";

    blogs.forEach(blog => {

        container.innerHTML += `

        <tr>

            <td>

                <img
                    src="${blog.image}"
                    class="admin-image">

            </td>

            <td>${blog.title}</td>

            <td>${blog.category}</td>

            <td>${blog.author}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editBlog('${blog._id}')">

                    ✏️ Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteBlog('${blog._id}')">

                    🗑 Delete

                </button>

            </td>

        </tr>

        `;

    });

}


loadAdminBlogs();
async function deleteBlog(id){

    if(!confirm("Delete this blog?")) return;

    await fetch(`/api/blogs/${id}`,{

    method:"DELETE",

    headers:{

        Authorization: token

    }

});
    loadAdminBlogs();

}
async function editBlog(id){

    const response = await fetch(`/api/blogs/${id}`,{

    headers:{

        Authorization: token

    }

});

    const blog = await response.json();

    document.getElementById("blogId").value = blog._id;

    document.getElementById("title").value = blog.title;

    document.getElementById("author").value = blog.author;

    document.getElementById("category").value = blog.category;

    quill.root.innerHTML = blog.content;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}
document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

});
async function loadMessages(){

    const response = await fetch("/api/contact",{

    headers:{

        Authorization: token

    }

});

    const messages = await response.json();

    document.getElementById("message-count").textContent = messages.length;

    const container = document.getElementById("message-list");

    container.innerHTML = "";

    messages.forEach(message => {

        container.innerHTML += `

        <tr>

            <td>${message.name}</td>

            <td>${message.email}</td>

            <td>${message.message}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteMessage('${message._id}')">

                    🗑 Delete

                </button>

            </td>

        </tr>

        `;

    });

}
loadMessages();
async function deleteMessage(id){

    if(!confirm("Delete this message?")) return;

    await fetch(`/api/contact/${id}`,{

        method:"DELETE"

    });

    loadMessages();

}