document.addEventListener("DOMContentLoaded", () => {
    // Reveal sections on scroll
    const sections = document.querySelectorAll('.section');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2,
    });
  
    sections.forEach(section => observer.observe(section));
  
    // Starry background
    const starContainer = document.querySelector('.stars');
    const numberOfStars = 150;
  
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
  
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.left = `${Math.random() * window.innerWidth}px`;
  
      const blinkDuration = (Math.random() * 2 + 1).toFixed(2);
      const driftDuration = (Math.random() * 20 + 10).toFixed(2);
      const delay = (Math.random() * 5).toFixed(2);
  
      star.style.animation = `blink ${blinkDuration}s ease-in-out ${delay}s infinite alternate, drift ${driftDuration}s linear ${delay}s infinite`;
  
      starContainer.appendChild(star);
    }
  
    // Smooth scroll
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // ✨ Cursor sparkle effect
   document.addEventListener('mousemove', e => {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.top = `${e.clientY}px`;
    trail.style.left = `${e.clientX}px`;
    document.body.appendChild(trail);
    setTimeout(() => {
      trail.remove();
    }, 500);
  });
//   document.addEventListener('mousemove', e => {
    // const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.top = `${e.clientY}px`;
    trail.style.left = `${e.clientX}px`;
    document.body.appendChild(trail);
    setTimeout(() => {
      trail.remove();
    }, 500);
  });  