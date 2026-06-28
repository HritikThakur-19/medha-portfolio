const params = new URLSearchParams(window.location.search);

const id = params.get("id");

fetch(`/api/blogs/${id}`)
.then(res => res.json())
.then(blog => {

    // Cover Image
    document.getElementById("blog-image").src = blog.image;
    document.getElementById("blog-image").alt = blog.title;

    // Title
    document.getElementById("title").textContent = blog.title;

    // Author
    document.getElementById("author").textContent =
        "👤 " + blog.author;

    // Category
    document.getElementById("category").textContent =
        "🏷️ " + blog.category;

    // Date
    const date = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString()
        : "Today";

    document.getElementById("date").textContent =
        "📅 " + date;

    // Reading Time
    const words = blog.content.replace(/<[^>]*>/g, "").split(" ").length;

    const readingTime = Math.max(1, Math.ceil(words / 200));

    document.getElementById("reading-time").textContent =
        "⏱️ " + readingTime + " min read";

    // Blog Content
    document.getElementById("content").innerHTML =
        blog.content;

    // ===========================
    // Related Blogs
    // ===========================
    fetch("/api/blogs")
    .then(res => res.json())
    .then(blogs => {

        const related = blogs
            .filter(item => item._id !== blog._id)
            .slice(0, 3);

        const container = document.getElementById("related-blogs");

        container.innerHTML = "";

        related.forEach(item => {

            container.innerHTML += `

            <div class="blog-card">

                <img
                    src="${item.image}"
                    class="blog-image"
                    alt="${item.title}">

                <h3>${item.title}</h3>

                <p>
                    ${item.content.replace(/<[^>]*>/g, "").substring(0,80)}...
                </p>

                <a href="blog.html?id=${item._id}" class="btn">
                    Read More
                </a>

            </div>

            `;

        });

    });

})
.catch(err => console.error(err));