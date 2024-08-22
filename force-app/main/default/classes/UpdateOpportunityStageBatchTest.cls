@isTest
public class UpdateOpportunityStageBatchTest {

    @isTest
    static void testBatch() {
        // Setup test data
        List<Opportunity> opps = new List<Opportunity>();
        
        // Create test opportunities with varying stages
        for (Integer i = 0; i < 50; i++) {
            opps.add(new Opportunity(Name = 'Test Opportunity ' + i, StageName = 'Needs Analysis', CloseDate = Date.today().addDays(30)));
        }
        insert opps;
        
        // Ensure records are inserted before running the batch
        Test.startTest();
        
        // Execute the batch job
        UpdateOpportunityStageBatch batch = new UpdateOpportunityStageBatch();
        Database.executeBatch(batch, 10); // Use a smaller batch size for testing
        
        Test.stopTest();
        
        // Verify the results
        List<Opportunity> updatedOpps = [SELECT Id, StageName FROM Opportunity WHERE StageName = 'Prospecting'];
        System.assertEquals(10, updatedOpps.size(), 'All opportunities should have been updated to "Prospecting".');
        
        // Optionally, check if other stages are not updated
        List<Opportunity> otherOpps = [SELECT Id, StageName FROM Opportunity WHERE StageName = 'Needs Analysis'];
        System.assertEquals(0, otherOpps.size(), 'No opportunities should remain with the stage "Needs Analysis".');
    }
    
    @isTest
    static void testBatchWithNoRecords() {
        // Run the batch job without any records
        Test.startTest();
        
        UpdateOpportunityStageBatch batch = new UpdateOpportunityStageBatch();
        Database.executeBatch(batch, 10); // Use a smaller batch size for testing
        
        Test.stopTest();
        
        // Verify that no records are updated (although no records should be present)
        // Add any additional verification logic if needed
    }
}