import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stockprice } from './stockprice';

@Injectable({
  providedIn: 'root'
})
export class StockpriceService {
  private baseUrl = 'http://localhost:8021/StockPrice/stockprice'; 

  constructor(private http:HttpClient) { }

 
  getAllstockprice(): Observable<any> {  
    return this.http.get<any>(this.baseUrl+'/getAllstockprice');  
  }  


  saveStockprice(stockprice:Stockprice): Observable<Stockprice> {  
    return this.http.post<Stockprice>(this.baseUrl+'/savestockprice',stockprice);  
  }  

  updateStockPrice(stockExchange:String, value:Stockprice):Observable<object>{
    return this.http.put<Stockprice>(this.baseUrl+'/updatestockprice/{stockExchange}',stockExchange);
  }
  
  find(stockExchange:String):Observable<Stockprice>{
  
    return this.http.get<Stockprice>(this.baseUrl+'/find/'+stockExchange);
  
   }
  

  deleteStockPrice(stockExchange:String):Observable<object>{

   return this.http.delete<Stockprice>(this.baseUrl+'/deletestockprice/'+stockExchange);
  
    }
    getmultiplelinechart(): Observable<any> {







      return this.http.get(`${this.baseUrl}`+'/multiplelinechart');
    
    
    
    
    
    
    
      }
    
    
    
    
    
    
    
      uploadFile(file: File, stockExchange: String): Observable<any> {
    
    
    
    
    
    
    
      let url = this.baseUrl + "uploadfile/" + stockExchange;
    
    
    
    
    
    
    
      const formdata: FormData = new FormData();
    
    
    
    
    
    
    
      formdata.append('file', file);
    
    
    
    
    
    
    
      return this.http.post(url, formdata);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
      }
    
    
    
    
    
     





}
