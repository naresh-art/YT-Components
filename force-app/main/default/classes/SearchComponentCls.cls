public with sharing class SearchComponentCls {
    public SearchComponentCls() {

    }

	@AuraEnabled(cacheable=true)
	public static List<Account> getAccounts(String actName) {
		String keyString = '%' + actName + '%';
		return [SELECT Id, Name, Type, Phone FROM Account
			WHERE Name LIKE :keyString OR Phone LIKE :keyString];
	}


    @AuraEnabled(cacheable=true)
	public static List<Account> searchAccounts(String searchKey, Integer offset, Integer limitSize) {
		String searchTerm = '%' + searchKey + '%';
		return [
			SELECT Id, Name, Type, Phone FROM Account
			WHERE Name LIKE :searchTerm ORDER BY Name
			LIMIT :limitSize OFFSET :offset
		];
	}
	
	@AuraEnabled(cacheable=true)
	public static Integer countAccounts(String searchKey) {
		String searchTerm = '%' + searchKey + '%';
		return [
			SELECT COUNT()
			FROM Account
			WHERE Name LIKE :searchTerm
		];
	}
}