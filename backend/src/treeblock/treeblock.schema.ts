import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TreeblockDocument = Treeblock & Document;

@Schema()
export class Treeblock {
    @Prop()
    name: number;

    @Prop()
    createdAt: string;

    @Prop()
    updatedAt: string;

    @Prop()
    contribute: {
        name:string, 
        updatedAt: string
    }[];   
}

export const TreeblockSchema = SchemaFactory.createForClass(Treeblock);

