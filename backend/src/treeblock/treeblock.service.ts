import { Injectable } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TreeblockDocument } from './treeblock.schema';

@Injectable()
export class TreeblockService {
  constructor(@InjectModel('treeblock') private readonly model: Model<TreeblockDocument>){}

  async create(data:any) {
    return await new this.model({...data}).save(); 
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne() {
    return await this.model.find().sort({_id: -1}).limit(1).exec();
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, {new: true}).exec(); 
  }
  
  async findById(id){
    return await this.model.findById(id).exec();
  }
   
}
