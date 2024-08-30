// import { LightningElement, track, wire } from 'lwc';
// import getRecordTypes from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.getRecordTypes';
// import createCompany from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.createCompany';
// import createEmployee from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.createEmployee';

// export default class CreateAccountContactWithOneScreen extends LightningElement {
//     @track currentStep = 1;
//     @track selectedRecordTypeId;
//     @track companyName = '';
//     @track createdCompanyId;
//     @track employeeName = '';
//     @track phone = '';
//     @track recordTypes = [];

//     @wire(getRecordTypes)
//     wiredRecordTypes({ error, data }) {
//         if (data) {
//             console.log('Record Types data::'+JSON.stringify(data));
//             this.recordTypes = data.map(rt => ({ label: rt.label, value: rt.value }));
//             console.log('Record Types data in property::'+this.recordTypes);
//         } else if (error) {
//             // Handle error
//             console.error('Error fetching record types', error);
//         }
//     }

//     handleRecordTypeChange(event) {
//         this.selectedRecordTypeId = event.target.value;
//         console.log('selectedRecordTypeId data in property::'+this.selectedRecordTypeId);
//     }

//     handlecompanyNameChange(event) {
//         this.companyName = event.target.value;
//     }

//     handleemployeeNameChange(event) {
//         this.employeeName = event.target.value;
//     }


//     handleNext() {
//         if (this.currentStep === 1) {
//             console.log('Next 1::');
//             if (this.selectedRecordTypeId) {
//                 console.log('Next 1 data:: '+this.selectedRecordTypeId);
//                 this.currentStep++;
//             } else {
//                 alert('Please select a Record Type.');
//             }
//         } else if (this.currentStep === 2) {
//             console.log('Next 2');
//             if (this.companyName) {
//                 console.log('Next 2 Data:: '+this.companyName);
//                 this.handleCreateCompany();
//             } else {
//                 alert('Please enter an Account Name.');
//             }
//         } else if (this.currentStep === 3) {
//             console.log('NEXT 3');
//             if (this.employeeName) {
//                 console.log('Next 3 data::'+this.employeeName);
//                 this.handleCreateEmployee();
//             } else {
//                 alert('Please enter a Contact Name.');
//             }
//         }
//     }

//     handlePrevious() {
//         if (this.currentStep > 1) {
//             this.currentStep--;
//         }
//     }

//     handleCreateCompany() {
//         console.log('companyName Result Id::'+this.companyName);
//         console.log('selectedRecordTypeId Result Id::'+this.selectedRecordTypeId);
//         createCompany({ name: this.companyName, recordTypeId: this.selectedRecordTypeId })
//             .then(result => {
//                 console.log('Account Result Id::'+result);
//                 this.createdCompanyId = result;
//                 console.log('Account Id for Contact Create::'+this.createdCompanyId);
//                 this.currentStep++;
//             })
//             .catch(error => {
//                 // Handle error
//                 console.error('Error creating account', error);
//             });
//     }

//     handleCreateEmployee() {
//         createEmployee({ companyId: this.createdCompanyId, name: this.employeeName })
//             .then(result => {
//                 // Handle successful contact creation
//                 alert('Contact created successfully!');
//             })
//             .catch(error => {
//                 // Handle error
//                 console.error('Error creating contact', error);
//             });
//     }

//     get isStepOne() {
//         return this.currentStep === 1;
//     }

//     get isStepTwo() {
//         return this.currentStep === 2;
//     }

//     get isStepThree() {
//         return this.currentStep === 3;
//     }
// }



// import { LightningElement, track, wire } from 'lwc';
// import getRecordTypes from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.getRecordTypes';
// import createCompany from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.createCompany';
// import createEmployee from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.createEmployee';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// export default class MultipleScreenExample extends LightningElement {
//     @track firstScreen = true;
//     @track secondScreen = false;
//     @track thirdScreen = false;

//     @track selectedRecordTypeId;
//     @track companyName = '';
//     @track createdCompanyId;
//     @track employeeName = '';
//     @track recordTypes = [];

//     @wire(getRecordTypes)
//     wiredRecordTypes({ error, data }) {
//         if (data) {
//             this.recordTypes = data.map(rt => ({ label: rt.label, value: rt.value }));
//         } else if (error) {
//             console.error('Error fetching record types', error);
//         }
//     }

