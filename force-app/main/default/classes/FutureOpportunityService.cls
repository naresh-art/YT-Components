public class FutureOpportunityService {
    @future
    public static void updateOpportunityStage(List<Id> opportunityIds) {
        List<Opportunity> oppsToUpdate = [SELECT Id, StageName FROM Opportunity WHERE Id IN :opportunityIds];
        for(Opportunity opp : oppsToUpdate) {
            opp.StageName = 'Closed Won'; // Updating the StageName field
        }
        update oppsToUpdate;
    }
}