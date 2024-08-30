import { LightningElement, track } from 'lwc';

export default class GetSetExample extends LightningElement {
    @track firstName = 'John';
    @track lastName = 'Smith';

    // Computed property using getter
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Custom setter for fullName
    set fullName(value) {
        const names = value.split(' ');
        console.log('names:: '+this.names);
        this.firstName = names[0];
        console.log('first names:: '+this.firstName);
        this.lastName = names[1] || '';
        console.log('last names:: '+this.lastName);
    }

    handleNameChange(event) {
        this.fullName = event.target.value; // This triggers the set method
    }
}


/*Getter (get):

    The fullName getter concatenates the firstName and lastName properties to produce a full name.
    When the fullName is accessed (e.g., in the template), the getter runs and returns the concatenated string.

Setter (set):

    The fullName setter allows the full name to be set as a single string.
    The setter splits the full name string into firstName and lastName parts and updates those properties accordingly.

Usage in Template:

    The template binds the fullName property to an input field. When the input changes, the handleNameChange method is triggered,
    which updates the fullName. This, in turn, triggers the setter to split the name and update firstName and lastName.

Benefits of Using get and set:

    Computed Properties: The get method allows you to create properties that are dynamically computed based on other properties, 
                        without storing redundant data.
    Encapsulation: The set method lets you encapsulate logic that should happen when a property is updated, ensuring that all updates 
                    go through the same logic.
*/