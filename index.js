document.addEventListener("DOMContentLoaded", () => {
  // 1. Reveal sections on scroll
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
  const starsContainer = document.querySelector('.stars');

  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }
  // 2. Star background
  const starContainer = document.querySelector('.stars');
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    const blink = (Math.random() * 2 + 1).toFixed(2);
    const drift = (Math.random() * 20 + 10).toFixed(2);
    const delay = (Math.random() * 5).toFixed(2);
    star.style.animation = `blink ${blink}s ease-in-out ${delay}s infinite alternate, drift ${drift}s linear ${delay}s infinite`;
    starContainer.appendChild(star);
  }

//  / 3. Smooth scroll + auto-open accordion
  document.querySelectorAll('nav a, .explore-button').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });

        const header = target.querySelector('.accordion-header');
        const content = target.querySelector('.accordion-content');
        if (header && content && !content.classList.contains('open')) {
          content.classList.add('open');
          header.classList.add('active');
          triggerLanternPulse();
        }
      }
    });
  });

  // 4. Cursor sparkle trail
  document.addEventListener('mousemove', e => {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.top = `${e.clientY}px`;
    trail.style.left = `${e.clientX}px`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
  });

  // 5. Initialize accordions
  ["projects", "experience", "skills", "certifications", "education", "volunteer"].forEach(setupAccordions);

  // 6. Contact form handling
const contactForm = document.getElementById("contact-form");
const thankYouMessage = document.getElementById("thank-you");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        contactForm.reset();
        contactForm.classList.add("hidden");

        // 🔊 Play success sound
        const sentSound = document.getElementById("sent-sound");
        if (sentSound) {
          console.log("sendt sound")
          sentSound.currentTime = 0;
          sentSound.play().catch(err => console.warn("Sound playback failed:", err));
        }

        if (thankYouMessage) {
          console.log("thank yiuiu");
          thankYouMessage.style.display = "block";
          thankYouMessage.style.opacity = 0;
          thankYouMessage.style.transition = "opacity 0.8s ease";
          setTimeout(() => {
            thankYouMessage.style.opacity = 1;
          }, 50);
        }

        console.log("Form submitted successfully");
      } else {
        alert("Oops! Something went wrong. Please check the form endpoint.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
      console.error(error);
    }
  });
  }
});

// Accordion logic
function setupAccordions(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const miniHeaders = section.querySelectorAll(".mini-accordion-header");
  miniHeaders.forEach(header => {
    header.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
      this.nextElementSibling.classList.toggle("open");
    });
  });

  const mainHeaders = section.querySelectorAll(".accordion-header");
  mainHeaders.forEach(header => {
    const content = header.nextElementSibling;

    header.addEventListener("click", () => {
      const isOpen = content.classList.contains("open");

      mainHeaders.forEach(otherHeader => {
        otherHeader.nextElementSibling.classList.remove("open");
        otherHeader.classList.remove("active");
      });

      if (!isOpen) {
        content.classList.add("open");
        header.classList.add("active");
        triggerLanternPulse();
      }
    });
  });
}

function triggerLanternPulse() {
  const lantern = document.querySelector(".lantern");
  if (lantern) {
    lantern.classList.add("pulse");
    setTimeout(() => lantern.classList.remove("pulse"), 1000);
  }
}


// hover sound
const sparkleSound = document.getElementById('sparkle-hover');

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    sparkleSound.currentTime = 0;
    sparkleSound.play();
  });
});

//resume download sound 

const downloadLink = document.getElementById("resume");
const sparkleAudio = document.getElementById("resume-download");

downloadLink.addEventListener("click", () => {
  sparkleAudio.currentTime = 0;
  sparkleAudio.play();

  downloadLink.classList.add("glow-effect");

  // Remove the class after animation ends to allow replaying
  setTimeout(() => {
    downloadLink.classList.remove("glow-effect");
  }, 1500); // match the duration of the animation
});

// embers

const emberContainer = document.querySelector('.ember-container');

for (let i = 0; i < 25; i++) {
  const ember = document.createElement('div');
  ember.classList.add('ember');
  ember.style.left = `${Math.random() * 100}%`;
  ember.style.top = `${Math.random() * 100}%`;
  ember.style.animationDelay = `${Math.random() * 1}s`;
  emberContainer.appendChild(ember);
}

// const toggleBtn = document.getElementById("toggle-bio");
// const fantasyBio = document.getElementById("fantasy-bio");
// const professionalBio = document.getElementById("professional-bio");

