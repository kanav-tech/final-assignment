document.addEventListener('DOMContentLoaded', function () {
    // Form open/close functions
    function openForm() {
        const form = document.getElementById("myForm");
        if (form) form.style.display = "block";
    }

    function closeForm() {
        const form = document.getElementById("myForm");
        if (form) form.style.display = "none";
    }

    window.openForm = openForm;
    window.closeForm = closeForm;
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;

    // Slideshow
    let slideIndex = 1;

    function showSlides(n) {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    showSlides(slideIndex);

    // Close form when clicking outside
    document.addEventListener("click", function (event) {
        if (
            event.target.matches(".cancel") ||
            (!event.target.closest(".form-popup") &&
                !event.target.closest(".Pop_Up_Button") &&
                !event.target.closest(".contact"))
        ) {
            closeForm();
        }
    });

    // Form validation
    const form = document.querySelector(".form-container");
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            if (name === '' || email === '') {
                alert('Please fill out all required fields (Name and Email).');
                return;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('Form submitted successfully!');
            form.submit();
        });
    }

    // Smooth scrolling
    document.querySelectorAll('.Navbar a:not(.contact)').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const navbar = document.querySelector('.Navbar');
    const toggle = document.createElement('button');
    toggle.textContent = '☰';
    toggle.className = 'menu-toggle';
    toggle.style.display = 'none';
    navbar.prepend(toggle);

    toggle.addEventListener('click', () => {
        navbar.querySelectorAll('a').forEach(a => {
            a.style.display = a.style.display === 'block' ? 'none' : 'block';
        });
    });

    function handleResize() {
        if (window.innerWidth <= 576) {
            toggle.style.display = 'block';
            navbar.querySelectorAll('a').forEach(a => a.style.display = 'none');
        } else {
            toggle.style.display = 'none';
            navbar.querySelectorAll('a').forEach(a => a.style.display = 'block');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});
