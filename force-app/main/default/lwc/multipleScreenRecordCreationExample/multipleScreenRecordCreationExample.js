import { LightningElement, track, wire } from 'lwc';
import getRecordTypes from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.getRecordTypes';
import createCompany from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.createCompany';
import createEmployee from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.createEmployee';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MultipleScreenRecordCreationExample extends LightningElement {
    @track firstScreen = true;
    @track secondScreen = false;
    @track thirdScreen = false;

    @track selectedRecordTypeId;
    @track recordTypes = [];

    @track companyName = '';
    @track createdCompanyId;

    @track employeeName = '';

    @wire(getRecordTypes)
    wiredRecordTypes({ error, data }) {
        if (data) {
            this.recordTypes = data.map(rt => ({ label: rt.label, value: rt.value }));
        } else if (error) {
            console.error('Error fetching record types', error);
        }
    }

    handleRecordTypeChange(event) {
        this.selectedRecordTypeId = event.target.value;
    }

    handleFirstScreenNext(){
        if (this.isValid('lightning-combobox')) {
            this.secondScreen = true;
            this.firstScreen = false;
            this.thirdScreen = false;
        }
        else {
            this.showToast('Error', 'Please Select Atleast one Record Type.', 'error');
        }
        
    }

    handleCompanyNameChange(event) {
        this.companyName = event.target.value;
    }

    handleCreateCompany() {
        createCompany({ name: this.companyName, recordTypeId: this.selectedRecordTypeId })
            .then(result => {
                this.createdCompanyId = result;
                this.showToast('Success', 'Company created successfully!', 'success');
                this.handleCreateEmployee();
            })
            .catch(error => {
                console.error('Error creating company', error);
                this.showToast('Error', 'Error creating company.', 'error');
            });
    }

    handleSecondScreenPrevious() {
        this.firstScreen = true;
        this.secondScreen = false;
        this.thirdScreen = false;
    }

    handleSecondScreenNext() {
        if (this.isValid('lightning-input')) {
            this.thirdScreen = true;
            this.secondScreen = false;
            this.firstScreen = false;
            // this.handleCreateCompany();
        }
        else {
            this.showToast('Error', 'Please Enter Your Company Name.', 'error');
        }
    }

    handleEmployeeNameChange(event) {
        this.employeeName = event.target.value;
    }

    handleCreateEmployee() {
        createEmployee({ companyId: this.createdCompanyId, name: this.employeeName })
            .then(() => {
                this.showToast('Success', 'Employee created successfully!', 'success');
            })
            .catch(error => {
                console.error('Error creating employee', error);
                this.showToast('Error', 'Error creating employee.', 'error');
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

    handleThirdScreenSubmit() {
        if (this.isValid('lightning-input')) {
            this.handleCreateCompany();
            // this.handleCreateEmployee();
        }
        else {
            this.showToast('Error', 'Please Enter Your Employee Name.', 'error');
        }
    }
    handleThirdScreenPrevious() {
        this.secondScreen = true;
        this.thirdScreen = false;
        this.firstScreen = false;
    }

    isValid(inputType) {
        const inputs = this.template.querySelectorAll(inputType);
        let isValid = true;
        inputs.forEach(input => {
            if (!input.reportValidity()) {
                isValid = false;
            }
        });
        return isValid;
    }

}