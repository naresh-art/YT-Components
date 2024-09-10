import { LightningElement, track, wire, api } from 'lwc';
import getAccountRecords from '@salesforce/apex/ModalPopUpCls.getAccountRecords';
import getContactDetails from '@salesforce/apex/ModalPopUpCls.getContactDetails';

const columns = [
    {
        label: 'Account Name',
        fieldName: 'Name',
        type: 'button',
        typeAttributes: {
            label: { fieldName: 'Name' },
            name: 'showDetails',
            variant: 'base'
        }
    },
    { label: 'Account Number', fieldName: 'AccountNumber' },
    { label: 'Rating', fieldName: 'Rating' }
];

// Columns for the modal datatable
const modalColumns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Account Name', fieldName: 'AccountName' },
    { label: 'Language', fieldName: 'Languages__c' },
    { label: 'Department', fieldName: 'Department' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Phone Number', fieldName: 'MobilePhone' }
];

export default class ModalPopupComp extends LightningElement {
    @track data = [];  // Data for the main datatable
    @track isModalOpen = false;  // Modal visibility state
    @track contactData = [];  // Data for the modal datatable
    @track accountId;;
    @api recordId;// ID of the selected Talent Bench record
    columns = columns;
    modalColumns = modalColumns;

    // Fetch all Talent Bench records
    @wire(getAccountRecords, { recordId: '$recordId' })
    wiredRecords({ error, data }) {
        console.log('recordId in Site::' + this.recordId); // new code
        if (data) {
            console.log('Data::' + JSON.stringify(data)); // new code
            this.data = data;
        } else if (error) {
            console.error('Error fetching Talent Bench records:', error);
        }
    }

    // Handle row action for opening the modal
    handleRowAction(event) {
        const row = event.detail.row;
        this.accountName = row.Id; // Get the Account ID
        this.openModal();
    }
    // Fetch Account details related to the selected contact record and open the modal
    openModal() {
        if (this.accountName) {
            getContactDetails({ accountName: this.accountName })
                .then(result => {
                    this.contactData = result.map(item => ({
                        ...item,
                        'AccountName': item.Account.Name,
                    }));
                    this.isModalOpen = true; // Assuming you want to open the modal
                    console.log('Job::' + JSON.stringify(this.contactData));
                })
                .catch(error => {
                    console.error('Error fetching contact details:', error);
                });
        }
    }
    // Close the modal
    closeModal() {
        this.isModalOpen = false;
        this.contactData = [];  // Clear the job data when closing the modal
    }
}