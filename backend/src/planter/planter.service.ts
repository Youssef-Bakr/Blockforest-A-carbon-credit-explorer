import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';
import { TreeblockService } from 'src/treeblock/treeblock.service';
import { PlanterDocument } from './planter.schema';


@Injectable()
export class PlanterService {
  
  public gap = 86400000;
  public countCC:number[] = [];

  constructor(
    @InjectModel('planter') private readonly model: Model<PlanterDocument>,
    private treeService: TreeblockService
  ) { }


  async create(data: any) {
    let treeName = 0;
    const timestamp = Date.now().toString();
    const d = {
      name: data['name'],
      carbon: data['carbon'],
      contribute: data['contribute'],
    }

    if(!(data['name'] != "" && data['carbon'] != "" && data['contribute'] != "")){
      return false;
    }

    const treeOne = await this.treeService.findOne();


    const nowTime = Date.now();
    this.countCC.push(nowTime);
    const temps:number[] = [];
    this.countCC.forEach((e)=>{
      if(nowTime-e < this.gap){
        temps.push(e)
      }
    });
    this.countCC = temps;

    let resTree;

    if (treeOne.length > 0) {
      if (treeOne[0]['contribute'].length < 100) {
        const _id = treeOne[0]['_id'];
        const new_contribute = {
          name: d.name,
          updatedAt: timestamp
        };
        const contribute = treeOne[0]['contribute'];
        contribute.push(new_contribute);
        resTree = await this.treeService.update(_id, { updatedAt: timestamp, contribute })
      } else {
        treeName = treeOne[0]['name'] + 1;
        const newTree = {
          name: treeName,
          contribute: [
            {
              name: d.name,
              updatedAt: timestamp
            }
          ],
          createdAt: timestamp,
          updatedAt: timestamp
        }
        resTree = await this.treeService.create(newTree)
      }
    } else {
      treeName = 1;
      const newTree = {
        name: treeName,
        contribute: [
          {
            name: d.name,
            updatedAt: timestamp
          }
        ],
        createdAt: timestamp,
        updatedAt: timestamp
      }
      resTree = await this.treeService.create(newTree)
    }

    treeName = resTree.name;

    let resPlanter;
    const planter = await this.findOne(d.name);
    if (planter) {
      const id = planter["_id"];
      const carbon = planter['carbon'];
      carbon.push(d.carbon);
      const contribute = planter['contribute'];
      contribute.push(d.contribute);
      const treeblock = planter['treeblock'];

      if (treeblock[treeblock.length - 1].block == treeName) {
        treeblock[treeblock.length - 1].cnt += 1;
        treeblock[treeblock.length - 1].updatedAt = timestamp;
      } else {
        const newTreeblock = {
          block: treeName,
          cnt: 1,
          updatedAt: timestamp
        }
        treeblock.push(newTreeblock)
      }
      resPlanter = await this.model.findByIdAndUpdate(id, { carbon, contribute, treeblock }, { new: true }).exec();

    } else {
      const newplanter = {
        name: d.name,
        carbon: [d.carbon],
        contribute: [d.contribute],
        treeblock: [{
          block: treeName,
          cnt: 1,
          updatedAt: timestamp
        }]
      }
      resPlanter = await new this.model({ ...newplanter }).save()
    }

    return resPlanter;
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(name: string) {
    return await this.model.findOne({ name }).exec();
  } 
   
  async sumData(){
    const planters = await this.model.find().exec();
    const trees = await this.treeService.findAll();
    const lastTree = await this.treeService.findOne();
    return {p:planters.length, t:trees.length, l:lastTree[0], b:this.countCC.length}
  }
}
