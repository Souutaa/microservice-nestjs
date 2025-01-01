import { Client } from 'cassandra-driver';

export class CassandraClient {
  private client: Client;

  constructor(
    private readonly keyspace: string = 'ecommerce_keyspace',
    private readonly contactPoints: string[] = ['127.0.0.1'], // Địa chỉ Cassandra
    private readonly localDataCenter: string = 'datacenter1', // Tên datacenter
  ) {
    this.client = new Client({
      contactPoints,
      localDataCenter,
      keyspace,
    });
  }

  /**
   * Chèn dữ liệu vào bảng
   * @param table - Tên bảng
   * @param data - Dữ liệu cần lưu
   */
  async insert(table: string, data: any) {
    const fields = Object.keys(data).join(', ');
    const placeholders = Object.keys(data)
      .map(() => '?')
      .join(', ');
    const query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`;

    await this.client.execute(query, Object.values(data), { prepare: true });
    console.log(`Cassandra: Inserted into table ${table}`);
  }

  /**
   * Lấy dữ liệu từ bảng
   * @param table - Tên bảng
   * @param condition - Điều kiện WHERE
   * @param params - Giá trị thay thế
   */
  async select(table: string, condition: string, params: any[]) {
    const query = `SELECT * FROM ${table} WHERE ${condition}`;
    const result = await this.client.execute(query, params, { prepare: true });
    return result.rows;
  }

  /**
   * Xóa dữ liệu từ bảng
   * @param table - Tên bảng
   * @param condition - Điều kiện WHERE
   * @param params - Giá trị thay thế
   */
  async delete(table: string, condition: string, params: any[]) {
    const query = `DELETE FROM ${table} WHERE ${condition}`;
    await this.client.execute(query, params, { prepare: true });
    console.log(`Cassandra: Deleted from table ${table}`);
  }

  /**
   * Đóng kết nối Cassandra
   */
  async close() {
    await this.client.shutdown();
    console.log('Cassandra connection closed');
  }
}
