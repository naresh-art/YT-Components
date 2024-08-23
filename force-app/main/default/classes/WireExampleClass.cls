public with sharing class WireExampleClass {
    public WireExampleClass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        try {
            List<Account> accList =[Select id, Name, rating From Account];
            System.debug('accList::'+accList);
            return accList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled(cacheable=true)
    public static List<Contact> getAllContacts(){
        try {
            List<Contact> conList =[SELECT id, FirstName, LastName, phone, AccountId FROM Contact];
            System.debug('conList::'+conList);
            return conList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getAccountRelatedContacts(String accountId){
        try {
            List<Contact> conList =[SELECT id, FirstName, LastName, phone, AccountId FROM Contact 
                                    WHERE AccountId =: accountId];
            System.debug('conList::'+conList);
            return conList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Contact> getAccountRelatedContactsImparative(String accountId){
        try {
            List<Contact> conList =[SELECT id, FirstName, LastName, phone, AccountId FROM Contact 
                                    WHERE AccountId =: accountId];
            System.debug('conList::'+conList);
            return conList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}