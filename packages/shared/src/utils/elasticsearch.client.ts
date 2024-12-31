import { Client } from "@elastic/elasticsearch";

export class ElasticsearchClient {
  private client: Client;

  constructor() {
    this.client = new Client({ node: "http://localhost:9200" });
  }

  async get(index: string, id: string) {
    const body = await this.client.get({ index, id });
    return body._source;
  }

  async index(index: string, id: string, data: any) {
    await this.client.index({
      index,
      id,
      body: data,
      refresh: true,
    });
  }
}
