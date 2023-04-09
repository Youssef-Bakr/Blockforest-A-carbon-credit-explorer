import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common'; 
import { PlanterService } from './planter.service'; 
 
@Controller('planter')
export class PlanterController {
  constructor(private readonly planterService: PlanterService) {}

  @Post()
  create(@Body() data) {
    return this.planterService.create(data);
  }

  @Get()
  findAll() {
    return this.planterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planterService.findOne(id);
  } 

  @Patch()
  findData(@Body() data){
    return this.planterService.sumData();
  }
   
}
