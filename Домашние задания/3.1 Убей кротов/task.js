(() => {
    let successAttempts = 0;
    let failAttempts = 0;
    
    const deadSpan = document.getElementById('dead');
    const lostSpan = document.getElementById('lost');
    
    const updateCounters = () => {
      if (successAttempts >= 10 || failAttempts >= 5) {
        const mes = successAttempts >= 10 ? "Победа!" : "Вы проиграли!";
        alert(mes);
        
        successAttempts = 0;
        failAttempts = 0;
      }
      
      deadSpan.textContent = successAttempts;
      lostSpan.textContent = failAttempts;
    }
    
    const holeClick = hole => {
      const hasMole = hole.className.includes('hole_has-mole');
      if (hasMole) {
        successAttempts += 1;
      }
      else {
        failAttempts += 1;
      }
      
      updateCounters();
    };
  
    const holes = Array.from(document.getElementsByClassName('hole-game')[0].children);
    
    holes.forEach(h => h.addEventListener('click', () => holeClick(h)));
})();
