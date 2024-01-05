import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ModelClass } from 'objection';
import { ClientModel } from '../clients/clients.model';

@Injectable()
export class ClientsService {
  constructor(@Inject('ClientModel') private model: ModelClass<ClientModel>) {}

  create(createClientDto: CreateClientDto) {
    return this.model.query().insert(createClientDto);
  }

  findAll() {
    return this.model.query();
  }

  findOne(id: number) {
    return this.model.query().findById(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.model.query().patchAndFetchById(id, updateClientDto);
  }

  remove(id: number) {
    return this.model.query().deleteById(id);
  }
}
