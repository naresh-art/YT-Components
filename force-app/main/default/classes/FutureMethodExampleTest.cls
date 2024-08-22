@isTest
public class FutureMethodExampleTest {
	@isTest
    static void testUpdateOpportunityStage() {
        // Step 1: Create test Opportunity records
        List<Opportunity> opportunitiesList = new List<Opportunity>();
        for (Integer i = 0; i < 100; i++) {
            opportunitiesList.add(new Opportunity(
                Name = 'Test Opportunity ' + i,
                StageName = 'Prospecting',
                CloseDate = Date.today().addDays(30)
            ));
        }
        insert opportunitiesList;
        
        // Step 2: Get the IDs of the inserted Opportunities
        List<Id> oppIds = new List<Id>();
        for (Opportunity opp : opportunitiesList) {
            oppIds.add(opp.Id);
        }
        // Step 3: Call the future method
        Test.startTest();
        	FutureMethodExample.myFutureMethod(oppIds);
        Test.stopTest();
        
        // Step 4: Verify that the Opportunities were updated
        List<Opportunity> updatedOpps = [SELECT Id, StageName FROM Opportunity WHERE Id IN :oppIds];
        System.assertEquals(100,updatedOpps.Size());
        for (Opportunity opp : updatedOpps) {
            System.assertEquals('Qualification', opp.StageName, 'The Opportunity stage should be updated to Qualification.');
        }
        
    }
}