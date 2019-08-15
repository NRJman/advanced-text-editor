import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SynonymsService {
    constructor(private http: HttpClient) { }

    public getSynonyms(searchKey: string): Observable<object> {
        return this.http.get('https://api.datamuse.com/words', {
            params: {
                ml: searchKey
            }
        });
    }
}
