import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('clients')
@UseGuards(AuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiBody({
    type: CreateClientDto,
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const client = await this.clientsService.findOne(id);
    if (!client) throw new NotFoundException(`Client ${id} does not exist.`);
    return client;
  }

  @Patch(':id')
  @ApiBody({
    type: UpdateClientDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const client = await this.clientsService.update(id, updateClientDto);
    if (!client) throw new NotFoundException(`Client ${id} does not exist.`);
    return client;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientsService.remove(id);
  }
}
