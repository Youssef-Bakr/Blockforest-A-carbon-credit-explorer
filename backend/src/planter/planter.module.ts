import { Module } from '@nestjs/common';
import { PlanterService } from './planter.service';
import { PlanterController } from './planter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanterSchema } from './planter.schema';
import { TreeblockModule } from 'src/treeblock/treeblock.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'planter', schema: PlanterSchema }]), TreeblockModule],
  controllers: [PlanterController],
  providers: [PlanterService],
  exports: [PlanterService]
})
export class PlanterModule { }
