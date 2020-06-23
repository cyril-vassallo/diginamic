import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello App!';
  }
  getCustomers():Array<string> {
    return ['Cyril','Isabelle','Guillaume','Ivan', 'Nathalie'];
  }
}
