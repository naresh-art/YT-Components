//With Java Script Method "createRecord"
// import { LightningElement,track } from 'lwc';
// import { createRecord } from 'lightning/uiRecordApi';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import { NavigationMixin } from 'lightning/navigation';
// import CONTACT_OBJECT from '@salesforce/schema/Contact';
// import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
// import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
// import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';
// export default class CreateContactWithLookupAccountExample extends NavigationMixin(LightningElement) {
//     @track selectedAccountId;
//     @track contactId;
//     @track selectedIndustry;
//     name = '';
//     phone = '';
//     handleChange(event) {
//         console.log(event.target.label);
//         console.log(event.target.value);        
//         if(event.target.label=='Last Name'){
//             this.name = event.target.value;
//         }           
//         if(event.target.label=='Phone'){
//             this.phone = event.target.value;
//         }           
//     }
//     createContact(){
//         console.log(this.selectedAccountId);
//         const fields = {};
//         fields[LAST_NAME_FIELD.fieldApiName] = this.name;
//         fields[PHONE_FIELD.fieldApiName] = this.phone;
//         fields[ACCOUNTID_FIELD.fieldApiName] = this.selectedAccountId;
//         const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
//         createRecord(recordInput)
//             .then(contactobj=> {
//                 this.contactId = contactobj.id;
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Success',
//                         message: 'Contact created',
//                         variant: 'success',
//                     }),
//                 );
//                 this[NavigationMixin.Navigate]({
//                     type: 'standard__recordPage',
//                     attributes: {
//                         recordId: contactobj.id,
//                         objectApiName: 'Contact',
//                         actionName: 'view'
//                     },
//                 });



//             })
//             .catch(error => {
//                 this.dispatchEvent(
//                     new ShowToastEvent({
//                         title: 'Error creating record',
//                         message: error.body.message,
//                         variant: 'error',
//                     }),
//                 );
//             });
//     }
//     handleSelected(event){
//         console.log(event.detail);
//         this.selectedAccountId = event.detail;
//     }
// }


//with apex class
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import createContact from '@salesforce/apex/CustomLookupCntrl.createContact';

export default class CreateContactWithApex extends NavigationMixin(LightningElement) {
    @track selectedAccountId;
    @track contactId;
    name = '';
    phone = '';

    handleChange(event) {
        if(event.target.label === 'Last Name'){
            this.name = event.target.value;
        } else if(event.target.label === 'Phone'){
            this.phone = event.target.value;
        }
    }

    createContact() {
        createContact({ lastName: this.name, phone: this.phone, accountId: this.selectedAccountId })
            .then(result => {
                this.contactId = result;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created',
                        variant: 'success',
                    })
                );
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: this.contactId,
                        objectApiName: 'Contact',
                        actionName: 'view'
                    },
                });
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

    handleSelected(event){
        this.selectedAccountId = event.detail;
    }
}
