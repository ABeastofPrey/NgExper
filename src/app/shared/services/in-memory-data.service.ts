import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as userlist from '../../../assets/data/users.json';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        return { heroes: (<any>userlist).default };
    }
}
