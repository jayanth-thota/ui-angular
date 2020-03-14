import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SectorsService } from '../sectors.service';
import { CompanyService } from '../company.service';
import { StockpriceService } from '../stockprice.service';
import { HighchartsService } from './HighchartsService.service';
import { Company } from '../company';
import { Sectors } from '../sectors';
import { Stockprice } from '../stockprice';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-comparecompany',
  templateUrl: './comparecompany.component.html',
  styleUrls: ['./comparecompany.component.css']
})
export class ComparecompanyComponent implements OnInit {

  myGroup: FormGroup;



  constructor(private hcs: HighchartsService, private formBuilder: FormBuilder, private router: Router, private companyservice: CompanyService, private sectorsservice: SectorsService, private stockpriceservice: StockpriceService) { }



  companyList: Company[];



  companyListAll: Company[];



  sectorsList: Sectors[];



  stockpriceList: Observable<Stockprice[]>;



  ngOnInit() {



    this.stockpriceservice.getmultiplelinechart().subscribe(result => {



      var formatteddata = [];



      for (var key in result) {



        var singleObject = {



          name: '',



          data: []



        }



        singleObject.name = key.toUpperCase();



        for (var i = 0; i < result[key].length; i++) {



          singleObject.data.push(parseInt(result[key][i].currentPrice));



        }



        formatteddata.push(singleObject);



      }



      this.drawMultipleLineChart(formatteddata);



    });



    this.myGroup = this.formBuilder.group({



      "choose": new FormControl([Validators.required]),



      "sectorName": new FormControl([Validators.required]),



      "companyName": new FormControl([Validators.required]),



      "fromdate": new FormControl([Validators.required]),



      "todate": new FormControl([Validators.required])



    })



    this.companyservice.getAllcompanies().subscribe(data => {



      this.companyList = data;



      this.companyListAll = data;



      this.companyList = this.companyList.filter(comp => comp.sector == 'NSE');



    })



    this.stockpriceservice.getAllstockprice().subscribe(data => {



      this.stockpriceList = data;



    })



    this.sectorsservice.getAllsectors().subscribe(data => {



      this.sectorsList = data;



    })



  }



  sectorChange() {



    alert(1234);



    var sectorValue = this.myGroup.controls['sectorName'].value;



    this.companyList = this.companyListAll.filter(comp => comp.sector == sectorValue);



  }



  drawMultipleLineChart(formatteddata) {



    Highcharts.chart('container', {



      title: {



        text: 'Solar Employment Growth by Sector, 2010-2019'



      },



      subtitle: {



        text: 'Source: thesolarfoundation.com'



      },



      yAxis: {



        title: {



          text: 'Number of Employees'



        }



      },



      legend: {



        layout: 'vertical',



        align: 'right',



        verticalAlign: 'middle'



      },



      plotOptions: {



        series: {



          label: {



            connectorAllowed: false



          },



          pointStart: 2000



        }



      },



      series: formatteddata,



      responsive: {



        rules: [{



          condition: {



            maxWidth: 500



          },



          chartOptions: {



            legend: {



              layout: 'horizontal',



              align: 'center',



              verticalAlign: 'bottom'



            }



          }



        }]



      }



    });



  }
}












