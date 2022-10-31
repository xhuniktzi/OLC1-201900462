import { Guid } from "typescript-guid";

export interface IGraphical {
  uuid: Guid;
  graph(): string;
}
