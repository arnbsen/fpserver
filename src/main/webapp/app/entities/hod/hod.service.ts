import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHOD } from 'app/shared/model/hod.model';

type EntityResponseType = HttpResponse<IHOD>;
type EntityArrayResponseType = HttpResponse<IHOD[]>;

@Injectable({ providedIn: 'root' })
export class HODService {
  public resourceUrl = SERVER_API_URL + 'api/hods';

  constructor(protected http: HttpClient) {}

  create(hOD: IHOD): Observable<EntityResponseType> {
    return this.http.post<IHOD>(this.resourceUrl, hOD, { observe: 'response' });
  }

  update(hOD: IHOD): Observable<EntityResponseType> {
    return this.http.put<IHOD>(this.resourceUrl, hOD, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IHOD>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHOD[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
