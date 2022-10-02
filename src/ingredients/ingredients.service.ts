import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientsService {

  async getHello() {
    return 'Este es de ingredientes';
  }

}
