import { Module } from '@nestjs/common';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
