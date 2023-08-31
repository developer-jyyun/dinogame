//로딩
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loading").classList.add("loading_none");
  }, 2400);
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let dinoImg = new Image();
let cactusImg = new Image();
dinoImg.src = "dinosaur.png";
dinoImg.style.width = "10px";
cactusImg.src = "cactus.png";
console.log(dinoImg.style.width);

const dino = {
  x: 10,
  y: 400,
  width: 50,
  height: 50,
  draw() {
    // ctx.fillStyle = "green"; //초록색
    // ctx.fillRect(this.x, this.y, this.width+10, this.height+30); //위치, 사이즈
    ctx.drawImage(dinoImg, this.x, this.y);
  },
};

dino.x += 6; //2px씩 x축 이동하도록
dino.draw();

class Cactus {
  constructor() {
    this.x = 1000;
    this.y = 400;
    this.width = 60;
    this.height = 100;
  }
  draw() {
    //   ctx.fillStyle = "yellow";
    //   ctx.fillRect(this.x+20  , this.y, this.width, this.height); //위치, 사이즈
    ctx.drawImage(cactusImg, this.x, this.y);
  }
}

let animation;
let timer = 0;
const cactusArr = [];
let jumping = false;
var jumpTimer = 0;

//프레임
function frame60() {
  animation = requestAnimationFrame(frame60); //1초에 60번 코드 실행
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (timer % 100 === 0) {
    //
    const cactus = new Cactus();
    cactusArr.push(cactus);
  }
  cactusArr.forEach((a, i, o) => {
    //x 좌표 0 미만이면 제거
    if (a.x < 0) {
      o.splice(i, 1);
    }

    collision(dino, a);
    a.x -= 5;
    a.draw();
  });

  if (jumping == true) {
    dino.y -= 3; //점프!
    jumpTimer++;
  }
  if (jumping == false) {
    if (dino.y < 400) {
      dino.y += 6; //아래로
    }
  }

  if (jumpTimer > 60) {
    jumping = false;
    jumpTimer = 0;
  }

  dino.draw();
}

frame60();

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jumping = true;
  }
});

//collision check
function collision(dino, cactus) {
  const xValue = cactus.x - (dino.x + dino.width);
  const yValue = cactus.y - (dino.y + dino.height);
  if (xValue < 0 && yValue < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}
