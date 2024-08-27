import { LightningElement, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LdsRecordEditFormUpdateExample extends LightningElement {
    @api recordId; // The recordId to be updated

    handleSuccess(event) {
        console.log('onsuccess event recordEditForm::', event.detail.id);
        
        // Show success toast message
        const evt = new ShowToastEvent({
            title: 'Contact Updated Successfully',
            message: 'Record Id: ' + event.detail.id,
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }

    handleSubmit(event) {
        console.log('onsubmit event recordEditForm::', JSON.stringify(event.detail.fields));
    }
}