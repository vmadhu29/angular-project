import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  response: any;
  res_msg: any;
  success: any;
  error!: string;
  dtOptions: DataTables.Settings = {};
  constructor(private http: HttpClient,
    private router : Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/get-users').subscribe( res => {
          this.response = res;
          if(this.response.success!=""){
            this.success = this.response.success; 
          }else{
            this.error = this.response.error;
          }
          
          setTimeout(()=>{   
            $('#datatable').DataTable( {
              pagingType: 'full_numbers',
              pageLength: 5,
              processing: true,
              lengthMenu : [5, 10, 25]
          } );
          }, 1);
      }, 
      error => console.error(error));
   
  }

  onClick(event: any) {
    let Params = new HttpParams();
    Params = Params.append('firstParameter', event);
    return this.http.post('http://localhost:8000/api/del-user',{
          params: { params: Params }
        }).subscribe( res => {
            this.res_msg = res;
    })
  }
}
