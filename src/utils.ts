import { Matrix4, MatrixPreset } from "./matrix";
import { Vector4 } from "./vector";

export function translateVector(
  v: Vector4,
  x: number,
  y: number,
  z: number
): Vector4 {
  const m = new Matrix4(MatrixPreset.TRANSLATION_MATRIX);
  m.d = x;
  m.h = y;
  m.l = z;
  m.p = 1;

  m.multiply(v);
  return m.vector4();
}

export function scaleVector(
  v: Vector4,
  x: number,
  y: number,
  z: number
): Vector4 {
  const m = new Matrix4();
  m.a = x;
  m.f = y;
  m.k = z;
  m.p = 1;

  m.multiply(v);
  return m.vector4();
}
