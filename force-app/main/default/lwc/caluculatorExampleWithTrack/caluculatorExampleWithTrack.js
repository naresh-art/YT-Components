import { LightningElement, track } from 'lwc';

export default class CaluculatorExampleWithTrack extends LightningElement {

    firstNumber;
    secondNumber;
    @track addResult;
    @track subResult;

    handleChanges(event) {
        if (event.target.name == 'fnumber') {
            this.firstNumber = event.target.value;
        }
        if (event.target.name == 'snumber') {
            this.secondNumber = event.target.value;
        }
        // console.log('firstNumber is:::'+this.firstNumber);
        // console.log('secondNumber is:::'+this.secondNumber);
        // this.result = parseInt(this.firstNumber) + parseInt(this.secondNumber);
        // console.log('Result is:::'+this.result);
    }

    handleAddClick() {
        console.log('firstNumber is:::' + this.firstNumber);
        console.log('secondNumber is:::' + this.secondNumber);
        this.addResult = parseInt(this.firstNumber) + parseInt(this.secondNumber);
        console.log('Result is:::' + this.addResult);
    }
    handleSubClick() {
        console.log('firstNumber is:::' + this.firstNumber);
        console.log('secondNumber is:::' + this.secondNumber);
        this.subResult = parseInt(this.firstNumber) - parseInt(this.secondNumber);
        console.log('Result is:::' + this.subResult);
    }

}