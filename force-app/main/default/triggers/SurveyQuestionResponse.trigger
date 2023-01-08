trigger SurveyQuestionResponse on SurveyQuestionResponse__c (before insert) {
    for(SurveyQuestionResponse__c sqr: Trigger.new){
        //With new Guest user settings, we cannot give Edit access to Contact object to Guest user
        //Now we store Contact & Case IDs in a Text field and use trigger to update Lookup fields (in system mode)
        //sqr.Survey_Question__c = sqr.Survey_Question_Text__c ;
        //sqr.SurveyTaker__c = sqr.SurveyTaker_Text__c ; 
    }
}