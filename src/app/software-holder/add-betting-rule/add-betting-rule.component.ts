import { registerLocaleData } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedFunctionsService } from 'src/app/services/shared-functions.service';

@Component({
  selector: 'app-add-betting-rule',
  templateUrl: './add-betting-rule.component.html',
  styleUrls: ['./add-betting-rule.component.css']
})
export class AddBettingRuleComponent implements OnInit {
  addMasterForm: any;
  form: any;
  sportsList:any = [];

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
     public sharedFunctions:SharedFunctionsService,
     private dataService:DataService,
      private notify:NotificationService) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.loadSports();
    this.form = this.addMasterForm.controls;

    if(this.data.update){
      // this.addMasterForm.value = this.data.obj;
      this.addMasterForm.reset(this.data.obj);
    }
  }

  initalizeForm() {

    let objValidation:any = {
      eventTypeId: new FormControl(null, Validators.required),
      betType: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      minAmount: new FormControl(null, [Validators.required]),
      maxAmount: new FormControl(null, [Validators.required]),
      multiplier: new FormControl(null, Validators.required),
      minMatch: new FormControl(null, [Validators.required]),
      minFigure: new FormControl(null, [Validators.required]),
      maxMargin: new FormControl(null, Validators.required),
      isActive: new FormControl(false, Validators.required),
      disableOnFalse: new FormControl(false, Validators.required),
      forceRule: new FormControl(false, Validators.required),
      // commission: new FormControl(null, Validators.required),
      // walletCurrency: new FormControl(null, Validators.required),
    }

    

    this.addMasterForm = this.fb.group(objValidation);

  }

  loadSports(){
    this.dataService.getSports().subscribe(resp => {
      this.sportsList = resp.body;
    })
  }



  addRule(){

    this.dataService.addBettingRules(this.addMasterForm.value).subscribe(resp => {

      this.notify.success('Rule Added');

    }, error => {
        try{
          let msg = error.error.fields[Object.keys(error.error.fields)[0]]; 
          if( msg !== undefined){
            this.notify.error(msg);
          }else{
            this.notify.error('Error adding rule');
          }
        }
        catch(ex){
          this.notify.error('Error adding rule');
        }

    })
  }

}
