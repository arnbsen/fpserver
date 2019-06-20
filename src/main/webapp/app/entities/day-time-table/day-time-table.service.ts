import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDayTimeTable } from 'app/shared/model/day-time-table.model';

type EntityResponseType = HttpResponse<IDayTimeTable>;
type EntityArrayResponseType = HttpResponse<IDayTimeTable[]>;

@Injectable({ providedIn: 'root' })
export class DayTimeTableService {
  public resourceUrl = SERVER_API_URL + 'api/day-time-tables';

  constructor(protected http: HttpClient) {}

  create(dayTimeTable: IDayTimeTable): Observable<EntityResponseType> {
    return this.http.post<IDayTimeTable>(this.resourceUrl, dayTimeTable, { observe: 'response' });
  }

  update(dayTimeTable: IDayTimeTable): Observable<EntityResponseType> {
    return this.http.put<IDayTimeTable>(this.resourceUrl, dayTimeTable, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDayTimeTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDayTimeTable[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  saveAll(req?: IDayTimeTable[]): Observable<EntityArrayResponseType> {
    return this.http.post<IDayTimeTable[]>(this.resourceUrl + '/savebatch', req, { observe: 'response' });
  }
}
