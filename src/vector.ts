import { Matrix4 } from "./matrix/matrix";

export type Vector4DComponent = 1 | 2 | 3 | 4;

export class Vector4 {
  private components: Float64Array = new Float64Array(4);

  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.setComponent(1, x);
    this.setComponent(2, y);
    this.setComponent(3, z);
    this.setComponent(4, w);
  }

  public getComponent(component: Vector4DComponent): number {
    return this.components[component];
  }

  public setComponent(x: Vector4DComponent, value: number) {
    this.components[x] = value;
  }

  public copy(): Vector4 {
    const [x, y, z, w] = this.getComponents();
    return new Vector4(x, y, z, w);
  }

  public getComponents(): [number, number, number, number] {
    const x = this.getComponent(1);
    const y = this.getComponent(2);
    const z = this.getComponent(3);
    const w = this.getComponent(4);

    return [x, y, z, w];
  }

  public get(component: "x" | "y" | "z" | "w"): number {
    switch (component) {
      case "x":
        return this.components[0];
      case "y":
        return this.components[1];
      case "z":
        return this.components[2];
      case "w":
        return this.components[3];
    }
  }

  public set x(value: number) {
    this.components[0] = value;
  }

  public set y(value: number) {
    this.components[1] = value;
  }

  public set z(value: number) {
    this.components[2] = value;
  }

  public set w(value: number) {
    this.components[3] = value;
  }

  public get x(): number {
    return this.components[0];
  }

  public get y(): number {
    return this.components[1];
  }

  public get z(): number {
    return this.components[2];
  }

  public get w(): number {
    return this.components[3];
  }

  public subtract(other: Vector4): void {
    const [a1, b1, c1, d1] = this.getComponents();
    const [a2, b2, c2, d2] = other.getComponents();

    this.setComponent(1, a1 - a2);
    this.setComponent(2, b1 - b2);
    this.setComponent(3, c1 - c2);
    this.setComponent(4, d1 - d2);
  }

  public add(other: Vector4): void {
    const [a1, b1, c1, d1] = this.getComponents();
    const [a2, b2, c2, d2] = other.getComponents();

    this.setComponent(1, a1 + a2);
    this.setComponent(2, b1 + b2);
    this.setComponent(3, c1 + c2);
    this.setComponent(4, d1 + d2);
  }

  public magnitude(): number {
    const [x, y, z, w] = this.getComponents();

    return Math.sqrt(x ** 2 + y ** 2 + z ** 2 + w ** 2);
  }

  public normalize(): Vector4 {
    const [x, y, z, w] = this.getComponents();
    const mag = this.magnitude();
    return new Vector4(x / mag, y / mag, z / mag, w / mag);
  }

  public cross(other: Vector4): Vector4 {
    const [x1, y1, z1] = this.getComponents();
    const [x2, y2, z2] = other.getComponents();

    return new Vector4(
      y1 * z2 - z1 * y2,
      z1 * x2 - x1 * z2,
      x1 * y2 - y1 * x2,
      0
    );
  }

  public dot(other: Vector4): number {
    const [x1, y1, z1] = this.getComponents();
    const [x2, y2, z2] = other.getComponents();

    return x1 * x2 + y1 * y2 + z1 * z2;
  }

  public applyMatrix(matrix: Matrix4): void {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;

    this.x =
      matrix.get(0, 0) * x +
      matrix.get(0, 1) * y +
      matrix.get(0, 2) * z +
      matrix.get(0, 3) * w;

    this.y =
      matrix.get(1, 0) * x +
      matrix.get(1, 1) * y +
      matrix.get(1, 2) * z +
      matrix.get(1, 3) * w;
    this.z =
      matrix.get(2, 0) * x +
      matrix.get(2, 1) * y +
      matrix.get(2, 2) * z +
      matrix.get(2, 3) * w;
    this.w =
      matrix.get(3, 0) * x +
      matrix.get(3, 1) * y +
      matrix.get(3, 2) * z +
      matrix.get(3, 3) * w;
  }
}
