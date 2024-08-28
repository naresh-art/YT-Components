import { LightningElement, track, api} from 'lwc';
import createContact from '@salesforce/apex/CreateAccountController.createContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Contact_FirstName from '@salesforce/schema/Contact.FirstName';
import Contact_LastName from '@salesforce/schema/Contact.LastName';
import Contact_Phone from '@salesforce/schema/Contact.Phone';
import Contact_AccountId from '@salesforce/schema/Contact.AccountId';
export default class CreateContactWithApexClassExample extends LightningElement {
    @api recordId;
    @track contactRecord = {
        FirstName: Contact_FirstName,
        LastName: Contact_LastName,
        Phone: Contact_Phone,
        AccountId: Contact_AccountId
    };

    // connectedCallback(){
    //     console.log('this.recordId::'+this.recordId);
    //     this.contactRecord.AccountId = this.recordId;
    //     console.log('this.contactRecord.AccountID::'+this.contactRecord.AccountId);
    // }

    handleFirstNameChange(event) {
        this.contactRecord.FirstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.contactRecord.LastName = event.target.value;
    }

    handlePhoneChange(event) {
        this.contactRecord.Phone = event.target.value;
    }

    handleSaveContact() {
        console.log('this.recordId::'+this.recordId);
        this.contactRecord.AccountId = this.recordId;
        console.log('this.contactRecord.AccountID::'+this.contactRecord.AccountId);
        createContact({ contactObj: this.contactRecord })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created with Id: ' + result.Id,
                        variant: 'success'
                    })
                );
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