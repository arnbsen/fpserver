import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IStudentCalc } from './model/studentcalc.model';
type EntityResponseType = HttpResponse<IStudentCalc>;
type EntityArrayResponseType = HttpResponse<IStudentCalc[]>;
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalcService {
  public resourceUrl = SERVER_API_URL + 'api/calc';

  constructor(protected http: HttpClient) {}

  findByStudent(id: string): Observable<EntityArrayResponseType> {
    return this.http.get<IStudentCalc[]>(`${this.resourceUrl}/student/${id}`, { observe: 'response' });
  }
  findByFaculty(id: string): Observable<EntityResponseType> {
    return this.http.get<IStudentCalc>(`${this.resourceUrl}/faculty/${id}`, { observe: 'response' });
  }
}
