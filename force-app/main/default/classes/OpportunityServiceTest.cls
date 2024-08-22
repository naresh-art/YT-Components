@isTest
public class OpportunityServiceTest {

    @isTest
    static void testUpdateOpportunityStage() {
        // Step 1: Create test Opportunity records
        List<Opportunity> opportunities = new List<Opportunity>();
        for (Integer i = 0; i < 100; i++) {
            opportunities.add(new Opportunity(
                Name = 'Test Opportunity ' + i,
                StageName = 'Prospecting',
                CloseDate = Date.today().addDays(30)
            ));
        }
        insert opportunities;
        
        // Step 2: Get the IDs of the inserted Opportunities
        List<Id> oppIds = new List<Id>();
        for (Opportunity opp : opportunities) {
            oppIds.add(opp.Id);
        }

        // Step 3: Call the future method
        Test.startTest();
        OpportunityService.updateOpportunityStage(oppIds);
        Test.stopTest();
        
        // Step 4: Verify that the Opportunities were updated
        List<Opportunity> updatedOpps = [SELECT Id, StageName FROM Opportunity WHERE Id IN :oppIds];
        for (Opportunity opp : updatedOpps) {
            System.assertEquals('Closed Won', opp.StageName, 'The Opportunity stage should be updated to Closed Won.');
        }
    }
}