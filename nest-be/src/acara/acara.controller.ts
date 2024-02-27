import { Body, Controller, Post } from '@nestjs/common';
import { CreateAcaraDto } from './acara.dto';
import { AcaraService } from './acara.service';

@Controller('acara')
export class AcaraController {
  constructor(private readonly acaraService: AcaraService) {}
  @Post()
  async createAcaraOKK(
    // @Req() req: Request,
    @Body() createAcaraDto: CreateAcaraDto,
  ) {
    console.log('createAcaraDto, ', createAcaraDto);
    const acara = await this.acaraService.createAcara(createAcaraDto);
    return {
      code: 201,
      message: `Successfully created ${createAcaraDto.nama_acara}`,
      acara: acara,
    };
    // const user = req.user;
    // if (user.global_auth === GlobalAuthorityLevel.NON_ADMIN) {
    //   throw new HttpException('Unauthorized creation!', 403);
    // }
  }
}
