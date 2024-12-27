import { Matrix4 } from "./matrix";

export class RotationMatrix {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  public matrixX: Matrix4 = new Matrix4();
  public matrixY: Matrix4 = new Matrix4();
  public matrixZ: Matrix4 = new Matrix4();

  public rotateX(theta: number): void {
    this.x = theta;
    const cosT = Math.cos(this.x);
    const sinT = Math.sin(this.x);

    this.matrixX = new Matrix4();

    this.matrixX.set(0, 0, 1);
    this.matrixX.set(1, 1, cosT);
    this.matrixX.set(2, 1, -sinT);
    this.matrixX.set(1, 2, sinT);
    this.matrixX.set(2, 2, cosT);
    this.matrixX.set(3, 3, 1);
  }

  public rotateY(theta: number): void {
    this.y = theta;
    const cosT = Math.cos(this.y);
    const sinT = Math.sin(this.y);

    this.matrixY = new Matrix4();

    this.matrixY.set(0, 0, cosT);
    this.matrixY.set(2, 0, sinT);
    this.matrixY.set(1, 1, 1);
    this.matrixY.set(0, 2, -sinT);
    this.matrixY.set(2, 2, cosT);
    this.matrixY.set(3, 3, 1);
  }

  public rotateZ(theta: number): void {
    this.z = theta;
    const cosT = Math.cos(this.z);
    const sinT = Math.sin(this.z);

    this.matrixZ = new Matrix4();

    this.matrixZ.set(0, 0, cosT);
    this.matrixZ.set(1, 0, -sinT);
    this.matrixZ.set(0, 1, sinT);
    this.matrixZ.set(1, 1, cosT);
    this.matrixZ.set(2, 2, 1);
    this.matrixZ.set(3, 3, 1);
  }

  public getMatrix(): Matrix4 {
    let result = new Matrix4();
    result.multiply(this.matrixZ);
    result.multiply(this.matrixY);
    result.multiply(this.matrixX);
    return result;
  }
}
