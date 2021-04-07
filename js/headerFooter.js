// NAV MENU

getHeaderContents();
addFooter();

var nav = false;

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("button").style.marginRight = "185px";
  document.getElementById("bar1").style.backgroundColor = "white";
  document.getElementById("bar1").style.transform =
    "rotate(45deg) translate(5px, 10px)";
  document.getElementById("bar2").style.opacity = "0";
  document.getElementById("bar3").style.backgroundColor = "white";
  document.getElementById("bar3").style.transform =
    "rotate(135deg) translate(-5px, 10px)";
  nav = true;
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("button").style.marginRight = "50px";
  document.getElementById("bar1").style.backgroundColor = "black";
  document.getElementById("bar1").style.transform = "rotate(180deg)";
  document.getElementById("bar2").style.opacity = "1";
  document.getElementById("bar3").style.backgroundColor = "black";
  document.getElementById("bar3").style.transform = "rotate(180deg)";
  nav = false;
}

function getHeaderContents() {
  const markup = `
  <div>
    <h1 class="headerTitle"><a href="startGame.html">Trivia Game</a></h1>
  </div>
  <span>
    <a href="javascript:void(0)" class="button" id="button" onclick="toggleNav()">
      <div class="bar1" id="bar1"></div>
      <div class="bar2" id="bar2"></div>
      <div class="bar3" id="bar3"></div>
    </a>
  </span>
  <div id="mySidenav" class="sidenav">
    <a href="startGame.html">HOME</a>
    <a href="highScores.html">High Scores</a>
    <a href="addQuestion.html">Add Question</a>
    <a href="gamePlay.html">Game Play</a>
    <a href="startGame.html">Start Game</a>
    <a href="login.html">Login</a>
    <a href="signUp.html">Sign Up</a>
    <a href="profile.html">Profile</a>
  </div>
   `;
  document.querySelector("header").innerHTML = markup;
  document.querySelector(".button").addEventListener("click", function () {
    nav ? closeNav() : openNav();
  });
}
function addFooter() {
  const footer = `Copyright &copy; 2021 Trivia Game Team`;
  document.querySelector("footer").innerHTML = footer;
}
