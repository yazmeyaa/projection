import { ModelMatrix } from "./matrix/model";
import { RotationMatrix } from "./matrix/rotation";
import { ScaleMatrix } from "./matrix/scale";
import { TranslationMatrix } from "./matrix/translation";

export class Point3D {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;

  public rotation: RotationMatrix = new RotationMatrix();
  public translate: TranslationMatrix = new TranslationMatrix();
  public scale: ScaleMatrix = new ScaleMatrix();

  public model: ModelMatrix;

  constructor() {
    this.model = new ModelMatrix(this.rotation, this.translate, this.scale);
  }
}
