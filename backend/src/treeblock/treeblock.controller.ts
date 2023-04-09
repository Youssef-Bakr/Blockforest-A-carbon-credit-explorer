import { Controller, Get, Param, Post } from '@nestjs/common'; 
import { TreeblockService } from './treeblock.service'; 

 
@Controller('treeblock')
export class TreeblockController {
  constructor(private readonly treeblockService: TreeblockService) {} 
 
  @Get()
  findAll() {
    return this.treeblockService.findAll();
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treeblockService.findById(id);
  } 
   
}
