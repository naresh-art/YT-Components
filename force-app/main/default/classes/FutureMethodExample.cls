public class FutureMethodExample {
 	@future
    public static void myFutureMethod(List<Id> opportunityIds)
    {   
        List<Opportunity> oppsToUpdateList = [SELECT Id, StageName FROM Opportunity WHERE Id IN :opportunityIds];
        for(Opportunity opp:oppsToUpdateList){
            opp.StageName='Qualification';
        }
        if(!oppsToUpdateList.isEmpty() && oppsToUpdateList.size()>0){
            update oppsToUpdateList;
            System.debug('oppsToUpdateList::'+oppsToUpdateList);
        }
    }
}