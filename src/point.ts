import { ModelMatrix } from "./matrix/model/model";
import { RotationMatrix } from "./matrix/model/rotation";
import { ScaleMatrix } from "./matrix/model/scale";
import { TranslationMatrix } from "./matrix/model/translation";
import { Vector4 } from "./vector";

export class Point3D {
  public position: Vector4 = new Vector4();

  public rotation: RotationMatrix = new RotationMatrix();
  public translate: TranslationMatrix = new TranslationMatrix();
  public scale: ScaleMatrix = new ScaleMatrix();

  public model: ModelMatrix;

  constructor() {
    this.model = new ModelMatrix(this.rotation, this.translate, this.scale);
  }
}
