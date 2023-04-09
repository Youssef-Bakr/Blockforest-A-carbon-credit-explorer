import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PlanterDocument = Planter & Document;

@Schema()
export class Planter {
    @Prop()
    name: string;

    @Prop()
    carbon: string[];

    @Prop()
    contribute: string[];

    @Prop()
    treeblock: {
        block:number,
        cnt:number,
        updatedAt: string
    }[];   
}

export const PlanterSchema = SchemaFactory.createForClass(Planter);

