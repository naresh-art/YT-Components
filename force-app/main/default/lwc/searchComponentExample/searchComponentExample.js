import { LightningElement, track } from 'lwc';
import searchAccounts from '@salesforce/apex/SearchComponentCls.searchAccounts';
import countAccounts from '@salesforce/apex/SearchComponentCls.countAccounts';
export default class SearchComponentExample extends LightningElement {
    @track accounts = [];
    @track searchKey = '';
    @track currentPage = 1;
    @track totalRecords;
    @track totalPages;
    @track recordsPerPage = 5;
    @track isLoading = false;

    // Columns for the lightning-datatable
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Type', fieldName: 'Type' },
        { label: 'Phone', fieldName: 'Phone' }
    ];

    connectedCallback() {
        this.fetchAccounts();
    }

    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
        this.currentPage = 1; // Reset to first page on new search
        this.fetchAccounts();
    }

    fetchAccounts() {
        this.isLoading = true;
        searchAccounts({
            searchKey: this.searchKey,
            offset: (this.currentPage - 1) * this.recordsPerPage,
            limitSize: this.recordsPerPage
        })
        .then(result => {
            this.accounts = result;
            return countAccounts({ searchKey: this.searchKey });
        })
        .then(result => {
            this.totalRecords = result;
            this.totalPages = Math.ceil(this.totalRecords / this.recordsPerPage);
            this.isLoading = false;
        })
        .catch(error => {
            console.error('Error fetching accounts:', error);
            this.isLoading = false;
        });
    }

    handlePreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchAccounts();
        }
    }

    handleNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.fetchAccounts();
        }
    }

    get disablePrevious() {
        return this.currentPage === 1;
    }

    get disableNext() {
        return this.currentPage === this.totalPages;
    }
    get isNoRecords() {
        return this.accounts.length === 0 && !this.isLoading;
    }
    
}