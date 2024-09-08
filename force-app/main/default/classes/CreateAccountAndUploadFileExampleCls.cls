public with sharing class CreateAccountAndUploadFileExampleCls {

    @AuraEnabled(cacheable=true)
    public static List<String> getAccountTypeOptions() {
        List<String> options = new List<String>();
        Schema.DescribeFieldResult fieldResult = Account.Type.getDescribe();
        List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();
        
        for (Schema.PicklistEntry entry : picklistEntries) {
            options.add(entry.getLabel());
        }
        
        return options;
    }

    
    @AuraEnabled
    public static Id createAccount(Account acc) {
        insert acc;
        return acc.Id;
    }

    @AuraEnabled
    public static void uploadFile(Id recordId, String fileName, String base64Data, String contentType) {
        ContentVersion contentVersion = new ContentVersion();
        contentVersion.Title = fileName;
        contentVersion.PathOnClient = fileName;
        contentVersion.VersionData = EncodingUtil.base64Decode(base64Data);
        contentVersion.Origin = 'H';
        contentVersion.ContentLocation = 'S';
        contentVersion.FirstPublishLocationId = recordId; // Link to the account record
        insert contentVersion;
    }
}
