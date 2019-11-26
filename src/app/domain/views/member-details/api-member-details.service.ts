import { AppConfigService } from '../../../../environments/app-config.service';
import { Subject, Observable } from 'rxjs';
import { HttpResponseBody } from '../../../core/objects/HttpResponseBody';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class ApiMemberDetailsService {
    headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    API_MEMBER_DETAILS_URL: any;

    constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private appConfig: AppConfigService) {
        this.API_MEMBER_DETAILS_URL = appConfig.getConfig().API_MEMBER_DETAILS_URL;
    }

    createMember(member): Observable<HttpResponseBody> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const access_token = localStorage.getItem('access_token');
        if (access_token)
            headers = new HttpHeaders({ Authorization: `Bearer ${access_token}` ,'Content-Type': 'application/json' });
        return this.http.get<HttpResponseBody>(
            `${this.API_MEMBER_DETAILS_URL}/getuser`, { headers: headers }
        );
    }

    // createMember(member): Observable<HttpResponseBody> {
    //     let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const access_token = localStorage.getItem('access_token');
    //     if (access_token)
    //         headers = new HttpHeaders({ Authorization: `Bearer ${access_token}` ,'Content-Type': 'application/json' });
    //     return this.http.post<HttpResponseBody>(
    //         `${this.API_MEMBER_DETAILS_URL}/getuser`, JSON.stringify(member), { headers: headers }
    //     );
    // }

    getMemberById(id: String): Observable<HttpResponseBody> {
        return this.http.get<HttpResponseBody>(
            `${this.API_MEMBER_DETAILS_URL}/member/getById/${id}`, { headers: this.headers }
        );
    }

    getMemberGroupList(): Observable<HttpResponseBody> {
        return this.http.get<HttpResponseBody>(
            `${this.API_MEMBER_DETAILS_URL}/memberGroup/getAll`, { headers: this.headers }
        );
    }

    getMemberGroupById(id: String): Observable<HttpResponseBody> {
        return this.http.get<HttpResponseBody>(
            `${this.API_MEMBER_DETAILS_URL}/memberGroup/getById/${id}`, { headers: this.headers }
        );
    }
}
