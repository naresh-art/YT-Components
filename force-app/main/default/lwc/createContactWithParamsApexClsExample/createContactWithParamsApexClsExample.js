import { LightningElement, track, api } from 'lwc';
	import createContactWithParams from '@salesforce/apex/CreateAccountController.createContactWithParams';
	import { ShowToastEvent } from 'lightning/platformShowToastEvent';

	export default class CreateContactWithParamsApexClsExample extends LightningElement {
		@api recordId;
		@track accountId;
		@track firstName = '';
		@track lastName = '';
		@track email = '';

		handleFirstNameChange(event) {
			this.firstName = event.target.value;
		}

		handleLastNameChange(event) {
			this.lastName = event.target.value;
		}

		handleEmailChange(event) {
			this.email = event.target.value;
		}

		handleCreateContact() {
			console.log('RecordId::'+this.recordId);
			createContactWithParams({
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				accountId: this.recordId
			})
				.then(result => {
                    console.log('Result::'+JSON.stringify(result));
					this.dispatchEvent(
						new ShowToastEvent({
							title: 'Success',
							message: 'Contact created successfully! RecodId:' + result,
							variant: 'success',
						}),
					);
					this.handleReset();
				})
				.catch(error => {
					this.dispatchEvent(
						new ShowToastEvent({
							title: 'Error creating record',
							message: error.body.message,
							variant: 'error',
						}),
					);
				});
		}
		handleReset() {
			// Reset fields or do any additional processing
			this.firstName = '';
			this.lastName = '';
			this.email = '';
		}
	}