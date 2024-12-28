import { test, describe, expect, beforeEach } from "@jest/globals";
import { Vector4 } from ".";
import { Matrix4 } from "../matrix/matrix";

describe("Test Vector 4D", () => {
  const vector = new Vector4();
  beforeEach(() => {
    vector.set(0, 0, 0, 0);
  });

  test("Init vector", () => {
    expect(vector.getComponents()).toStrictEqual([0, 0, 0, 0]);
  });

  test("Get and set vector components", () => {
    vector.set(1, 2, 3, 4);
    expect(vector.getComponents()).toStrictEqual([1, 2, 3, 4]);
    expect(vector.getComponent(1)).toStrictEqual(1);
    vector.setComponent(1, 2);
    expect(vector.x).toStrictEqual(2);
    vector.x = vector.y = vector.z = vector.w = 4;
    expect(vector.x).toStrictEqual(4);
    expect(vector.y).toStrictEqual(4);
    expect(vector.z).toStrictEqual(4);
    expect(vector.w).toStrictEqual(4);
    expect(vector.get("x")).toStrictEqual(4);
    expect(vector.get("y")).toStrictEqual(4);
    expect(vector.get("z")).toStrictEqual(4);
    expect(vector.get("w")).toStrictEqual(4);
  });

  test("apply matrix to vector", () => {
    const matrix = new Matrix4();
    vector.set(2, 2, 2, 2);
    matrix.set(1, 0, 2);
    matrix.set(0, 3, 4);

    vector.applyMatrix(matrix);
    expect(vector.getComponents()).toStrictEqual([6, 2, 2, 10]);
  });

  test("vector cross result", () => {
    vector.set(2, 0, 0, 0);
    const other = new Vector4(0, 2, 0, 0);
    expect(vector.cross(other)).toStrictEqual(new Vector4(0, 0, 4, 0));
  });

  test("vector dot product", () => {
    vector.set(2, 4, 2, 1);
    const other = new Vector4(2, 2, 5, 1);

    expect(vector.dot(other)).toStrictEqual(23);
  });

  test("vector magnitude", () => {
    vector.set(2, 2, 2, 2);
    expect(vector.magnitude()).toStrictEqual(4);
    vector.set(2, 4, 6, 8);
    expect(vector.magnitude()).toBeCloseTo(10.954, 3);
  });

  test("normalize vector", () => {
    vector.set(2, 4, 6, 8);
    const normalized = vector.normalize();
    expect(normalized.x).toBeCloseTo(0.1826);
    expect(normalized.y).toBeCloseTo(0.3652);
    expect(normalized.z).toBeCloseTo(0.5478);
    expect(normalized.w).toBeCloseTo(0.7304);
  });

  test("add vector", () => {
    vector.set(2, 2, 2, 2);
    const other = new Vector4(4, 4, 4, 4);
    vector.add(other);

    expect(vector.getComponents()).toStrictEqual([6, 6, 6, 6]);
  });

  test("subtract vector", () => {
    vector.set(4, 4, 4, 4);
    const other = new Vector4(2, 2, 2, 2);
    vector.subtract(other);

    expect(vector.getComponents()).toStrictEqual([2, 2, 2, 2]);
  });

  test("copy vector", () => {
    vector.set(2, 4, 6, 8);
    const copy = vector.copy();
    expect(copy.getComponents()).toStrictEqual([2, 4, 6, 8]);
    copy.set(6, 6, 6, 6);
    expect(vector.getComponents()).toStrictEqual([2, 4, 6, 8]);
    vector.set(4, 4, 4, 4);
    expect(copy.getComponents()).toStrictEqual([6, 6, 6, 6]);
  });
});
