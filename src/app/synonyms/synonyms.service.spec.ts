import { TestBed } from "@angular/core/testing";
import { SynonymsService } from './synonyms.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Synonym } from '../shared/models/synonym.model';

describe('SynonymsService', () => {
    let httpMock: HttpTestingController;
    let synonymsService: SynonymsService;
    const searchKey = 'example';
    const mockHttpResponse: Synonym[] = [
        { word: 'conversation', score: 1, tags: ['a'] },
        { word: 'talk', score: 2, tags: ['b'] }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SynonymsService]
        });

        httpMock = TestBed.get(HttpTestingController);
        synonymsService = TestBed.get(SynonymsService);
    });

    it('should retrieve synonyms from the API via GET', () => {
        synonymsService.getSynonyms(searchKey).subscribe((synonyms: Synonym[]) => {
            expect(synonyms).toEqual(mockHttpResponse);
        });

        const mockRequest = httpMock.expectOne(`https://api.datamuse.com/words?ml=${searchKey}`);

        expect(mockRequest.request.method).toBe('GET');
        mockRequest.flush(mockHttpResponse);
    });
});
