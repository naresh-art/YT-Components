import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import conObject from '@salesforce/schema/Contact';
import conFirstName from '@salesforce/schema/Contact.FirstName';
import conLastName from '@salesforce/schema/Contact.LastName';
import conBday from '@salesforce/schema/Contact.Birthdate';
import conEmail from '@salesforce/schema/Contact.Email';
import conDepartment from '@salesforce/schema/Contact.Department';
import Account_Id from '@salesforce/schema/Contact.AccountId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateContactUsingJavaScriptExample extends LightningElement {
    @api recordId;
    firstName = '';
    lastName = '';
    bday = '';
    emailId = '';
    departmentVal = '';

    contactChangeVal(event) {
        const field = event.target.label;
        if (field === 'First Name') {
            this.firstName = event.target.value;
        } else if (field === 'Last Name') {
            this.lastName = event.target.value;
        } else if (field === 'Birth Date') {
            this.bday = event.target.value;
        } else if (field === 'Email') {
            this.emailId = event.target.value;
        } else if (field === 'Department') {
            this.departmentVal = event.target.value;
        }
    }

    insertContactAction() {
        const fields = {};
        fields[conFirstName.fieldApiName] = this.firstName;
        fields[conLastName.fieldApiName] = this.lastName;
        fields[conBday.fieldApiName] = this.bday;
        fields[conEmail.fieldApiName] = this.emailId;
        fields[conDepartment.fieldApiName] = this.departmentVal;
        fields[Account_Id.fieldApiName] = this.recordId;

        const recordInput = { apiName: conObject.objectApiName, fields };

        createRecord(recordInput)
            .then(contactobj => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact record has been created with ID: ' + contactobj.id,
                        variant: 'success',
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    })
                );
            });
    }
}
