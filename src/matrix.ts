import { Vector4 } from "./vector";

export enum MatrixPreset {
  ZERO_MATRIX = "ZERO_MATRIX",
  TRANSLATION_MATRIX = "TRANSLATION_MATRIX",
  SCALE_MATRIX = "SCALE_MATRIX",
}

export class Matrix4 {
  public a: number = 0;
  public b: number = 0;
  public c: number = 0;
  public d: number = 0;
  public e: number = 0;
  public f: number = 0;
  public g: number = 0;
  public h: number = 0;
  public i: number = 0;
  public j: number = 0;
  public k: number = 0;
  public l: number = 0;
  public m: number = 0;
  public n: number = 0;
  public o: number = 0;
  public p: number = 0;

  constructor(preset: MatrixPreset = MatrixPreset.ZERO_MATRIX) {
    switch (preset) {
      case MatrixPreset.ZERO_MATRIX:
        break;
      case MatrixPreset.TRANSLATION_MATRIX:
        this.a = 1;
        this.g = 1;
        this.k = 1;
        this.p = 1;
        break;
      case MatrixPreset.SCALE_MATRIX:
        this.a = 1;
        this.g = 1;
        this.k = 1;
        this.p = 1;
        break;
      default:
        break;
    }
  }

  private multiplyByVector(v: Vector4): void {
    this.a *= v.getComponent(1);
    this.b *= v.getComponent(1);
    this.c *= v.getComponent(1);
    this.d *= v.getComponent(1);

    this.e *= v.getComponent(2);
    this.f *= v.getComponent(2);
    this.g *= v.getComponent(2);
    this.h *= v.getComponent(2);

    this.i *= v.getComponent(3);
    this.j *= v.getComponent(3);
    this.k *= v.getComponent(3);
    this.l *= v.getComponent(3);

    this.m *= v.getComponent(4);
    this.n *= v.getComponent(4);
    this.o *= v.getComponent(4);
    this.p *= v.getComponent(4);
  }
  private multiplyByMatrix(m: Matrix4): void {
    this.a *= m.a;
    this.b *= m.b;
    this.c *= m.c;
    this.d *= m.d;

    this.e *= m.e;
    this.f *= m.f;
    this.g *= m.g;
    this.h *= m.h;

    this.i *= m.i;
    this.j *= m.j;
    this.k *= m.k;
    this.l *= m.l;

    this.m *= m.m;
    this.n *= m.n;
    this.o *= m.o;
    this.p *= m.p;
  }

  public copy(): Matrix4 {
    const m = new Matrix4();
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;

    this.e = m.e;
    this.f = m.f;
    this.g = m.g;
    this.h = m.h;

    this.i = m.i;
    this.j = m.j;
    this.k = m.k;
    this.l = m.l;

    this.m = m.m;
    this.n = m.n;
    this.o = m.o;
    this.p = m.p;

    return m;
  }

  public multiply(target: Matrix4 | Vector4) {
    if (target instanceof Matrix4) this.multiplyByMatrix(target);
    if (target instanceof Vector4) this.multiplyByVector(target);
  }

  public vector4(): Vector4 {
    const a = this.a + this.b + this.c + this.d;
    const b = this.e + this.f + this.g + this.h;
    const c = this.i + this.j + this.k + this.l;
    const d = this.j + this.k + this.l + this.m;

    return new Vector4(a, b, c, d);
  }
}
