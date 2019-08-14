import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Synonym } from '../shared/models/synonym.model';

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
