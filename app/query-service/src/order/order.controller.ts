import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Lấy thông tin đơn hàng theo ID
   */
  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  /**
   * Tìm kiếm đơn hàng theo truy vấn
   */
  @Get()
  async searchOrders() {
    return this.orderService.searchOrders();
  }
}
