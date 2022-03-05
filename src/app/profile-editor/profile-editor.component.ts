import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

//todo: the exporat function must be declared above the component

export function forbiddenNameValidator(newRegExp: RegExp) : ValidatorFn {
    return (control:AbstractControl):ValidationErrors | null =>{
        const forbidden = newRegExp.test(control.value);
        // console.log("control.value is "+control.value);
        return forbidden? {forbiddenName:{value:control.value}}:null;
    };
}

@Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.component.html',
    styleUrls: ['./profile-editor.component.css']
})

export class ProfileEditorComponent implements OnInit {

    ngOnInit(): void {
    }

    profileForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3),forbiddenNameValidator(/bala/i)]],
        lastName: [''],
        address: this.fb.group({
            street: [''],
            city: [''],
            state: [''],
            zip: [''],
        }), aliases: this.fb.array([this.fb.control('')])
    });

    constructor(private fb: FormBuilder) {

    }

    onSubmit() {
        console.log(this.profileForm.value)
    }

    updateProfile() {
        this.profileForm.patchValue({
            firstName: 'Nancy',
            address: {
                street: '123 Drew Street'
            }
        });
    }

    updateProfileSet() {
        //todo: Note: the setValue() "catches the nesting error" in forms while "patchValue() fails" silently on these error.
        this.profileForm.setValue({
            firstName: 'setValue', address: {
                street: '123 Drew Street SET'
            }
        });
    }

    /* todo: Steps to define formArray
      Import the FormArray class.
      Define a FormArray control.
      Access the FormArray control with a getter method.
      Display the form array in a template.*/

    get aliases() {
        return this.profileForm.get('aliases') as FormArray;
    }

    addAlias() {
        this.aliases.push(this.fb.control('', []));
    }

    get firstName() {
        return this.profileForm.get('firstName');
    }

    disableAddress() {
        //This will disable the address group of the form.
        return this.profileForm.get('address')?.disable({emitEvent:false})
    //    todo: We can disable the specific FormControl Name by typing FC Name followed by the group name.
    //    todo: eg: return this.profileForm.get('address.street')?.disable({emitEvent:false})
    }
}
