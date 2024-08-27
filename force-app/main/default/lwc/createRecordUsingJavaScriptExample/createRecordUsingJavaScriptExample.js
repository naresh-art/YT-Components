import { LightningElement,track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class CreateRecordUsingJavaScriptExample extends NavigationMixin(LightningElement) {
    @track accountName='';
    @track accountPhone='';

    handleNameChange(event){
        this.accountName = event.target.value;
    }

    handlePhoneChange(event){
        this.accountPhone = event.target.value;
    }

    createAccount(){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.accountName;
        fields[PHONE_FIELD.fieldApiName] = this.accountPhone;

        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
        .then(account => {
            console.log('account Details:'+account);
            console.log('account Id:'+account.id);
            // Show success toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created with Id: ' +account.id,
                    variant: 'success',
                }),
            );

            // Navigate to the newly created Account's detail page
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: account.id,
                    objectApiName: 'Account',
                    actionName: 'view'
                },
            });
        })
        .catch(error => {
            // Show error toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        });
    }
}