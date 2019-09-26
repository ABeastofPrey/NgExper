import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class FooService {
    constructor(private http: HttpClient) { }

    public getHeros(): Observable<any> {
        return this.http.get<{id: string, name: string}[]>('api/heroes').pipe(tap(() => {
            console.log('Get hero.');
        })).pipe(catchError(err => {
            console.warn(err);
            return new Observable();
        }));
    }
}