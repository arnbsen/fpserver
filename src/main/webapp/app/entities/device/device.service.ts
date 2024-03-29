import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDevice, ODevice } from 'app/shared/model/device.model';

type EntityResponseType = HttpResponse<IDevice>;
type EntityArrayResponseType = HttpResponse<IDevice[]>;

@Injectable({ providedIn: 'root' })
export class DeviceService {
  public resourceUrl = SERVER_API_URL + 'api/devices';

  constructor(protected http: HttpClient) {}

  create(device: IDevice): Observable<EntityResponseType> {
    return this.http.post<IDevice>(this.resourceUrl, device, { observe: 'response' });
  }

  update(device: IDevice): Observable<EntityResponseType> {
    return this.http.put<IDevice>(this.resourceUrl, device, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDevice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDevice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllODevices(): Observable<HttpResponse<ODevice[]>> {
    return this.http.get<ODevice[]>(`${this.resourceUrl}/all`, { observe: 'response' });
  }
}
