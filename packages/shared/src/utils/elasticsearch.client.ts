import { Client } from '@elastic/elasticsearch';

export class ElasticsearchClient {
  private client: Client;

  constructor(
    private readonly node: string = 'http://localhost:9200', // Địa chỉ Elasticsearch
  ) {
    this.client = new Client({ node });
  }

  /**
   * Index dữ liệu vào Elasticsearch
   * @param index - Tên chỉ mục
   * @param id - ID của tài liệu
   * @param data - Dữ liệu cần lưu
   */
  async index(index: string, id: string, data: any) {
    try {
      await this.client.index({
        index,
        id,
        body: data,
        refresh: true, // Đảm bảo dữ liệu có sẵn ngay sau khi lưu
      });
      console.log(`Elasticsearch: Document indexed in "${index}"`);
    } catch (err) {
      console.error('Elasticsearch Index Error:', err);
      throw err;
    }
  }

  /**
   * Lấy tài liệu từ Elasticsearch
   * @param index - Tên chỉ mục
   * @param id - ID của tài liệu
   * @returns Dữ liệu tài liệu
   */
  async get(index: string, id: string) {
    try {
      const body = await this.client.get({ index, id });
      return body._source;
    } catch (err) {
      console.error('Elasticsearch Get Error:', err);
      if (err instanceof Error && (err as any).meta?.statusCode === 404) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Tìm kiếm tài liệu trong Elasticsearch
   * @param index - Tên chỉ mục
   * @param query - Query DSL
   */
  async search(index: string, query: any) {
    try {
      const body = await this.client.search({
        index,
        body: { query },
      });
      return body.hits.hits.map((hit: any) => hit._source);
    } catch (err) {
      console.error('Elasticsearch Search Error:', err);
      throw err;
    }
  }

  /**
   * Xóa tài liệu từ Elasticsearch
   * @param index - Tên chỉ mục
   * @param id - ID của tài liệu
   */
  async delete(index: string, id: string) {
    try {
      await this.client.delete({ index, id });
      console.log(
        `Elasticsearch: Document with ID "${id}" deleted from "${index}"`,
      );
    } catch (err) {
      console.error('Elasticsearch Delete Error:', err);
      throw err;
    }
  }
}
