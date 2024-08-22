public class AccountTriggerExampleHandler {
    public static void insertAccount(List<Account> accList){
        for(Account acc:accList){
            acc.Description='Happy Welcome';
        }
    }
    public static void insertAccountOpp(List<Account> accList){
        List<Opportunity> oppList = new List<Opportunity>();
        for(Account acc:accList){
            Opportunity opp = new Opportunity();
            opp.Name = acc.name;
            opp.CloseDate = System.Today();
            opp.StageName = 'Prospecting';
            opp.AccountId = acc.id;
            oppList.add(opp);
        }
        if(oppList.size()>0){
            insert oppList;
        }
    } 
    
    /*public static void beforeUpdateExample(List<Account> accNewList, Map<Id,Account> oldMap){
        for(Account acc: accNewList){
            System.Debug('oldMap:'+oldMap);
            System.debug('acc.Phone::'+acc.Phone);
            System.debug('oldMap.get(acc.Id).Phone::'+oldMap.get(acc.Id).Phone);
            if(oldMap!=null && acc.Phone != oldMap.get(acc.Id).Phone){
                acc.Description = 'Welcome to Before Update event';
                System.Debug('acc.Description:'+acc.Description);
            }
        }
    } 
    
    public static void afterUpdateExample(List<Account> accNewList, Map<Id,Account> oldMap){
        Map<Id,Account> accountsMap = new Map<Id,Account>();

        for(Account acc: accNewList){
            if(oldMap!=null && acc.Phone != oldMap.get(acc.Id).Phone){
                accountsMap.put(acc.Id, acc);
            }
        }
        
        List<Opportunity> oppUpdateList = new List<Opportunity>();
        Opportunity oppr = new Opportunity();
        List<Opportunity> oppList = [Select id, Name,Account_Phone__c, AccountId from Opportunity where AccountId IN :accountsMap.keySet()];
        for (Opportunity opp: oppList){
            System.debug('opp::'+opp);
            if(accountsMap.containsKey(opp.AccountId)){
                oppr.Id = opp.Id;
                System.debug('accountsMap.get(opp.AccountId).Phone::'+accountsMap.get(opp.AccountId).Phone);
                oppr.Account_Phone__c = accountsMap.get(opp.AccountId).Phone;
                oppUpdateList.add(oppr);
                System.debug('oppUpdateList::'+oppUpdateList);
            }
        }
        if(!oppUpdateList.isEmpty()){
            update oppUpdateList;
        }        
        
    }*/ 
    
    //Before Delete
    /*public static void beforeDeleteExample(List<Account> depNewList){
        for(Account dep: depNewList){
            if(dep.Active__c== 'Yes')
            {
                dep.addError('Active Account cannot be delete');
            } 
        }					
    }*/	
    
}