//     handleRecordTypeChange(event) {
//         this.selectedRecordTypeId = event.target.value;
//     }

//     handleCompanyNameChange(event) {
//         this.companyName = event.target.value;
//     }

//     handleEmployeeNameChange(event) {
//         this.employeeName = event.target.value;
//     }

//     handleFirstScreenNext() {
//         if (this.selectedRecordTypeId) {
//             this.secondScreen = true;
//             this.firstScreen = false;
//         } else {
//             this.showToast('Error', 'Please select a Record Type.', 'error');
//         }
//     }

//     handleSecondScreenPrevious() {
//         this.firstScreen = true;
//         this.secondScreen = false;
//     }

//     handleSecondScreenNext() {
//         if (this.companyName) {
//             this.thirdScreen = true;
//             this.secondScreen = false;
//             this.handleCreateCompany();
//         } else {
//             this.showToast('Error', 'Please enter a Company Name.', 'error');
//         }
//     }

//     handleThirdScreenPrevious() {
//         this.secondScreen = true;
//         this.thirdScreen = false;
//     }

//     handleThirdScreenSubmit() {
//         if (this.employeeName) {
//             this.handleCreateEmployee();
//         } else {
//             this.showToast('Error', 'Please enter an Employee Name.', 'error');
//         }
//     }

//     handleCreateCompany() {
//         createCompany({ name: this.companyName, recordTypeId: this.selectedRecordTypeId })
//             .then(result => {
//                 this.createdCompanyId = result;
//                 this.showToast('Sucess', 'Company Created Sucessfully.', 'sucess');
//             })
//             .catch(error => {
//                 console.error('Error creating company', error);
//                 this.showToast('Error', 'Error creating company.', 'error');
//             });
//     }

//     handleCreateEmployee() {
//         createEmployee({ companyId: this.createdCompanyId, name: this.employeeName })
//             .then(() => {
//                 this.showToast('Success', 'Employee created successfully!', 'success');
//             })
//             .catch(error => {
//                 console.error('Error creating employee', error);
//                 this.showToast('Error', 'Error creating employee.', 'error');
//             });
//     }

//     showToast(title, message, variant) {
//         const event = new ShowToastEvent({
//             title: title,
//             message: message,
//             variant: variant,
//         });
//         this.dispatchEvent(event);
//     }
// }


import { LightningElement, track, wire } from 'lwc';
import getRecordTypes from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.getRecordTypes';
import createCompany from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.createCompany';
import createEmployee from '@salesforce/apex/CreateAccountContactWithOneScreenCntrl.createEmployee';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MultipleScreenExample extends LightningElement {
    @track firstScreen = true;
    @track secondScreen = false;
    @track thirdScreen = false;

    @track selectedRecordTypeId;
    @track companyName = '';
    @track createdCompanyId;
    @track employeeName = '';
    @track recordTypes = [];

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

    handleCompanyNameChange(event) {
        this.companyName = event.target.value;
    }

    handleEmployeeNameChange(event) {
        this.employeeName = event.target.value;
    }

    handleFirstScreenNext() {
        if (this.isValid('lightning-combobox')) {
            this.secondScreen = true;
            this.firstScreen = false;
        } 
        // else {
        //     this.showToast('Error', 'Please select a Record Type.', 'error');
        // }
    }

    handleSecondScreenPrevious() {
        this.firstScreen = true;
        this.secondScreen = false;
    }

    handleSecondScreenNext() {
        if (this.isValid('lightning-input')) {
            this.thirdScreen = true;
            this.secondScreen = false;
            this.handleCreateCompany();
        } 
        // else {
        //     this.showToast('Error', 'Please enter a Company Name.', 'error');
        // }
    }

    handleThirdScreenPrevious() {
        this.secondScreen = true;
        this.thirdScreen = false;
    }

    handleThirdScreenSubmit() {
        if (this.isValid('lightning-input')) {
            this.handleCreateEmployee();
        } 
        // else {
        //     this.showToast('Error', 'Please enter an Employee Name.', 'error');
        // }
    }

    handleCreateCompany() {
        createCompany({ name: this.companyName, recordTypeId: this.selectedRecordTypeId })
            .then(result => {
                this.createdCompanyId = result;
            })
            .catch(error => {
                console.error('Error creating company', error);
                this.showToast('Error', 'Error creating company.', 'error');
            });
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

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}
