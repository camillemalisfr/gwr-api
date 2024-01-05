import { Model } from 'objection';

export class ClientModel extends Model {
  static get tableName() {
    return 'clients';
  }
}
