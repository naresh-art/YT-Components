import { LightningElement, track } from 'lwc';
import createAccount from '@salesforce/apex/CreateAccountController.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import Account_Name from '@salesforce/schema/Account.Name';
import Account_Type from '@salesforce/schema/Account.Type';
import Account_Phone from '@salesforce/schema/Account.Phone';

export default class CreateAccountwithApexClassExample extends NavigationMixin(LightningElement) {
    @track accountRecord = {
        Name: Account_Name,
        Type: Account_Type,
        Phone: Account_Phone
    };

    handleNameChange(event) {
        this.accountRecord.Name = event.target.value;
    }

    handleTypeChange(event) {
        this.accountRecord.Type = event.target.value;
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
                // Navigate to the newly created Account's detail page
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: result.Id,
                        objectApiName: 'Account',
                        actionName: 'view'
                    },
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