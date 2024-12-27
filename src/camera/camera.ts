import { Matrix4 } from "../matrix/matrix";
import { Vector4 } from "../vector";

export class Camera {
  public eye: Vector4 = new Vector4(0, 0, 0, 0);
  public target: Vector4 = new Vector4(0, 0, -1, 0);
  public up: Vector4 = new Vector4(0, 1, 0, 0);

  public matrix: Matrix4;
  constructor() {
    this.matrix = this.buildMatrix();
  }

  private get forward(): Vector4 {
    const target = this.target.copy();
    target.subtract(this.eye);
    return target.normalize();
  }

  private get right(): Vector4 {
    const up = this.up.copy();
    const forward = this.forward;
    const right = up.cross(forward);

    return right.normalize();
  }

  private updateUp(forward: Vector4, right: Vector4): void {
    this.up = forward.cross(right).normalize();
  }

  public update() {
    const forward = this.forward;
    const right = this.right;
    this.updateUp(forward, right);

    this.matrix.set(0, 0, right.x);
    this.matrix.set(1, 0, right.y);
    this.matrix.set(2, 0, right.z);
    this.matrix.set(3, 0, -right.dot(this.eye));

    this.matrix.set(0, 1, this.up.x);
    this.matrix.set(1, 1, this.up.y);
    this.matrix.set(2, 1, this.up.z);
    this.matrix.set(3, 1, -this.up.dot(this.eye));

    this.matrix.set(0, 2, -forward.x);
    this.matrix.set(1, 2, -forward.y);
    this.matrix.set(2, 2, -forward.z);
    this.matrix.set(3, 2, -forward.dot(this.eye));

    this.matrix.set(0, 3, 0);
    this.matrix.set(1, 3, 0);
    this.matrix.set(2, 3, 0);
    this.matrix.set(3, 3, 1);
  }

  private buildMatrix(): Matrix4 {
    const matrix = new Matrix4();
    const forward = this.forward;
    const right = this.right;
    this.updateUp(forward, right);

    matrix.set(0, 0, right.x);
    matrix.set(1, 0, right.y);
    matrix.set(2, 0, right.z);
    matrix.set(3, 0, -right.dot(this.eye));

    matrix.set(0, 1, this.up.x);
    matrix.set(1, 1, this.up.y);
    matrix.set(2, 1, this.up.z);
    matrix.set(3, 1, -this.up.dot(this.eye));

    matrix.set(0, 2, -forward.x);
    matrix.set(1, 2, -forward.y);
    matrix.set(2, 2, -forward.z);
    matrix.set(3, 2, -forward.dot(this.eye));

    matrix.set(0, 3, 0);
    matrix.set(1, 3, 0);
    matrix.set(2, 3, 0);
    matrix.set(3, 3, 1);

    return matrix;
  }
}
