import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../../app.constants';

import {StatusCustom} from './status-custom.model';
import {createRequestOption, ResponseWrapper} from '../../../shared';

@Injectable()
export class StatusCustomService {

    private resourceUrl =  SERVER_API_URL + 'api/custom/statuscustoms';
    private resourceSearchUrl = SERVER_API_URL + 'api/custom/_search/statuscustoms';
    ObjReturned: StatusCustom;
    constructor(private http: Http) { }

    create(statuscustom: StatusCustom): Observable<StatusCustom> {
        const copy = this.convert(statuscustom);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(statuscustom: StatusCustom): Observable<StatusCustom> {
        // console.error('start put func : ' + statuscustom.column.name)
        const copy = this.convert(statuscustom);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<StatusCustom> {
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

    getStatusCustoms():  Promise<StatusCustom[]> {
        return this.http.get(this.resourceUrl)
          .toPromise()
          .then((response) => response.json() as StatusCustom[])
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
     * Convert a returned JSON object to CustomStatus.
     */
    private convertItemFromServer(json: any): StatusCustom {
        const entity: StatusCustom = Object.assign(new StatusCustom(), json);
        return entity;
    }

    /**
     * Convert a CustomStatus to a JSON which can be sent to the server.
     */
    private convert(statuscustom: StatusCustom): StatusCustom {
        console.error('start conversion')
        const copy: StatusCustom = Object.assign({}, statuscustom);
        // console.error('end conversion of ' + copy.name + ' by ' + copy.column.name)
        return copy;
    }
}
