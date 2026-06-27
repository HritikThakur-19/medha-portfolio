// ============================
// DARK MODE
// ============================
let allBlogs = [];
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("dark-mode")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});
// ==========================
// NAVBAR SCROLL EFFECT
// ==========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});
// ============================
// SCROLL TO TOP
// ============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
// ============================
// ACTIVE NAVIGATION
// ============================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});
// ============================
// LOADER
// ============================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = "0";

        setTimeout(() => {

            document.getElementById("loader").style.display = "none";

        },800);

    },1800);

});
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});
   const contactForm = document.getElementById("contact-form");



if(contactForm){

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = {

            name: contactForm.querySelector('input[type="text"]').value,

            email: contactForm.querySelector('input[type="email"]').value,

            message: contactForm.querySelector("textarea").value

        };

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {

                "Content-Type":"application/json"

            },

            body: JSON.stringify(formData)

        });

        const result = await response.json();

        alert(result.message);

    });

}
async function loadBlogs(){

    try{

        const response = await fetch("/api/blogs");

        allBlogs = await response.json();

displayBlogs(allBlogs);

        
    }

    catch(err){

        console.log(err);

    }

}

loadBlogs();
function displayBlogs(blogs){

    const container = document.getElementById("blog-container");

    container.innerHTML = "";

    blogs.forEach(blog=>{

        const date = blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString()
            : "Today";

        const words = blog.content.split(" ").length;

        const readingTime = Math.max(1, Math.ceil(words / 200));

        container.innerHTML += `

        <div class="blog-card">

            <img
                src="/uploads/${blog.image}"
                alt="${blog.title}"
                class="blog-image">

            <h3>${blog.title}</h3>

            <p class="blog-meta">
                📅 ${date} |
                ⏱️ ${readingTime} min read |
                👤 ${blog.author}
            </p>

            <p><strong>Category:</strong> ${blog.category}</p>

            <p>${blog.content.substring(0,120)}...</p>

            <a href="blog.html?id=${blog._id}" class="btn">
                Read More
            </a>

        </div>

        `;

    });

}