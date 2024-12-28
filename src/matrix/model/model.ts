import { Matrix4 } from "../matrix";
import { RotationMatrix } from "./rotation";
import { ScaleMatrix } from "./scale";
import { TranslationMatrix } from "./translation";

export class ModelMatrix {
  constructor(
    public readonly rotation: RotationMatrix,
    public readonly translate: TranslationMatrix,
    public readonly scale: ScaleMatrix
  ) {}

  public modelMatrix(): Matrix4 {
    const modelMatrix = new Matrix4();
    modelMatrix.multiply(this.translate.matrix);
    modelMatrix.multiply(this.rotation.matrixZ);
    modelMatrix.multiply(this.rotation.matrixY);
    modelMatrix.multiply(this.rotation.matrixX);
    modelMatrix.multiply(this.scale.matrix);

    return modelMatrix;
  }
}
