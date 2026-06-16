const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const btn = document.getElementById('btn');
const color = document.querySelector('.color')


btn.addEventListener("click", function() {
  const randomNumber = getrandomnumber();
  console.log(randomNumber);
  
  document.body.style.backgroundColor = colors[randomNumber];
  color.textContent = colors[randomNumber];
});

function getrandomnumber(){
  return Math.floor(Math.random() * colors.length);
}


