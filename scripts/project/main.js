var messageData;
var isWeb = true;
function setWeb(){
	if (confirm("Playing in browser?")) {
	  isWeb = true;
	} else {
		messageData = message.data;
	  isWeb = false
	}
}
let version = localStorage.getItem('pvq-version');
if(version!="1.2.0"|| !version) {
localStorage.clear();
version = "1.2.0";
localStorage.setItem('pvq-version',version);
}
var levelDetails = {"currentLevel":{"level":0,"presentationCompleted":0},"level0":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0}},"level1":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0},"level2":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0},"level3":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0},"level4":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0}}

// localStorage.clear(); //uncomment if want to clear cached progress in web

// comment below 3 line if with app else uncomment
var message = {"data":{}};
message.data = {"learningTrackid":1,"gameId":1,"gameVersion":"string","predGameId":0,"gamePath":"https://kreedo-game-upload-poc.s3.us-east-2.amazonaws.com/701_LearningTeens.zip","isActive":true,"isblocked":false,"isGameDownloadComplete":true,"gameName":"Place Value Quantities","attemptId":0,"totalRewards":0,"completedCount":1,"startDateTime":"","endDateTime":"","completed":1,"isMusic":true,"levelDetails":{"currentLevel":{"level":0,"presentationCompleted":0},"level0":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0}},"level1":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0},"level2":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0},"level3":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0},"level4":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0}}};


//app will trigger this event on load finish.
// uncomment this listener if with app else comment
document.addEventListener("message", handleEvent);

function handleEvent(messageTemp) {	
	isWeb = false;
	messageData =  messageTemp.data;	
}

runOnStartup(async runtime =>
{
// 	if(isWeb) setWeb();
	
	if(isWeb){
	
		if(localStorage.getItem("pvq-data")!=null){
			var jsonTxt = localStorage.getItem("pvq-data");
			let data = JSON.parse(localStorage.getItem("pvq-data"))	
			messageData=data;
			console.log("Web - LocalStorage", data);
		}
		else{
			messageData = message.data;
			console.log("Web - Default Data: ", JSON.stringify(messageData));
		}
	}
	else{
		console.log("loaded from app ", messageData);
	}


	
	if(messageData){
		
		messageData.completedCount = 0;
		messageData.levelDetails.level0 = levelDetails.level0;
		messageData.levelDetails.level1 = levelDetails.level1;
		messageData.levelDetails.level2 = levelDetails.level2;
		messageData.levelDetails.level3 = levelDetails.level3;
		messageData.levelDetails.level4 = levelDetails.level4;
		runtime.globalVars.GameID = messageData.gameId;
// 		runtime.globalVars.ChildID = messageData.childId;
		runtime.globalVars.GameName = messageData.gameName;		
		runtime.globalVars.AttemptID = messageData.attemptId;
		runtime.globalVars.IsWeb = isWeb;
		runtime.globalVars.RewardPoints = messageData.totalRewards;
		runtime.globalVars.isMusic = messageData.isMusic;		
        runtime.globalVars.isGameCompleted = messageData.completed;
		runtime.globalVars.GameCompletedCounter = 0;
		runtime.globalVars.GameLevel = messageData.levelDetails.currentLevel.level;
	
        if(runtime.globalVars.isGameCompleted)
        {
            runtime.globalVars.L4TutorialDone = 1
			runtime.globalVars.L3TutorialDone = 1;
			runtime.globalVars.L2TutorialDone = 1;
			runtime.globalVars.L1TutorialDone = 1;						
			runtime.globalVars.L0TutorialDone = 1;

			runtime.globalVars.L1_Completed = 1;
			runtime.globalVars.L2_Completed = 1;
			runtime.globalVars.L3_Completed = 1;
            runtime.globalVars.L4_Completed = 1;

            ;
        }
        else{
            if(runtime.globalVars.GameLevel == 0){
                runtime.globalVars.L0TutorialDone =messageData.levelDetails.currentLevel.presentationCompleted
             //remaining are false by default
            }
            else if(runtime.globalVars.GameLevel == 1){
                runtime.globalVars.L0TutorialDone = 1;
                runtime.globalVars.L1TutorialDone = messageData.levelDetails.currentLevel.presentationCompleted	
                
                }
            else if(runtime.globalVars.GameLevel == 2){
                runtime.globalVars.L2TutorialDone = messageData.levelDetails.currentLevel.presentationCompleted;
                runtime.globalVars.L1TutorialDone = 1;			
                runtime.globalVars.L0TutorialDone = 1;
                
                runtime.globalVars.L1_Completed = 1;
                }
            else if(runtime.globalVars.GameLevel == 3){
                runtime.globalVars.L3TutorialDone = messageData.levelDetails.currentLevel.presentationCompleted
                runtime.globalVars.L2TutorialDone = 1;
                runtime.globalVars.L1TutorialDone = 1;
                runtime.globalVars.L0TutorialDone = 1;
                
                
                runtime.globalVars.L1_Completed = 1;
                runtime.globalVars.L2_Completed = 1;
                }
            else if(runtime.globalVars.GameLevel == 4){
                runtime.globalVars.L4TutorialDone = messageData.levelDetails.currentLevel.presentationCompleted
                runtime.globalVars.L3TutorialDone = 1;
                runtime.globalVars.L2TutorialDone = 1;
                runtime.globalVars.L1TutorialDone = 1;						
                runtime.globalVars.L0TutorialDone = 1;

                runtime.globalVars.L1_Completed = 1;
                runtime.globalVars.L2_Completed = 1;
                runtime.globalVars.L3_Completed = 1;			
                }
            else {
        		console.log("current level "+runtime.globalVars.GameLevel);
            }
        }
			
				   
	}
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));	
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
// 	console.log("OnBeforeProjectStart", window.location);
	runtime.getInstanceByUid(486).setJsonDataCopy(messageData);
	console.log("CONSTRUCT_JSON_DATA_SET", runtime.getInstanceByUid(486).getJsonDataCopy())
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Code to run every tick
}
