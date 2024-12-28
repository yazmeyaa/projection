import { Camera, ProjectionMatrix } from "./matrix/view/camera";
import { Matrix4 } from "./matrix/matrix";
import { Vector4 } from "./vector";

function project(vertex: Vector4, projectionMatrix: Matrix4) {
  const m = projectionMatrix.copy();

  m.multiply(vertex);
  const pv = m.vector4();
  return new Vector4(pv.x / pv.w, pv.y / pv.w, pv.z / pv.w, 1);
}

const cubeVertices = [
  new Vector4(-1, -1, -1, 1),
  new Vector4(1, -1, -1, 1),
  new Vector4(1, 1, -1, 1),
  new Vector4(-1, 1, -1, 1),
  new Vector4(-1, -1, 1, 1),
  new Vector4(1, -1, 1, 1),
  new Vector4(1, 1, 1, 1),
  new Vector4(-1, 1, 1, 1),
];

const cubeEdges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

const cubeFaces = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 1, 5, 4],
  [2, 3, 7, 6],
  [0, 3, 7, 4],
  [1, 2, 6, 5],
];

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d")!;

const camera = new Camera();
const projectionMatrix = ProjectionMatrix.perspective(
  45,
  canvas.width / canvas.height,
  0.1,
  100
);

camera.translation.set(0, 0, -25);
camera.update();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const viewProjectionMatrix = projectionMatrix.copy();
  viewProjectionMatrix.multiply(camera.matrix);

  const projectedVertices = cubeVertices.map((vertex) =>
    project(vertex, viewProjectionMatrix)
  );

  cubeFaces.forEach((face) => {
    ctx.beginPath();

    const p0 = projectedVertices[face[0]];
    const x0 = (p0.x * 0.5 + 0.5) * canvas.width;
    const y0 = (p0.y * -0.5 + 0.5) * canvas.height;
    ctx.moveTo(x0, y0);

    face.forEach((index) => {
      const p = projectedVertices[index];
      const x = (p.x * 0.5 + 0.5) * canvas.width;
      const y = (p.y * -0.5 + 0.5) * canvas.height;
      ctx.lineTo(x, y);
    });

    ctx.closePath();
    ctx.fillStyle = "rgba(0, 150, 255, 0.5)";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();
  });

  ctx.beginPath();
  cubeEdges.forEach(([start, end]) => {
    const p0 = projectedVertices[start];
    const p1 = projectedVertices[end];

    const x0 = (p0.x * 0.5 + 0.5) * canvas.width;
    const y0 = (p0.y * -0.5 + 0.5) * canvas.height;
    const x1 = (p1.x * 0.5 + 0.5) * canvas.width;
    const y1 = (p1.y * -0.5 + 0.5) * canvas.height;

    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "bold 16px arial";
    ctx.textRendering = "geometricPrecision";
    const text = `x:${x0.toFixed(2)}, y: ${y0.toFixed(2)}`;
    ctx.fillText(text, x0 + 8, y0 + 8);
    ctx.restore();

    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
  });

  ctx.strokeStyle = "#000";
  ctx.stroke();
}

function animate() {
  camera.rotate.rotateY(0.001);
  camera.rotate.rotateX(0.001);
  camera.update();
  draw();
  requestAnimationFrame(animate);
}

animate();
