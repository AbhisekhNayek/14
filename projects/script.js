// jQuery: Toggle menu and scroll effects
$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

// Tab visibility title and favicon change
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Abhisekh Nayek";
        $("#favicon").attr("href", "/assets/images/geeks.png");
    } else {
        document.title = "Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/geeks.png");
    }
});

// Set dynamic image path based on current file
const imageBasePath = window.location.pathname.includes('/projects/')
    ? "../assets/images/projects/"
    : "assets/images/projects/";

// Load project JSON data
function getProjects() {
    const jsonPath = window.location.pathname.includes('/projects/')
        ? "projects.json"
        : "projects/projects.json";

    return fetch(jsonPath)
        .then(response => response.json())
        .then(data => data);
}

// Render simple project cards
function renderProjects(projects, imageBasePath) {
    const container = document.getElementById("projects-container");
    if (!container) return;

    container.innerHTML = "";

    projects.forEach((project) => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
          <img draggable="false" src="${imageBasePath + project.image}" alt="project" />
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank">View Project</a>
        `;

        container.appendChild(card);
    });
}

// Render isotope grid layout
function showProjects(projects) {
    const projectsContainer = document.querySelector(".work .box-container");
    if (!projectsContainer) return;

    let projectsHTML = "";

    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img draggable="false" src="${imageBasePath + project.image}" alt="project" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View
                            </a>
                            <a href="${project.links.code}" class="btn" target="_blank">
                                Code <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;

    // Init Isotope
    const $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: { columnWidth: 200 }
    });

    // Filter buttons
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        const filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

// Load & display projects dynamically
getProjects().then(projects => {
    renderProjects(projects, imageBasePath);
    showProjects(projects); // Only works if isotope container exists
});

// Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

// Disable dev tools shortcuts
document.onkeydown = function (e) {
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
    ) {
        return false;
    }
};
