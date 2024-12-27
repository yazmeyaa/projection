import { Vector4 } from "../vector";

export class Matrix4 {
  private data: Float64Array;

  constructor() {
    this.data = new Float64Array(16);
    /**
     * *Identity matrix by default
     */
    this.set(0, 0, 1);
    this.set(1, 1, 1);
    this.set(2, 2, 1);
    this.set(3, 3, 1);
  }

  public set(x: number, y: number, value: number): void {
    if (x < 0 || x > 3 || y < 0 || y > 3) {
      throw new Error("Индексы выходят за границы матрицы 4x4.");
    }
    this.data[x * 4 + y] = value;
  }

  public get(x: number, y: number): number {
    if (x < 0 || x > 3 || y < 0 || y > 3) {
      throw new Error("Индексы выходят за границы матрицы 4x4.");
    }
    return this.data[x * 4 + y];
  }

  private multiplyByVector(v: Vector4): void {
    const a =
      this.data[0] * v.getComponent(1) +
      this.data[1] * v.getComponent(2) +
      this.data[2] * v.getComponent(3) +
      this.data[3] * v.getComponent(4);
    const b =
      this.data[4] * v.getComponent(1) +
      this.data[5] * v.getComponent(2) +
      this.data[6] * v.getComponent(3) +
      this.data[7] * v.getComponent(4);
    const c =
      this.data[8] * v.getComponent(1) +
      this.data[9] * v.getComponent(2) +
      this.data[10] * v.getComponent(3) +
      this.data[11] * v.getComponent(4);
    const d =
      this.data[12] * v.getComponent(1) +
      this.data[13] * v.getComponent(2) +
      this.data[14] * v.getComponent(3) +
      this.data[15] * v.getComponent(4);
    this.data[0] = a;
    this.data[4] = b;
    this.data[8] = c;
    this.data[12] = d;

    this.data[1] = a;
    this.data[5] = b;
    this.data[9] = c;
    this.data[13] = d;

    this.data[2] = a;
    this.data[6] = b;
    this.data[10] = c;
    this.data[14] = d;

    this.data[3] = a;
    this.data[7] = b;
    this.data[11] = c;
    this.data[15] = d;
  }

  private multiplyByMatrix(m: Matrix4): void {
    const a =
      this.data[0] * m.data[0] +
      this.data[1] * m.data[4] +
      this.data[2] * m.data[8] +
      this.data[3] * m.data[12];
    const b =
      this.data[4] * m.data[0] +
      this.data[5] * m.data[4] +
      this.data[6] * m.data[8] +
      this.data[7] * m.data[12];
    const c =
      this.data[8] * m.data[0] +
      this.data[9] * m.data[4] +
      this.data[10] * m.data[8] +
      this.data[11] * m.data[12];
    const d =
      this.data[12] * m.data[0] +
      this.data[13] * m.data[4] +
      this.data[14] * m.data[8] +
      this.data[15] * m.data[12];
    this.data[0] = a;
    this.data[4] = b;
    this.data[8] = c;
    this.data[12] = d;

    this.data[1] =
      this.data[0] * m.data[1] +
      this.data[1] * m.data[5] +
      this.data[2] * m.data[9] +
      this.data[3] * m.data[13];
    this.data[5] =
      this.data[4] * m.data[1] +
      this.data[5] * m.data[5] +
      this.data[6] * m.data[9] +
      this.data[7] * m.data[13];
    this.data[9] =
      this.data[8] * m.data[1] +
      this.data[9] * m.data[5] +
      this.data[10] * m.data[9] +
      this.data[11] * m.data[13];
    this.data[13] =
      this.data[12] * m.data[1] +
      this.data[13] * m.data[5] +
      this.data[14] * m.data[9] +
      this.data[15] * m.data[13];

    this.data[2] =
      this.data[0] * m.data[2] +
      this.data[1] * m.data[6] +
      this.data[2] * m.data[10] +
      this.data[3] * m.data[14];
    this.data[6] =
      this.data[4] * m.data[2] +
      this.data[5] * m.data[6] +
      this.data[6] * m.data[10] +
      this.data[7] * m.data[14];
    this.data[10] =
      this.data[8] * m.data[2] +
      this.data[9] * m.data[6] +
      this.data[10] * m.data[10] +
      this.data[11] * m.data[14];
    this.data[14] =
      this.data[12] * m.data[2] +
      this.data[13] * m.data[6] +
      this.data[14] * m.data[10] +
      this.data[15] * m.data[14];

    this.data[3] =
      this.data[0] * m.data[3] +
      this.data[1] * m.data[7] +
      this.data[2] * m.data[11] +
      this.data[3] * m.data[15];
    this.data[7] =
      this.data[4] * m.data[3] +
      this.data[5] * m.data[7] +
      this.data[6] * m.data[11] +
      this.data[7] * m.data[15];
    this.data[11] =
      this.data[8] * m.data[3] +
      this.data[9] * m.data[7] +
      this.data[10] * m.data[11] +
      this.data[11] * m.data[15];
    this.data[15] =
      this.data[12] * m.data[3] +
      this.data[13] * m.data[7] +
      this.data[14] * m.data[11] +
      this.data[15] * m.data[15];
  }

  public copy(): Matrix4 {
    const m = new Matrix4();
    m.data.set(this.data);
    return m;
  }

  public multiply(target: Matrix4 | Vector4) {
    if (target instanceof Matrix4) this.multiplyByMatrix(target);
    if (target instanceof Vector4) this.multiplyByVector(target);
  }

  public vector4(): Vector4 {
    const a = this.data[0] + this.data[1] + this.data[2] + this.data[3];
    const b = this.data[4] + this.data[5] + this.data[6] + this.data[7];
    const c = this.data[8] + this.data[9] + this.data[10] + this.data[11];
    const d = this.data[12] + this.data[13] + this.data[14] + this.data[15];

    return new Vector4(a, b, c, d);
  }
}
