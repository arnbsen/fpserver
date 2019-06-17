import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBiometricBackup } from 'app/shared/model/biometric-backup.model';

type EntityResponseType = HttpResponse<IBiometricBackup>;
type EntityArrayResponseType = HttpResponse<IBiometricBackup[]>;

@Injectable({ providedIn: 'root' })
export class BiometricBackupService {
  public resourceUrl = SERVER_API_URL + 'api/biometric-backups';

  constructor(protected http: HttpClient) {}

  create(biometricBackup: IBiometricBackup): Observable<EntityResponseType> {
    return this.http.post<IBiometricBackup>(this.resourceUrl, biometricBackup, { observe: 'response' });
  }

  update(biometricBackup: IBiometricBackup): Observable<EntityResponseType> {
    return this.http.put<IBiometricBackup>(this.resourceUrl, biometricBackup, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IBiometricBackup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBiometricBackup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
