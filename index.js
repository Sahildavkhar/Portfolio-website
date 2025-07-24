import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('.portfolio'),
    smooth: true
});

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});

const groupContainer = document.querySelector('.group-container');

    groupContainer.addEventListener('mousemove', (event) => {
        const rect = groupContainer.getBoundingClientRect();
        const x = event.clientX - rect.left; // Mouse X position relative to the container
        const y = event.clientY - rect.top;  // Mouse Y position relative to the container

        groupContainer.style.setProperty('--mouse-x', `${x}px`);
        groupContainer.style.setProperty('--mouse-y', `${y}px`);
    });

// Initialize IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add class to trigger fade-left animation
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once it's in view
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the element is visible

// Target the .skills element and observe it
const skillsElement = document.querySelector('.about-me');
observer.observe(skillsElement);
