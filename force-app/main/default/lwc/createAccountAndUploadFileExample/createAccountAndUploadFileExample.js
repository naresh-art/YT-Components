import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createAccount from '@salesforce/apex/CreateAccountAndUploadFileExampleCls.createAccount';
import getAccountTypeOptions from '@salesforce/apex/CreateAccountAndUploadFileExampleCls.getAccountTypeOptions';
import uploadFile from '@salesforce/apex/CreateAccountAndUploadFileExampleCls.uploadFile';

export default class CreateAccountAndUploadFileExample extends LightningElement {
    @track currentStep = 1;
    @track typeOptions = [];
    account = {
        Name: '',
        Type: '',
        Phone: '',
        Email: '',
        Description: ''
    };
    fileData = {};

    @wire(getAccountTypeOptions)
    wiredAccountTypeOptions({ error, data }) {
        if (data) {
            this.typeOptions = data.map(type => {
                return { label: type, value: type };
            });
        } else if (error) {
            this.showToast('Error', 'Failed to load account type options', 'error');
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.account[name] = value;
    }

    handleNext() {
        if (this.validateAccountFields()) {
            this.currentStep = 2;
        } else {
            this.showToast('Error', 'Please fill in all required fields', 'error');
        }
    }

    validateAccountFields() {
        return this.account.Name && this.account.Type && this.account.Phone && 
               this.account.Email && this.account.Description;
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                this.fileData = {
                    fileName: file.name,
                    base64Data: base64,
                    contentType: file.type
                };
            };
            reader.readAsDataURL(file);
        } else {
            this.fileData = {}; // Clear file data if no file is selected
        }
    }

    async handleSubmit() {
        if (this.validateAccountFields() && this.fileData.base64Data) {
            try {
                const accountId = await createAccount({ acc: this.account });
                if (accountId && this.fileData.base64Data) {
                    await uploadFile({
                        recordId: accountId,
                        fileName: this.fileData.fileName,
                        base64Data: this.fileData.base64Data,
                        contentType: this.fileData.contentType
                    });
                }
                this.showToast('Success', 'Account created and file uploaded', 'success');
                this.refreshPage();
            } catch (error) {
                this.showToast('Error', error.body.message, 'error');
            }
        } else {
            this.showToast('Error', 'Please Upload a file', 'error');
        }
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(evt);
    }

    refreshPage() {
        // Refresh the page
        window.location.reload();
    }

    get isStepOne() {
        return this.currentStep === 1;
    }

    get isStepTwo() {
        return this.currentStep === 2;
    }
}
