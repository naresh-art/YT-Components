import { LightningElement,track, api } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
// import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Account_Id from '@salesforce/schema/Account.Id';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class UpdateRecordUsingJavaScriptExample extends LightningElement {

        @api recordId; // The ID of the record to be updated
		@track accountName = '';
		@track accountPhone = '';

		handleNameChange(event) {
			this.accountName = event.target.value;
		}

		handlePhoneChange(event) {
			this.accountPhone = event.target.value;
		}

		updateAccount() {
			const fields = {};
			fields[Account_Id.fieldApiName] = this.recordId; // The record ID to update
			fields[NAME_FIELD.fieldApiName] = this.accountName;
			fields[PHONE_FIELD.fieldApiName] = this.accountPhone;

			const recordInput = { fields };
            console.log('recordInput::'+JSON.stringify(recordInput));
			updateRecord(recordInput)
				.then((account) => {
                    console.log('account::'+JSON.stringify(account));
					console.log('account Id::'+JSON.stringify(account.id));
					// Show success toast
					this.dispatchEvent(
						new ShowToastEvent({
							title: 'Success',
							message: 'Account updated successfully',
							variant: 'success',
						}),
					);

                    // // Navigate to the updated record's detail page
					// this[NavigationMixin.Navigate]({
					// 	type: 'standard__recordPage',
					// 	attributes: {
					// 		recordId: this.recordId,
					// 		objectApiName: 'Account', // Object API name
					// 		actionName: 'view' // actionName could be 'view', 'edit', etc.
					// 	},
					// });
				})
				.catch(error => {
					// Show error toast
					this.dispatchEvent(
						new ShowToastEvent({
							title: 'Error updating record',
							message: error.body.message,
							variant: 'error',
						}),
					);
				});
		}

}   