import { Vector4 } from "../../vector";
import { Matrix4 } from "../matrix";
import { RotationMatrix } from "../model/rotation";
import { TranslationMatrix } from "../model/translation";

export class Camera {
  public target: Vector4 = new Vector4(0, 0, -1, 0);
  public readonly eye: Vector4 = new Vector4(0, 0, 0, 0);
  public readonly up: Vector4 = new Vector4(0, 1, 0, 0);
  public readonly translation: TranslationMatrix = new TranslationMatrix();
  public readonly rotate: RotationMatrix = new RotationMatrix();
  public readonly matrix: Matrix4;

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
    const up = forward.cross(right).normalize();
    this.up.set(up.x, up.y, up.z, up.w);
  }

  public update() {
    this.matrix.reset();

    this.matrix.multiply(this.translation.matrix);
    this.matrix.multiply(this.rotate.getMatrix());

    const forward = this.forward;
    const right = this.right;
    this.updateUp(forward, right);

    this.matrix.set(0, 3, -right.dot(this.eye));
    this.matrix.set(1, 3, -this.up.dot(this.eye));
    this.matrix.set(2, 3, -forward.dot(this.eye));
  }

  private buildMatrix(): Matrix4 {
    let result = new Matrix4();
    result.multiply(this.translation.matrix);
    result.multiply(this.rotate.getMatrix());

    const forward = this.forward;
    const right = this.right;
    this.updateUp(forward, right);

    result.set(0, 3, -right.dot(this.eye));
    result.set(1, 3, -this.up.dot(this.eye));
    result.set(2, 3, -forward.dot(this.eye));
    return result;
  }

  public lookAt(target: Vector4) {
    this.target = target;
    this.update();
  }
}

export class ProjectionMatrix {
  public static perspective(
    fov: number,
    aspect: number,
    near: number,
    far: number
  ): Matrix4 {
    const result = new Matrix4();
    const tanFov = 1 / Math.tan((fov / 2) * (Math.PI / 180));

    result.set(0, 0, tanFov / aspect);
    result.set(1, 1, tanFov);
    result.set(2, 2, -(far + near) / (far - near));
    result.set(2, 3, -(2 * far * near) / (far - near));
    result.set(3, 2, -1);
    result.set(3, 3, 0);

    return result;
  }
}