// toggleBtn.addEventListener("click", () => {
//   const showingFantasy = !fantasyBio.classList.contains("hidden");

//   const fadeOut = showingFantasy ? fantasyBio : professionalBio;
//   const fadeIn = showingFantasy ? professionalBio : fantasyBio;

//   fadeOut.classList.add("hidden");
//   setTimeout(() => {
//     fadeIn.classList.remove("hidden");
//   }, 300); // delay to align with transition

//   toggleBtn.textContent = showingFantasy ? "View Fantasy Bio" : "View Professional Bio";
// });

// //bio swap affect 

// document.addEventListener("DOMContentLoaded", () => {
//   const toggleButton = document.getElementById("toggle-bio");
//   const fantasyBio = document.getElementById("fantasy-bio");
//   const professionalBio = document.getElementById("professional-bio");
//   const audioSwap = document.getElementById("audio-swap");

//   toggleButton.addEventListener("click", () => {
//     // Swap visibility
//     const isFantasyVisible = fantasyBio.style.display !== "none";
//     fantasyBio.style.display = isFantasyVisible ? "none" : "block";
//     professionalBio.style.display = isFantasyVisible ? "block" : "none";

//     // Change button text
//     toggleButton.textContent = isFantasyVisible ? "View Fantasy Bio" : "View Professional Bio";

//     // Play sound
//     audioSwap.currentTime = 0;
//     audioSwap.play();
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const bioButton = document.getElementById("toggle-bio");
  const bioModal = document.getElementById("bio-modal");
  const closeBio = document.getElementById("close-bio");
  const audioSwap = document.getElementById("audio-swap");

  const btnPro = document.getElementById("show-professional");
  const btnFan = document.getElementById("show-fantasy");
  const proText = document.getElementById("bio-professional");
  const fanText = document.getElementById("bio-fantasy");

  bioButton.addEventListener("click", () => {
    bioModal.classList.remove("hidden");
    audioSwap.currentTime = 0;
    audioSwap.play();
  });

  closeBio.addEventListener("click", () => {
    bioModal.classList.add("hidden");
  });

  btnPro.addEventListener("click", () => {
    proText.classList.remove("hidden");
    fanText.classList.add("hidden");
    btnPro.classList.add("active");
    btnFan.classList.remove("active");
  });

  btnFan.addEventListener("click", () => {
    fanText.classList.remove("hidden");
    proText.classList.add("hidden");
    btnFan.classList.add("active");
    btnPro.classList.remove("active");
  });
});

//pop-up modal 

window.addEventListener("DOMContentLoaded", () => {
  const popupModal = document.getElementById("assurance-popup");
  if (!popupModal) return; // Exit if modal not found

  const closePopup = document.getElementById("close-popup");
  const btnEnchanted = document.getElementById("popup-show-enchanted");
  const btnFormal = document.getElementById("popup-show-formal");
  const textEnchanted = document.getElementById("popup-text-enchanted");
  const textFormal = document.getElementById("popup-text-formal");

  // Show popup on first load only
  if (!sessionStorage.getItem("seenAssurancePopup")) {
    popupModal.classList.remove("hidden");
    sessionStorage.setItem("seenAssurancePopup", "true");
  }

  // Close popup
  closePopup.addEventListener("click", () => {
    popupModal.classList.add("hidden");
  });

  // Toggle buttons
  btnEnchanted.addEventListener("click", () => {
    textEnchanted.classList.remove("hidden");
    textFormal.classList.add("hidden");
    btnEnchanted.classList.add("active");
    btnFormal.classList.remove("active");
  });

  btnFormal.addEventListener("click", () => {
    textEnchanted.classList.add("hidden");
    textFormal.classList.remove("hidden");
    btnEnchanted.classList.remove("active");
    btnFormal.classList.add("active");
  });
});

//loading
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('fade-out');
  setTimeout(() => loadingScreen.style.display = 'none', 1000);
});


const skillCards = document.querySelectorAll('.skill-category');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
    threshold: 0.1
  });

  skillCards.forEach(card => {
    observer.observe(card);
  });


  document.querySelectorAll('.mini-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = content.style.display === 'block';
  
      // Close all mini accordions in the same timeline
      header.closest('.timeline-horizontal').querySelectorAll('.mini-accordion-content').forEach(c => {
        c.style.display = 'flex';
      });
      header.closest('.timeline-horizontal').querySelectorAll('.mini-accordion-header').forEach(h => {
        h.classList.remove('active');
      });
  
      if (!isOpen) {
        content.style.display = 'block';
        header.classList.add('active');
      }
    });
  });
  