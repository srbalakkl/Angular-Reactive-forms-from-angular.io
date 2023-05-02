import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormArray, UntypedFormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

//todo: the export function must be declared above the component

export function forbiddenNameValidator(newRegExp: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = newRegExp.test(control.value);
        // console.log("control.value is "+control.value);
        return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
}

@Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.component.html',
    styleUrls: ['./profile-editor.component.css']
})

export class ProfileEditorComponent implements OnInit {

    profileForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/bala/i)]],
        lastName: [''],
        address: this.fb.group({
            street: [''],
            city: [''],
            state: [''],
            zip: [''],
        }),
        aliases: this.fb.array([]),
        contactNumbers: this.fb.array([])
    });

    constructor(private fb: UntypedFormBuilder) {

    }

    get aliases() {
        return this.profileForm.get('aliases') as UntypedFormArray;
    }

    /* todo: Steps to define formArray
      Import the FormArray class.
      Define a FormArray control.
      Access the FormArray control with a getter method.
    */

    /**
     * Recalculates the value and validation status of the control.
     *
     * By default, it also updates the value and validity of its ancestors.
     *
     * @param opts Configuration options determine how the control propagates changes and emits events
     * after updates and validity checks are applied.
     *
     * * `onlySelf`: When true, only update this control. When false or not supplied,
     * update all direct ancestors. Default is false..
     *
     * * `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
     * `valueChanges`
     *
     * observables emit events with the latest status and value when the control is updated.
     * When false, no events are emitted.
     */


    get firstName() {
        return this.profileForm.get('firstName');
    }

    get getContactNumbers(): UntypedFormArray {
        return this.profileForm.get('contactNumbers') as UntypedFormArray;
    }

    get primaryNo() {
        return this.profileForm.get('contactNumbers');
    }

    ngOnInit(): void {
        this.addContacts();
    }

    onSubmit() {
        console.log(this.profileForm.value)
        /*        let cv = this.profileForm.get('contactNumbers[0].primaryNo')?.value;
                console.log(cv);*/

        for (let i = 0; i < this.getContactNumbers.length; i++) {
            console.log(this.getContactNumbers.at(i).get('primaryNo')?.value);
            console.log(this.getContactNumbers.at(i).get('secondaryNo')?.value);
            console.log('\n\n');
        }
    }

    updateProfile() {
        //todo: patchValue() WILL WORK EVEN IF YOU ARE PASSING A SINGLE VALUE IN THE FORM GROUP.
        this.profileForm.patchValue({
            firstName: 'Nancy',
            address: {
                street: '123 Drew Street'
            }
        });
    }

    updateProfileSet() {
        //todo: Note: the setValue() "catches the nesting error" in forms while "patchValue() fails" silently on these error.

        //todo: SetValue() DOESN'T WORK FOR IF YOU'RE USING setvalue ON A formgroup BUT DOES NOT PASSING A VALUE FOR EVERY CONTROL WITHIN THAT GROUP.

        this.profileForm.setValue({
            firstName: 'setValue',
            address: {
                street: '123 Drew Street SET'
            }
        });

    }

    addAlias() {
        this.aliases.push(this.fb.control('', []));
    }

    addContacts() {
        //doc: In a situation like this(i.e When we have 2 or more fields) we have to always push it as the form group instead of formControl

        this.getContactNumbers.push(
            this.fb.group({
                primaryNo: [''],
                secondaryNo: ['']
            })
        );
    }

    disableAddress() {
        //This will disable the address group of the form.
        return this.profileForm.get('address')?.disable({emitEvent: false})
        //    todo: We can disable the specific FormControl Name by typing FC Name followed by the group name.
        //    todo: eg: return this.profileForm.get('address.street')?.disable({emitEvent:false})
    }

    deleteFormGroup(i: number) {
        return this.getContactNumbers.removeAt(i);
    }

    getAliasValue() {
        console.log(this.aliases.value)
    }
}
