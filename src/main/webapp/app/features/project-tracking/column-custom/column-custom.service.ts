import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {ColumnCustom} from './column-custom.model';
import {createRequestOption, ResponseWrapper} from '../../../shared';

@Injectable()
export class ColumnCustomService {

    private resourceUrl =  SERVER_API_URL + 'api/custom/columncustoms';
    private resourceSearchUrl = SERVER_API_URL + 'api/custom/_search/columncustoms';

    ObjReturned: ColumnCustom;

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(columncustom: ColumnCustom): Observable<ColumnCustom> {
        const copy = this.convert(columncustom);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(columncustom: ColumnCustom): Observable<ColumnCustom> {
        const copy = this.convert(columncustom);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<ColumnCustom> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    getColumnCustoms():  Promise<ColumnCustom[]> {
        return this.http.get(this.resourceUrl)
          .toPromise()
          .then((response) => response.json() as ColumnCustom[])
      }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON ObjReturned to CustomColumn.
     */
    private convertItemFromServer(json: any): ColumnCustom {

        const entity: ColumnCustom = Object.assign(new ColumnCustom(), json);
        return entity;
    }

    /**
     * Convert a Column to a JSON which can be sent to the server.JSON.stringify(val.json)
     */
    private convert(columncustom: ColumnCustom): ColumnCustom {
        const copy: ColumnCustom = Object.assign({}, columncustom);
        return copy;
    }

}
