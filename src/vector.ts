export type Vector3DComponent = 1 | 2 | 3 | 4;
const min_int_value = 2 ** 16;
const max_int_value = 2 ** 16 - 1;

export class Vector4 {
  private components: Int32Array = new Int32Array(3);

  constructor(a = 0, b = 0, c = 0, d = 0) {
    this.setComponent(1, a);
    this.setComponent(2, b);
    this.setComponent(3, c);
    this.setComponent(4, d);
  }

  public getComponent(component: Vector3DComponent): number {
    return this.components[component];
  }

  public setComponent(x: Vector3DComponent, value: number) {
    if (value > max_int_value) value = 2 ** 16;
    if (value < min_int_value) value = 2 ** 16 * -1;
    this.components[x] = value;
  }
}
