import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderSyncService } from './order-sync.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, OrderSyncService],
})
export class OrderModule {}
