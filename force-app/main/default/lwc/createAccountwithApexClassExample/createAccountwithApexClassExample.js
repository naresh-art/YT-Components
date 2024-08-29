import { LightningElement, track, wire } from 'lwc';
import createAccount from '@salesforce/apex/CreateAccountController.createAccount';
import getAccountTypePicklistValues from '@salesforce/apex/CreateAccountController.getAccountTypePicklistValues';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

import Account_Name from '@salesforce/schema/Account.Name';
// import Account_Type from '@salesforce/schema/Account.Type';
import Account_Phone from '@salesforce/schema/Account.Phone';

import { getPicklistValues } from "lightning/uiObjectInfoApi";
import Account_Type from "@salesforce/schema/Account.Type";

export default class CreateAccountwithApexClassExample extends NavigationMixin(LightningElement) {
    // @track accountRecord = {
    //     Name: '',
    //     Type: '',
    //     Phone: ''
    // };

    @track accountRecord = {
        Name: Account_Name,
        Type: Account_Type,
        Phone: Account_Phone
    };
    @track accountTypes = [];

    // @wire(getAccountTypePicklistValues)
    // wiredAccountTypePicklist({ error, data }) {
    //     if (data) {
    //         console.log('picklist Values data::'+JSON.stringify(data));
    //         this.accountTypes = data.map(type => ({
    //             label: type,
    //             value: type
    //         }));
    //         console.log('accountTypes Values data::'+JSON.stringify(this.accountTypes));
    //     } else if (error) {
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Error loading Account Types',
    //                 message: error.body.message,
    //                 variant: 'error'
    //             })
    //         );
    //     }
    // }

    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: Account_Type })
    picklistResults({ error, data }) {
      if (data) {
        console.log('picklist Values data::'+JSON.stringify(data));
        this.accountTypes = data.values;
        this.error = undefined;
        console.log('accountTypes Values data::'+JSON.stringify(this.accountTypes));
      } else if (error) {s
        this.error = error;
        this.accountTypes = undefined;
      }
    }

    handleNameChange(event) {
        this.accountRecord.Name = event.target.value;
    }

    handleTypeChange(event) {
        this.accountRecord.Type = event.detail.value;
        console.log('this.accountRecord.Type ::'+this.accountRecord.Type); 
    }

    handlePhoneChange(event) {
        this.accountRecord.Phone = event.target.value;
    }

    handleSaveAccount() {
        createAccount({ accountObj: this.accountRecord })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created with Id: ' + result.Id,
                        variant: 'success'
                    })
                );
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: result.Id,
                        objectApiName: 'Account',
                        actionName: 'view'
                    }
                });
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}
