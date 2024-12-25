import { Matrix4, MatrixPreset } from "./matrix";

export class Point3D {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  public rotation: Rotation = new Rotation();
  public translate: Translate = new Translate();
  public scale: Scale = new Scale();
}

export class Rotation {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  public matrix: Matrix4 = new Matrix4();
}

export class Translate {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  public matrix: Matrix4 = new Matrix4(MatrixPreset.TRANSLATION_MATRIX);
}

export class Scale {
  private _matrix: Matrix4 = new Matrix4(MatrixPreset.SCALE_MATRIX);

  public set x(value: number) {
    this._matrix.a = value;
  }

  public set y(value: number) {
    this._matrix.f = value;
  }

  public set z(value: number) {
    this._matrix.k = value;
  }

  public get x(): number {
    return this._matrix.a;
  }

  public get y(): number {
    return this._matrix.f;
  }

  public get z(): number {
    return this._matrix.k;
  }

  public get matrix(): Matrix4 {
    return this._matrix;
  }
}
