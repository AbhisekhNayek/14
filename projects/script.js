$(document).ready(function () {
    // Toggle menu
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll effects
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

// Tab visibility change behavior
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Abhisekh Nayek";
        $("#favicon").attr("href", "/assets/images/geeks.png");
    } else {
        document.title = "Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/geeks.png");
    }
});

// Fetch projects from JSON
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => data);
}

// Display project cards
function showProjects(projects) {
    const projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img draggable="false" src="${project.image}" alt="project" />
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

    // Initialize isotope
    const $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // Filter buttons
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        const filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

// Load and render projects
getProjects().then(showProjects);

// Tawk.to Live Chat integration
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

// Disable developer shortcuts
document.onkeydown = function (e) {
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')
    ) {
        return false;
    }
};
