import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  loginUser(data: { loginId: string; password: string }): Observable<any> {
    const url = `${environment.baseUrl}/auth/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }

  // Parked vehicle data
  // parkedVehicleData(): Observable<any> {
  //   const url = `${environment.baseUrl}/parking`;
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.get(url, { headers });
  // }

  parkedVehicleData(): Observable<any> {
    const url = `${environment.baseUrl}/parking/`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }

  // Parked vehicles by date range
  vehicleList(
    parkingId: string,
    page: number,
    orderBy: string,
    limit: number
  ): Observable<any> {
    const url = `${environment.baseUrl}/parking/${parkingId}/transaction?page=${page}&orderBy=${orderBy}&limit=${limit}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }

  // parking user
  parkingUserDetail(): Observable<any> {
    const url = `${environment.baseUrl}/user/teams/f5b0fc9f-ddde-4c3a-a25f-9ef679660db7`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }
}
