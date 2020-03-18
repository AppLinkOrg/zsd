import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class OrderApi {

    constructor(public http: HttpClient) {

    }


    public addhuodanshuju(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'order/addhuodanshuju';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('order/addhuodanshuju', data, err);
            });
    }

}
