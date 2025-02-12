export namespace KAFKA_CONSTANTS {
  export enum Topic {
    TOPIC_ORDER = 'TOPIC_ORDER',
    TOPIC_USER = 'TOPIC_USER',
  }
  export enum UserActionTypes {
    CREATE_USER = 'CREATE_USER',
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_BY_ID = 'FETCH_USER_BY_ID',
    FETCH_USER_BY_USERNAME = 'FETCH_USER_BY_USERNAME',
  }

  export enum OrderActionTypes {
    CREATE_ORDER = 'CREATE_ORDER',
    UPDATE_ORDER = 'UPDATE_ORDER',
    DELETE_ORDER = 'DELETE_ORDER',
    FETCH_ORDER = 'FETCH_ORDER',
    FETCH_ORDER_BY_ID = 'FETCH_ORDER_BY_ID',
  }

  export type ActionTypes = UserActionTypes | OrderActionTypes;
}
