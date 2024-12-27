import { Matrix4 } from "../matrix";

export class ScaleMatrix {
  public matrix: Matrix4 = new Matrix4();
  constructor() {
    this.matrix.set(0, 0, 1);
    this.matrix.set(1, 1, 1);
    this.matrix.set(2, 2, 1);
  }

  public scaleX(value: number): void {
    this.scale(value, 1, 1);
  }

  public scaleY(value: number): void {
    this.scale(1, value, 1);
  }

  public scaleZ(value: number): void {
    this.scale(1, 1, value);
  }

  public scale(x: number, y: number, z: number): void {
    const scaleMatrix = new Matrix4();
    scaleMatrix.set(0, 0, x);
    scaleMatrix.set(1, 1, y);
    scaleMatrix.set(2, 2, z);
    scaleMatrix.set(3, 3, 1);
    this.matrix.multiply(scaleMatrix);
  }

  public set x(value: number) {
    this.matrix.set(0, 0, value);
  }

  public set y(value: number) {
    this.matrix.set(1, 1, value);
  }

  public set z(value: number) {
    this.matrix.set(2, 2, value);
  }

  public get x(): number {
    return this.matrix.get(0, 0);
  }

  public get y(): number {
    return this.matrix.get(1, 1);
  }

  public get z(): number {
    return this.matrix.get(2, 2);
  }
}
