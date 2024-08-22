public with sharing class WireExampleClass {
    public WireExampleClass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        try {
            List<Account> accList =[Select id, Name, rating From Account limit 5];
            System.debug('accList::'+accList);
            return accList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}