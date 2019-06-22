import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcademicSession } from 'app/shared/model/academic-session.model';

type EntityResponseType = HttpResponse<IAcademicSession>;
type EntityArrayResponseType = HttpResponse<IAcademicSession[]>;

@Injectable({ providedIn: 'root' })
export class AcademicSessionService {
  public resourceUrl = SERVER_API_URL + 'api/academic-sessions';

  constructor(protected http: HttpClient) {}

  create(academicSession: IAcademicSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(academicSession);
    return this.http
      .post<IAcademicSession>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(academicSession: IAcademicSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(academicSession);
    return this.http
      .put<IAcademicSession>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IAcademicSession>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findNow(): Observable<EntityResponseType> {
    return this.http
      .get<IAcademicSession>(`${this.resourceUrl}/now`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAcademicSession[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(academicSession: IAcademicSession): IAcademicSession {
    const copy: IAcademicSession = Object.assign({}, academicSession, {
      startDate: academicSession.startDate != null && academicSession.startDate.isValid() ? academicSession.startDate.toJSON() : null,
      endDate: academicSession.endDate != null && academicSession.endDate.isValid() ? academicSession.endDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((academicSession: IAcademicSession) => {
        academicSession.startDate = academicSession.startDate != null ? moment(academicSession.startDate) : null;
        academicSession.endDate = academicSession.endDate != null ? moment(academicSession.endDate) : null;
      });
    }
    return res;
  }
}
