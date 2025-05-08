import { Controller, Get, Query } from '@nestjs/common';
import { MetaService } from './meta.service';
import { UrlQueryDto } from './dto/url-query.dto';
import { Validate } from 'class-validator';

@Controller()
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get('metafetch')
  async getMeta(@Query() query: UrlQueryDto) {
    return this.metaService.fetchMetadata(query.url);
  }

  @Get('metascore')
  async getScore(@Query() query: UrlQueryDto) {
    const { meta } = await this.metaService.fetchMetadata(query.url);
    return this.metaService.calculateScore(meta);
  }

  @Get('ping')
  getPong(): string {
    return 'Pong!';
  }

  
}
