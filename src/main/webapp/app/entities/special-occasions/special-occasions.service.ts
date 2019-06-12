import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISpecialOccasions } from 'app/shared/model/special-occasions.model';

type EntityResponseType = HttpResponse<ISpecialOccasions>;
type EntityArrayResponseType = HttpResponse<ISpecialOccasions[]>;

@Injectable({ providedIn: 'root' })
export class SpecialOccasionsService {
  public resourceUrl = SERVER_API_URL + 'api/special-occasions';

  constructor(protected http: HttpClient) {}

  create(specialOccasions: ISpecialOccasions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(specialOccasions);
    return this.http
      .post<ISpecialOccasions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(specialOccasions: ISpecialOccasions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(specialOccasions);
    return this.http
      .put<ISpecialOccasions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ISpecialOccasions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISpecialOccasions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(specialOccasions: ISpecialOccasions): ISpecialOccasions {
    const copy: ISpecialOccasions = Object.assign({}, specialOccasions, {
      date: specialOccasions.date != null && specialOccasions.date.isValid() ? specialOccasions.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((specialOccasions: ISpecialOccasions) => {
        specialOccasions.date = specialOccasions.date != null ? moment(specialOccasions.date) : null;
      });
    }
    return res;
  }
}
