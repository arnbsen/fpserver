import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIntermdiateUser } from 'app/shared/model/intermdiate-user.model';

type EntityResponseType = HttpResponse<IIntermdiateUser>;
type EntityArrayResponseType = HttpResponse<IIntermdiateUser[]>;

@Injectable({ providedIn: 'root' })
export class IntermdiateUserService {
  public resourceUrl = SERVER_API_URL + 'api/intermdiate-users';

  constructor(protected http: HttpClient) {}

  create(intermdiateUser: IIntermdiateUser): Observable<EntityResponseType> {
    return this.http.post<IIntermdiateUser>(this.resourceUrl, intermdiateUser, { observe: 'response' });
  }

  update(intermdiateUser: IIntermdiateUser): Observable<EntityResponseType> {
    return this.http.put<IIntermdiateUser>(this.resourceUrl, intermdiateUser, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IIntermdiateUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIntermdiateUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
