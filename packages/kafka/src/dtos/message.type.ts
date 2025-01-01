import { KAFKA_CONSTANTS } from 'shared';

export interface sendMessageType<T = any> {
  type: KAFKA_CONSTANTS.ActionTypes;
  payload: T;
}
