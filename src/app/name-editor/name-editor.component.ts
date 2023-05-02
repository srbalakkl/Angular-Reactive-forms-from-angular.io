import { Component, OnInit } from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {forbiddenNameValidator} from "../profile-editor/profile-editor.component";

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name = new UntypedFormControl('');

  updateName() {
    this.name.setValue('bala')
    // this.name.patchValue('bala')
  }
}
