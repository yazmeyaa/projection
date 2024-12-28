import { Matrix4 } from "../matrix";

export class RotationMatrix {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  public readonly matrixX: Matrix4 = new Matrix4();
  public readonly matrixY: Matrix4 = new Matrix4();
  public readonly matrixZ: Matrix4 = new Matrix4();

  constructor() {
    this.reset();
  }

  public rotateX(theta: number): void {
    this.x = theta;
    this.updateMatrixX();
  }

  public rotateY(theta: number): void {
    this.y = theta;
    this.updateMatrixY();
  }

  public rotateZ(theta: number): void {
    this.z = theta;
    this.updateMatrixZ();
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.matrixX.reset();
    this.matrixY.reset();
    this.matrixZ.reset();

    this.updateMatrixX();
    this.updateMatrixY();
    this.updateMatrixZ();
  }

  public getMatrix(): Matrix4 {
    const result = new Matrix4();
    result.multiply(this.matrixZ);
    result.multiply(this.matrixY);
    result.multiply(this.matrixX);
    return result;
  }

  private updateMatrixX(): void {
    const newMatrix = new Matrix4();

    const cosT = Math.cos(this.x);
    const sinT = Math.sin(this.x);

    newMatrix.reset();
    newMatrix.set(0, 0, 1);
    newMatrix.set(1, 1, cosT);
    newMatrix.set(2, 1, -sinT);
    newMatrix.set(1, 2, sinT);
    newMatrix.set(2, 2, cosT);
    newMatrix.set(3, 3, 1);
    this.matrixX.multiply(newMatrix);
  }

  private updateMatrixY(): void {
    const newMatrix = new Matrix4();
    const cosT = Math.cos(this.y);
    const sinT = Math.sin(this.y);

    newMatrix.reset();
    newMatrix.set(0, 0, cosT);
    newMatrix.set(2, 0, sinT);
    newMatrix.set(1, 1, 1);
    newMatrix.set(0, 2, -sinT);
    newMatrix.set(2, 2, cosT);
    newMatrix.set(3, 3, 1);

    this.matrixY.multiply(newMatrix);
  }

  private updateMatrixZ(): void {
    const newMatrix = new Matrix4();
    const cosT = Math.cos(this.z);
    const sinT = Math.sin(this.z);

    newMatrix.reset();
    newMatrix.set(0, 0, cosT);
    newMatrix.set(1, 0, -sinT);
    newMatrix.set(0, 1, sinT);
    newMatrix.set(1, 1, cosT);
    newMatrix.set(2, 2, 1);
    newMatrix.set(3, 3, 1);

    this.matrixZ.multiply(newMatrix);
  }
}
