import { LightningElement,api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Account_Type from '@salesforce/schema/Account.Type';
import Account_Phone from '@salesforce/schema/Account.Phone';
import Account_Rating from '@salesforce/schema/Account.Rating';
import AccountIndustry from '@salesforce/schema/Account.Industry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class LdsRecordFormExample extends NavigationMixin(LightningElement) {
    objectApiName='Account';
    fields = [NAME_FIELD,Account_Type,Account_Phone,Account_Rating,AccountIndustry];
   
    handleAccountSubmit(event){
        console.log('objectApiName:::'+this.objectApiName);
        console.log('event.detail.id:::'+event.detail.id);
        const evt = new ShowToastEvent({
            title: 'Account Created Sucessfully',
            message: "Record Id: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Account',
                actionName: 'view'
            },
        });
    }
}