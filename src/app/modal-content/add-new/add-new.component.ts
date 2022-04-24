import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  public SignupForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    skill: new FormArray([]),
    hobby: new FormArray([])
  });

  constructor(private aModalService: NgbActiveModal, private formBuilder: FormBuilder, public toastr: ToastrService, private api: ApiService) { }

 
  ngOnInit(): void {
    //  console.log("hellp", this.users);
  }

  func_hobby() {
    return (this.SignupForm.get('hobby') as FormArray).controls;
  }

  func_skill() {
    return (this.SignupForm.get('skill') as FormArray).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.SignupForm.get('hobby')).push(control);
  }

  onAddSKill() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.SignupForm.get('skill')).push(control);
  }

  deleteHobby(item: any) {
    console.log("item", item);
    console.log(this.SignupForm.get('hobby'));
    (this.SignupForm.get('hobby') as FormArray).controls.splice(item, 1);
  }

  deleteSkill(item: any) {
    console.log("item", item);
    console.log(this.SignupForm.get('skill'));
    (this.SignupForm.get('skill') as FormArray).controls.splice(item, 1);
  }

  closeModal() {
    this.toastr.info('Close!Modal');
    this.aModalService.close();

  }

  async onSubmitForm() {
    const data = this.SignupForm.getRawValue();
    console.log("data before submit", data);

    const update = await this.api.createUser(data).toPromise();
    // this.api.createUser(data).subscribe((result) => {
    //   console.warn(result);
      
    // }
    // )
    // // console.log("update", update);
    this.api.createNewUserEvent.emit();
    this.toastr.success('Success!', 'Created new user!');
    this.aModalService.close();

    
    // this.api.createUser(data).subscribe(() => {
    // 
    // });
  }
  triggerEvent(item: string) {
   
  }

}
