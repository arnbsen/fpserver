import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITimeTable, OTimeTable } from 'app/shared/model/time-table.model';

type EntityResponseType = HttpResponse<ITimeTable>;
type EntityArrayResponseType = HttpResponse<ITimeTable[]>;

@Injectable({ providedIn: 'root' })
export class TimeTableService {
  public resourceUrl = SERVER_API_URL + 'api/time-tables';

  constructor(protected http: HttpClient) {}

  create(timeTable: ITimeTable): Observable<EntityResponseType> {
    return this.http.post<ITimeTable>(this.resourceUrl, timeTable, { observe: 'response' });
  }

  update(timeTable: ITimeTable): Observable<EntityResponseType> {
    return this.http.put<ITimeTable>(this.resourceUrl, timeTable, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ITimeTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findOrg(id: string): Observable<EntityResponseType> {
    return this.http.get<OTimeTable>(`${this.resourceUrl}/org/${id}`, { observe: 'response' });
  }

  findByYearSemDept(req?: ITimeTable): Observable<EntityResponseType> {
    return this.http.post<OTimeTable>(`${this.resourceUrl}/deptyearsem`, req, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITimeTable[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
