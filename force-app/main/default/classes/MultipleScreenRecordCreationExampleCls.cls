public with sharing class MultipleScreenRecordCreationExampleCls {
    public MultipleScreenRecordCreationExampleCls() {

    }

    @AuraEnabled(cacheable=true)
    public static List<RecordTypeOption> getRecordTypes() {
        List<RecordTypeOption> options = new List<RecordTypeOption>();
        for (RecordType rt : [SELECT Id, Name FROM RecordType WHERE SObjectType = 'Company__c']) {
            options.add(new RecordTypeOption(rt.Name, rt.Id));
        }
        return options;
    }

    public class RecordTypeOption {
        @AuraEnabled public String label { get; set; }
        @AuraEnabled public String value { get; set; }

        public RecordTypeOption(String label, String value) {
            this.label = label;
            this.value = value;
        }
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