// only csv file
//import { LightningElement, track } from 'lwc';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// export default class UploadFileAndDisplayDataInTableExample extends LightningElement {
//     @track dataTableData = [];
//     columns = [];

//     handleFileUpload(event) {
//         const file = event.target.files[0];
//         if (file && file.type === 'text/csv') {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 this.processFile(reader.result);
//             };
//             reader.readAsText(file);
//         } else {
//             this.showToast('Error', 'Please upload a valid CSV file.', 'error');
//         }
//     }

//     processFile(fileContent) {
//         // Split the file content by new lines and commas
//         const rows = fileContent.split('\n');
//         const headers = rows[0].split(',').map(header => header.trim());

//         // Prepare columns for the data table
//         this.columns = headers.map(header => ({ label: header, fieldName: header }));

//         // Prepare data for the data table
//         this.dataTableData = rows.slice(1).map((row, index) => {
//             const values = row.split(',').map(value => value.trim());
//             return headers.reduce((acc, header, i) => {
//                 acc[header] = values[i];
//                 return acc;
//             }, { id: index });
//         });
//     }

//     handleUpload() {
//         if (this.dataTableData.length === 0) {
//             this.showToast('Error', 'No data to display. Please upload a valid CSV file.', 'error');
//         }
//     }

//     showToast(title, message, variant) {
//         const evt = new ShowToastEvent({
//             title,
//             message,
//             variant
//         });
//         this.dispatchEvent(evt);
//     }
// }

//Both xml and csv files
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FileUploadAndDisplay extends LightningElement {
    @track dataTableData = [];
    columns = [];
    fileType = '';

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.fileType = file.type;
            const reader = new FileReader();
            reader.onload = () => {
                if (this.fileType === 'text/csv') {
                    this.processCSV(reader.result);
                } else if (this.fileType === 'application/xml') {
                    this.processXML(reader.result);
                } else {
                    this.showToast('Error', 'Unsupported file type. Please upload a CSV or XML file.', 'error');
                }
            };
            reader.readAsText(file);
        }
    }

    processCSV(fileContent) {
        const rows = fileContent.split('\n');
        const headers = rows[0].split(',').map(header => header.trim());

        this.columns = headers.map(header => ({ label: header, fieldName: header }));
        this.dataTableData = rows.slice(1).map((row, index) => {
            const values = row.split(',').map(value => value.trim());
            return headers.reduce((acc, header, i) => {
                acc[header] = values[i];
                return acc;
            }, { id: index });
        });
    }

    processXML(fileContent) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(fileContent, 'application/xml');
        const rows = Array.from(xmlDoc.getElementsByTagName('row')); // Adjust as per XML structure

        if (rows.length === 0) {
            this.showToast('Error', 'No data found in the XML file.', 'error');
            return;
        }

        const headers = Array.from(rows[0].children).map(child => child.nodeName);

        this.columns = headers.map(header => ({ label: header, fieldName: header }));
        this.dataTableData = rows.map((row, index) => {
            const cells = Array.from(row.children);
            return headers.reduce((acc, header, i) => {
                acc[header] = cells[i] ? cells[i].textContent : '';
                return acc;
            }, { id: index });
        });
    }

    handleUpload() {
        if (this.dataTableData.length === 0) {
            this.showToast('Error', 'No data to display. Please upload a valid file.', 'error');
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
}
