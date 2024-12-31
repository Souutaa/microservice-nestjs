import { Client } from "cassandra-driver";

export class CassandraClient {
  private client: Client;

  constructor() {
    this.client = new Client({
      contactPoints: ["127.0.0.1"],
      localDataCenter: "datacenter1",
      keyspace: "orders_keyspace",
    });
  }

  async insert(table: string, data: any) {
    const fields = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map(() => "?")
      .join(", ");

    const query = `INSERT INTO ${table} (${fields}) VALUES (${values})`;

    await this.client.execute(query, Object.values(data), { prepare: true });
  }

  async close() {
    await this.client.shutdown();
  }
}
