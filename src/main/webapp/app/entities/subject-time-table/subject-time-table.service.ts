import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubjectTimeTable } from 'app/shared/model/subject-time-table.model';

type EntityResponseType = HttpResponse<ISubjectTimeTable>;
type EntityArrayResponseType = HttpResponse<ISubjectTimeTable[]>;

@Injectable({ providedIn: 'root' })
export class SubjectTimeTableService {
  public resourceUrl = SERVER_API_URL + 'api/subject-time-tables';

  constructor(protected http: HttpClient) {}

  create(subjectTimeTable: ISubjectTimeTable): Observable<EntityResponseType> {
    return this.http.post<ISubjectTimeTable>(this.resourceUrl, subjectTimeTable, { observe: 'response' });
  }

  update(subjectTimeTable: ISubjectTimeTable): Observable<EntityResponseType> {
    return this.http.put<ISubjectTimeTable>(this.resourceUrl, subjectTimeTable, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISubjectTimeTable>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubjectTimeTable[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
