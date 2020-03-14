import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable, from} from 'rxjs';  
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:8021/CompanyRelated/companyrelated'; 

  constructor(private http:HttpClient) { }

  getAllcompanies(): Observable<any> {  
    return this.http.get<any>(this.baseUrl+'/getAllcompanies');  
  } 
 
  saveCompany(companyrelated:Company):Observable<Company>{

    return this.http.post<Company>(this.baseUrl+'/savecompany',companyrelated);
  
   }
  
  
  updateCompany(companyName:String, value:Company):Observable<object>{
    return this.http.put<Company>(this.baseUrl+'/updatecompany/companyName',companyName);
  }
  
  find(companyName:String):Observable<Company>{
  
    return this.http.get<Company>(this.baseUrl+'/find/'+companyName);
  
   }

  deletecompany(companyName:String):Observable<object>{
    return this.http.delete<Company>(this.baseUrl+'/deletecompany/'+companyName);
    
      }




}
