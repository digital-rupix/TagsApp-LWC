/**
 * @description       : 
 * @author            : Marc Swan
 * @group             : 
 * @last modified on  : 01-06-2023
 * @last modified by  : Marc Swan
 * Modifications Log
 * Ver   Date         Author      Modification
 * 1.0   01-06-2023   Marc Swan   Initial Version
**/
public class QueryNameAction {

    @AuraEnabled
    public static String runQuery(Id recordId, String objectName) {
    
    String output = '';
    
    Tags_Custom_Names__mdt customName = [SELECT Id, Field_API_Name__c FROM Tags_Custom_Names__mdt WHERE Object_API_Name__c = :objectName];
    if(customName != null) {
    output = [SELECT customName.Field_API_Name__c FROM objectType WHERE Id = :recordId].Field_API_Name__c;
    } else {
    output = [SELECT Name FROM objectType WHERE Id = :recordId].Name;
    }
    
    return output;
    
    }
    
    }