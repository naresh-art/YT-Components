import { LightningElement,api } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import Account_Type from '@salesforce/schema/Account.Type';
import Account_Phone from '@salesforce/schema/Account.Phone';
import Account_Rating from '@salesforce/schema/Account.Rating';
import AccountIndustry from '@salesforce/schema/Account.Industry';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LdsRecordFormUpdateExample extends LightningElement {
    @api recordId;
    @api objectApiName;
    fields = [NAME_FIELD,Account_Type,Account_Phone,Account_Rating,AccountIndustry];

    handleAccountUpdate(event){
        console.log('objectApiName:::'+this.objectApiName);
        console.log('event.detail.id:::'+event.detail.id);
        const evt = new ShowToastEvent({
            title: 'Account Updated Sucessfully',
            message: "Record Details: " + event.detail.fields.Name.value,
            variant: "success"
        });
        this.dispatchEvent(evt);       
    }

}