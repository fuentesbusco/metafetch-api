import { IsUrl } from 'class-validator';

export class UrlQueryDto {
  @IsUrl({}, { message: 'Invalid URL provided' })
  url: string;
}
