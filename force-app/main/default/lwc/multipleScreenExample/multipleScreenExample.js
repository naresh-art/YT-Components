// import { LightningElement, track } from 'lwc';

// export default class MultipleScreenExample extends LightningElement {
//     @track firstScreen = true;
//     @track secondScreen = false;
//     @track thirdScreen = false;
//     @track fourthScreen = false;

//     handlefirstScreenNext(){
//         this.secondScreen = true;
//         this.firstScreen = false;
//         this.thirdScreen = false;
//         this.fourthScreen = false;
//     }

//     handleSecondScreenPrevious(){
//         this.firstScreen = true;
//         this.secondScreen = false;
//         this.thirdScreen = false;
//         this.fourthScreen = false;
//     }
//     handleSecondScreenNext(){
//         this.thirdScreen = true;
//         this.secondScreen = false;
//         this.firstScreen = false;
//         this.fourthScreen = false;
//     }
//     handleThirdScreenNext(){
//         this.fourthScreen = true;
//         this.secondScreen = false;
//         this.firstScreen = false;
//         this.thirdScreen = false;
//     }
//     handleThirdScreenPrevious(){
//         this.secondScreen = true;
//         this.firstScreen = false;
//         this.thirdScreen = false;
//         this.fourthScreen = false;
//     }

//     handleFourthScreenPrevious(){
//         this.thirdScreen = true;
//         this.firstScreen = false;
//         this.secondScreen = false;
//         this.fourthScreen = false;
//     }
//     handleFinalSubmit(){
//         //Close logic
//     }

// }


import { LightningElement, track } from 'lwc';

export default class MultipleScreenExample extends LightningElement {
    @track currentScreen = 'first';

    get isFirstScreen() {
        return this.currentScreen === 'first';
    }

    get isSecondScreen() {
        return this.currentScreen === 'second';
    }

    get isThirdScreen() {
        return this.currentScreen === 'third';
    }

    get isFourthScreen() {
        return this.currentScreen === 'fourth';
    }

    goToFirstScreen() {
        this.currentScreen = 'first';
    }

    goToSecondScreen() {
        this.currentScreen = 'second';
    }

    goToThirdScreen() {
        this.currentScreen = 'third';
    }

    goToFourthScreen() {
        this.currentScreen = 'fourth';
    }

    handleSubmit() {
        // Submit logic
    }
}
