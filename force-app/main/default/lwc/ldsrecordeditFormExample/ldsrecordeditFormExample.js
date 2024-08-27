import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class LdsRecordEditFormExample extends NavigationMixin(LightningElement) {
    handleSuccess(event) {
        console.log('onsuccess event recordEditForm::', event.detail.id);      
        // Show success toast message
        const evt = new ShowToastEvent({
            title: 'Contact Created Successfully',
            message: 'Record Id: ' + event.detail.id,
            variant: 'success'
        });
        this.dispatchEvent(evt);
        // Navigate to the newly created record's detail page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Contact', // Object API name
                actionName: 'view' // actionName could be 'view', 'edit', etc.
            }
        });
    }
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm::', JSON.stringify(event.detail.fields));
    }
}
