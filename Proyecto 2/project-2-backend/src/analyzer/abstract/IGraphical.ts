import { Guid } from "typescript-guid";

export interface IGraphical {
  uuid: string;
  graph(): string;
}
