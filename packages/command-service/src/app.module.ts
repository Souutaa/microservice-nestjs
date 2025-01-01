import { Module } from '@nestjs/common';
import { OrderListener } from './order/order.kafka.consumer';
import { OrderService } from './order/order.service';

@Module({
  imports: [],
  controllers: [],
  providers: [OrderListener, OrderService],
})
export class AppModule {}
