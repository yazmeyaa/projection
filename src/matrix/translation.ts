import { Matrix4 } from "./matrix";

export class TranslationMatrix {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  public matrix: Matrix4 = new Matrix4();

  public translateX(value: number): void {
    this.translate(value, 0, 0);
  }

  public translateY(value: number): void {
    this.translate(0, value, 0);
  }

  public translateZ(value: number): void {
    this.translate(0, 0, value);
  }

  public translate(x: number, y: number, z: number): void {
    const translationMatrix = new Matrix4();
    translationMatrix.set(3, 0, x);
    translationMatrix.set(3, 1, y);
    translationMatrix.set(3, 2, z);

    this.matrix.multiply(translationMatrix);
  }
}
