import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as echarts from 'echarts';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';

export interface UserData {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-district-dashboard',
  templateUrl: './district-dashboard.component.html',
  styleUrls: ['./district-dashboard.component.scss']
})
export class DistrictDashboardComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ids = ["app_not_active_pie","gps_off_pie","photo_not_recived_pie","gone_outside_pie","raised_alarm_pie"];
  vals:any = {
   "app_not_active_pie":{val:2,name:"App not active"},
   "gps_off_pie":{val:4,name:"GPS off"},
   "photo_not_recived_pie":{val:4,name:"Photo not recived"},
   "gone_outside_pie":{val:4,name:"Gone outside radius"},
   "raised_alarm_pie":{val:7,name:"Raised alarm"},
 };

 qurantinedCitizens:number = 23;

  dataSource: any = [];
  displayedColumns: string[] = ['id','name', 'age', 'qurantineDay','GPSoff','raisedAlarm','areapincode','goneOutsideRadius','photoMissing','notifyMO'];

  public notifyMO(e:any):void{
    console.log(e);
     let headers = new HttpHeaders();
       headers = headers.set('Content-Type', 'application/json; charset=utf-8');
       this.http.post('http://localhost:4000/notifymo',{"id":e.id},{headers:headers}).subscribe(res=>{
         console.log(res);
       });
  }

  public genrateTimeline():void{
    let conf_pos = [23,4,5,7,81,12,64];
    let deaths = [1,2,3,2,7,5,0];
    let cured = [1,0,0,0,2,1,3];
    let quarantined = [12,15,20,21,18,25,27];

    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        bottom: 73,
        left: 77,
        top: 55,
        right: 45
      },
      toolbox: {
        showTitle: false,
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: false, readOnly: false },
          magicType: { show: true, type: ['line'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        top: 28,
        x: 'right',
        data: ['Confirmed +ve', 'Cured', 'Quarantined','Deaths']
      },
      xAxis: {
        type: 'category',
        data: ["22 Mar","23 Mar","24 Mar","25 Mar","26 Mar","27 Mar","28 Mar"],
        name: 'Duration',
        nameGap: 45,
        nameLocation: 'middle',
        axisLabel: {interval: 0,rotate: -30},
        splitLine: {show: true},
        axisLine: {lineStyle: {color: 'grey'}}
      },
      yAxis: {
        type: 'value',
        name: 'Count',
        nameGap: 55,
        nameLocation: 'middle',
        splitLine: {show: false},
        axisLine: {lineStyle: {color: 'grey'}}
      },
      series: [{
        data: conf_pos,
        type: 'bar',
        name: 'Confirmed +ve',
        stack: 'Confirmed +ve',
        // barWidth: '60%',
        itemStyle: {
          normal: {
            color: '#ff9c75',
            label: {
              show: false,
              position: 'top',
              formatter: '{b}\n{c}'
            }
          }
        },
      },
      {
        data: cured,
        type: 'bar',
        name: 'Cured',
        stack: 'Cured',
        itemStyle: {
          normal: {
            color: '#87ceab',
            label: {
              show: false,
              position: 'top',
              formatter: '{b}\n{c}'
            }
          }
        },
      },
      {
        data: quarantined,
        type: 'bar',
        name: 'Quarantined',
        stack: 'Quarantined',
        itemStyle: {
          normal: {
            color: '#5fbed9',
            label: {
              show: false,
              position: 'top',
              formatter: '{b}\n{c}'
            }
          }
        }
      },
      {
        data: deaths,
        type: 'bar',
        name: 'Deaths',
        stack: 'Deaths',
        itemStyle: {
          normal: {
            color: '#ce3d51',
            label: {
              show: false,
              position: 'top',
              formatter: '{b}\n{c}'
            }
          }
        },
      }]
    };
    echarts.dispose(document.getElementById('timeline'));
    echarts.init(document.getElementById('timeline')).setOption(option);
  }

  public updatePies():void{
     let ids = ["app_not_active_pie","gps_off_pie","photo_not_recived_pie","gone_outside_pie","raised_alarm_pie"];
    let vals:any = {
      "app_not_active_pie":{val:2,name:"App not active"},
      "gps_off_pie":{val:4,name:"GPS off"},
      "photo_not_recived_pie":{val:4,name:"Photo not recived"},
      "gone_outside_pie":{val:4,name:"Gone outside radius"},
      "raised_alarm_pie":{val:7,name:"Raised alarm"},
    }

    ids.forEach(id => {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br> {c} ({d}%)',
          position: ['0%', '50%']
        },
        legend: {
          show: false,
          orient: 'vertical',
          left: 10
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            color: ["#91c7ae", "#d48265"],
            labelLine: {
              show: false
            },
            data: [
              { value: vals[id].val, name: vals[id].name },
              { value: this.qurantinedCitizens - vals[id].val, name: "Qurantined" },
            ]
          }
        ]

      }

      echarts.dispose(document.getElementById(id));
      echarts.init(document.getElementById(id)).setOption(option);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyDataFilters(){

  }

  raisedRequestDataSet:any = [];

  constructor(private http:HttpClient,private toastrService: NbToastrService) { }

  ngOnInit() {

    this.http.get('http://localhost:4000/getallcitizens').subscribe((res:any)=>{
      console.log("getallcitizens");
      console.log(res);
      for(let i=0;i<res.data.length;i++){
        this.dataSource.push({
         'id':res.data[i].id,'name':res.data[i].firstName +' '+res.data[i].lastName, 'age':res.data[i].age, 'qurantineDay':res.data[i].qurantineDay,'GPSoff':res.data[i].GPSoff,'raisedAlarm':res.data[i].raisedAlarm,'areapincode':res.data[i].areapincode,'goneOutsideRadius':res.data[i].goneOutsideRadius,'photoMissing':res.data[i].photoMissing,'notifyMO':res.data[i].visitedMO});    
      }

    this.dataSource = new MatTableDataSource(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });


    this.http.get('http://localhost:4000/raisedrequests').subscribe((res:any)=>{
      console.log("getallcitizens");
      console.log(res);
      for(let i=0;i<res.data.length;i++){
        this.raisedRequestDataSet.push({
         'id':res.data[i].id,'name':res.data[i].firstName +' '+res.data[i].lastName, 'age':res.data[i].age, 'qurantineDay':res.data[i].qurantineDay,'GPSoff':res.data[i].GPSoff,'raisedAlarm':res.data[i].raisedAlarm,'areapincode':res.data[i].areapincode,'goneOutsideRadius':res.data[i].goneOutsideRadius,'photoMissing':res.data[i].photoMissing,'notifyMO':res.data[i].visitedMO});    
      }

    this.raisedRequestDataSet = new MatTableDataSource(this.raisedRequestDataSet);
    this.raisedRequestDataSet.paginator = this.paginator;
    this.raisedRequestDataSet.sort = this.sort;
    });
    
  }

  ngAfterViewInit(){

      setTimeout(() => {
        this.genrateTimeline();
        this.updatePies();
      }, 500);
  }
}
