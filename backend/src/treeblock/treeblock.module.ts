import { Module } from '@nestjs/common';
import { TreeblockService } from './treeblock.service';
import { TreeblockController } from './treeblock.controller';
import { TreeblockSchema } from './treeblock.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name: 'treeblock', schema: TreeblockSchema}])],
  controllers: [TreeblockController],
  providers: [TreeblockService],
  exports: [TreeblockService]
})
export class TreeblockModule {}
