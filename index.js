document.addEventListener("DOMContentLoaded", () => {
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
  
      // Add individual animation durations and delays
      const blinkDuration = (Math.random() * 2 + 1).toFixed(2);
      const driftDuration = (Math.random() * 20 + 10).toFixed(2);
      const delay = (Math.random() * 5).toFixed(2);
  
      star.style.animation = `blink ${blinkDuration}s ease-in-out ${delay}s infinite alternate, drift ${driftDuration}s linear ${delay}s infinite`;
  
      starContainer.appendChild(star);
    }
  });
  