import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';  
import { ENVS } from './env'; 
import { PlanterModule } from './planter/planter.module';
import { TreeblockModule } from './treeblock/treeblock.module';
 
@Module({
  imports: [ 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(ENVS.MONGO_ROOT),   
    PlanterModule,
    TreeblockModule
  ],
  controllers: [AppController],
  providers: [
    AppService,  
  ],
})
export class AppModule  {  }
