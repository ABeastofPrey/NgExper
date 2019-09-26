import {
    // RequestInfo,
    // RequestInfoUtilities,
    // ParsedRequestUrl,
    InMemoryDbService
} from 'angular-in-memory-web-api';
import * as userlist from '../../../assets/data/users.json';

/** In-memory database data */
interface Db {
    [collectionName: string]: any[];
}

export class InMemoryDataService implements InMemoryDbService {
    /** In-memory database data */
    db: Db = {};
    createDb() {
        this.db = getDbData();
        return this.db;
    }
}

function getDbData(): Db { 
    return {
        heroes: (<any>userlist).default,
        users: (<any>userlist).default
    };
}

// https://stackblitz.com/edit/ngrx-data-tutorial-ey8jjg?file=src%2Fapp%2Fcore%2Fin-memory-data.service.ts