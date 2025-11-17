const counterDisplay = document.getElementById('counter');
const messageDisplay = document.getElementById('message');
const toggleMaxBtn = document.getElementById('toggleMaxBtn');


let count = parseInt(localStorage.getItem('counter')) || 0;
let maxLimit = parseInt(localStorage.getItem('maxLimit')) || 10;
updateDisplay(); 
updateToggleButtonText(); 


const increaseSound = new Audio('https://www.soundjay.com/buttons/sounds/button-22.mp3');
const decreaseSound = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
const resetSound = new Audio('https://www.soundjay.com/buttons/sounds/button-24.mp3');
const toggleSound = new Audio('https://www.soundjay.com/buttons/sounds/button-30.mp3');


function showMessage(text) {
  messageDisplay.innerText = text;
  messageDisplay.classList.remove('fade-out');
  setTimeout(() => {
    messageDisplay.classList.add('fade-out');
    setTimeout(() => {
      messageDisplay.innerText = ''; 
      messageDisplay.classList.remove('fade-out'); 
    }, 500); 
  }, 3000); 
}


document.getElementById('increaseBtn').addEventListener('click', () => {
  if (count < maxLimit) {
    count += 1;
    updateDisplay();
    localStorage.setItem('counter', count);
    increaseSound.play();
    showMessage(''); 
  } else {
    showMessage(`Can't go above ${maxLimit}!`);
  }
});
document.getElementById('decreaseBtn').addEventListener('click', () => {
    if (count > 0) {
      count -= 1;
      updateDisplay();
      localStorage.setItem('counter', count);
      decreaseSound.play();
      showMessage('');
    } else {
      showMessage("Can't go below 0!");
    }
  });

  
  document.getElementById('resetBtn').addEventListener('click', () => {
    count = 0;
    updateDisplay();
    localStorage.setItem('counter', count);
    resetSound.play();
    showMessage('');
  });
  document.getElementById('toggleMaxBtn').addEventListener('click', () => {
    maxLimit = maxLimit === 10 ? 20 : 10; 
    localStorage.setItem('maxLimit', maxLimit);
    updateToggleButtonText();
    toggleSound.play();
    showMessage(`Max limit set to ${maxLimit}`);
    if (count > maxLimit) { 
      count = maxLimit;
      updateDisplay();
      localStorage.setItem('counter', count);
    }
  });

 
  function updateDisplay() {
    counterDisplay.innerText = count;
    counterDisplay.style.color = count > 0 ? 'green' : 'red';
  }
  function updateToggleButtonText() {
    toggleMaxBtn.innerText = `Toggle Max (${maxLimit})`;
  }
