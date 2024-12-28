import { test, describe, expect, beforeEach } from "@jest/globals";
import { Matrix4 } from "./matrix";
import { Vector4 } from "../vector";

describe("Test basic 4D matrix", () => {
  const matrix = new Matrix4();
  beforeEach(() => {
    matrix.reset();
  });

  test("Matrix reset", () => {
    matrix.set(0, 1, 42);
    matrix.set(2, 1, 42);
    matrix.set(3, 1, 42);
    matrix.set(1, 2, 42);

    matrix.reset();
    expect(matrix.get(0, 0)).toStrictEqual(1);
    expect(matrix.get(1, 0)).toStrictEqual(0);
    expect(matrix.get(2, 0)).toStrictEqual(0);
    expect(matrix.get(3, 0)).toStrictEqual(0);

    expect(matrix.get(0, 1)).toStrictEqual(0);
    expect(matrix.get(1, 1)).toStrictEqual(1);
    expect(matrix.get(2, 1)).toStrictEqual(0);
    expect(matrix.get(3, 1)).toStrictEqual(0);

    expect(matrix.get(0, 2)).toStrictEqual(0);
    expect(matrix.get(1, 2)).toStrictEqual(0);
    expect(matrix.get(2, 2)).toStrictEqual(1);
    expect(matrix.get(3, 2)).toStrictEqual(0);

    expect(matrix.get(0, 3)).toStrictEqual(0);
    expect(matrix.get(1, 3)).toStrictEqual(0);
    expect(matrix.get(2, 3)).toStrictEqual(0);
    expect(matrix.get(3, 3)).toStrictEqual(1);
  });

  test("Init matrix", () => {
    expect(matrix.get(0, 0)).toStrictEqual(1);
    expect(matrix.get(1, 0)).toStrictEqual(0);
    expect(matrix.get(2, 0)).toStrictEqual(0);
    expect(matrix.get(3, 0)).toStrictEqual(0);

    expect(matrix.get(0, 1)).toStrictEqual(0);
    expect(matrix.get(1, 1)).toStrictEqual(1);
    expect(matrix.get(2, 1)).toStrictEqual(0);
    expect(matrix.get(3, 1)).toStrictEqual(0);

    expect(matrix.get(0, 2)).toStrictEqual(0);
    expect(matrix.get(1, 2)).toStrictEqual(0);
    expect(matrix.get(2, 2)).toStrictEqual(1);
    expect(matrix.get(3, 2)).toStrictEqual(0);

    expect(matrix.get(0, 3)).toStrictEqual(0);
    expect(matrix.get(1, 3)).toStrictEqual(0);
    expect(matrix.get(2, 3)).toStrictEqual(0);
    expect(matrix.get(3, 3)).toStrictEqual(1);
  });

  test("Set and read matrix values", () => {
    matrix.set(0, 3, 42);
    expect(matrix.get(0, 3)).toStrictEqual(42);
  });

  test("Test copy matrix", () => {
    matrix.set(1, 0, 42);
    const copy = matrix.copy();
    expect(copy.get(1, 0)).toStrictEqual(42);

    copy.set(1, 0, 11);
    expect(matrix.get(1, 0)).toStrictEqual(42);
    matrix.set(1, 0, 199);
    expect(copy.get(1, 0)).toStrictEqual(11);
  });

  test("Convertation matrix4 to vector4", () => {
    matrix.set(1, 0, 2);
    matrix.set(0, 3, 9);

    /**
     * ____________
     * |1, 2, 0, 0|      VECTOR 4D
     * |0, 1, 0, 0| ==> (x, y, z, w)
     * |0, 0, 1, 0|     (3, 1, 1, 10)
     * |9, 0, 0, 1|
     * ------------
     */

    const vector = matrix.vector4();

    expect(vector.getComponents()).toStrictEqual([3, 1, 1, 10]);
  });

  test("Multiply matrix by matrix", () => {
    /**
     * ____________         ____________        ____________
     * |1, 2, 0, 0|         |1, 2, 0, 0|        |1, 4, 0, 0|
     * |0, 1, 0, 0|     X   |0, 1, 0, 0| ==>    |0, 1, 0, 0|
     * |0, 0, 1, 0|         |0, 2, 1, 0|        |0, 0, 1, 0|
     * |0, 0, 0, 1|         |0, 0, 0, 1|        |0, 0, 0, 1|
     * ------------         ------------        ------------
     */

    const another = new Matrix4();
    another.set(1, 0, 2);
    another.set(1, 2, 2);
    matrix.set(1, 0, 2);

    matrix.multiply(another);

    expect(matrix.get(1, 0)).toStrictEqual(4);
    expect(matrix.get(1, 2)).toStrictEqual(2);
  });

  test("Mutliply matrix be vector", () => {
    /**
     * ____________        VECTOR 4     ____________
     * |1, 0, 0, 0|         x|2|        |2, 0, 0, 0|
     * |0, 1, 0, 0|     X   y|2| ==>    |0, 4, 0, 0|
     * |0, 0, 1, 0|         z|2|        |0, 0, 6, 0|
     * |0, 0, 0, 1|         w|2|        |0, 0, 0, 8|
     * ------------                     ------------
     */

    const vector = new Vector4(2, 2, 2, 2);
    matrix.set(0, 0, 1);
    matrix.set(1, 1, 2);
    matrix.set(2, 2, 3);
    matrix.set(3, 3, 4);

    matrix.multiply(vector);

    expect(matrix.get(0, 0)).toStrictEqual(2);
    expect(matrix.get(1, 1)).toStrictEqual(4);
    expect(matrix.get(2, 2)).toStrictEqual(6);
    expect(matrix.get(3, 3)).toStrictEqual(8);
  });

  test("Get wrong range value", () => {
    expect(() => matrix.get(4, 1000)).toThrowError();
    expect(() => matrix.get(-4, -1000)).toThrowError();
  });

  test("Set wrong range value", () => {
    expect(() => matrix.set(4, 54545, 42)).toThrowError();
    expect(() => matrix.set(-4, -54545, 42)).toThrowError();
  });
});
