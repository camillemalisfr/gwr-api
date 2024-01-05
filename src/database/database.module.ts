import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { Model } from 'objection';
import { ClientModel } from '../clients/clients.model';
import databaseConfig from './knexfile';

const models = [ClientModel];
const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex(databaseConfig);

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
