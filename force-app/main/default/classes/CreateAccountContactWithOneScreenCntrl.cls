public with sharing class CreateAccountContactWithOneScreenCntrl {
    public CreateAccountContactWithOneScreenCntrl() {

    }

    /* 
        A wrapper class is a custom data structure in Apex that groups multiple pieces of data into a single object.
        This is particularly useful when you need to pass around complex data that includes multiple fields or when you want 
        to combine data from different sources into a single object.    
        In our code, the RecordTypeOption class wraps two pieces of information:
            label: The name of the record type (e.g., "Business Account").
            value: The unique identifier (Id) of the record type (e.g., "0123A000000Qqw8").
        These two pieces of information are combined into a single object of the RecordTypeOption class.
        This object is then used in your code to transfer the record type data from the server-side Apex controller to 
        the client-side Lightning Web Component.
    */
    public class RecordTypeOption {
        @AuraEnabled public String label { get; set; }
        @AuraEnabled public String value { get; set; }

        public RecordTypeOption(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<RecordTypeOption> getRecordTypes() {
        List<RecordTypeOption> options = new List<RecordTypeOption>();
        for (RecordType rt : [SELECT Id, Name FROM RecordType WHERE SObjectType = 'Company__c']) {
            options.add(new RecordTypeOption(rt.Name, rt.Id));
        }
        return options;
    }

    @AuraEnabled
    public static Id createCompany(String name, Id recordTypeId) {
        Company__c companyObj = new Company__c(Name = name, RecordTypeId = recordTypeId);
        insert companyObj;
        return companyObj.Id;
    }

    @AuraEnabled
    public static Id createEmployee(Id companyId, String name) {
        Employee__c employeeObj = new Employee__c(Company__c = companyId, Name = name);
        insert employeeObj;
        return employeeObj.Id;
    }
}