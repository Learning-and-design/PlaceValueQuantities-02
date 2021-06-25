"use strict";

export class AppInterface  {

	static showToast(msg){
		let jsonToast = {};
			jsonToast.toast = msg;
        console.log('showToast', jsonToast);
		   if (window && window.ReactNativeWebView) {
		   
			window.ReactNativeWebView.postMessage(jsonToast);
		}
		
	}
	static sendToApp(data){		
		let json_str = JSON.stringify(data);
		console.log("Send data to Webview", json_str);
		if (window && window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(json_str);
		}
		

	}
}




{
	const scriptsInEvents = {

		async Egame_Event1_Act9(runtime, localVars)
		{
			// localstorage.clear();
			// console.log("log", runtime.getInstanceByUid(486).getJsonDataCopy()); 
			
			runtime.goToLayout("Tutorial");
			
		},

		async Egame_Event11_Act1(runtime, localVars)
		{
			// if(runtime.globalVars.IsWeb)
			localStorage.setItem("pvq-data", JSON.stringify(runtime.getInstanceByUid(486).getJsonDataCopy()));
			AppInterface.sendToApp(runtime.getInstanceByUid(486).getJsonDataCopy());
		},

		async Egame_Event33_Act1(runtime, localVars)
		{
			
		},

		async Ehud_Event79_Act4(runtime, localVars)
		{
			AppInterface.sendToApp(runtime.getInstanceByUid(488).getJsonDataCopy());
		},

		async Ehud_Event80_Act3(runtime, localVars)
		{
			localStorage.setItem("pvq-data", JSON.stringify(runtime.getInstanceByUid(486).getJsonDataCopy()));
			console.log(runtime.getInstanceByUid(486).getJsonDataCopy())
		},

		async Etutorial_Event4_Act4(runtime, localVars)
		{
			if(eval("runtime.globalVars.L"+runtime.globalVars.GameLevel+"TutorialDone")){
			runtime.goToLayout("Level"+runtime.globalVars.GameLevel)
			}
			else{
			runtime.goToLayout("Level"+runtime.globalVars.GameLevel+"_Tutorial");
			}
			
		},

		async Etutorial_Event5_Act1(runtime, localVars)
		{
			if(eval("runtime.globalVars.L"+runtime.globalVars.GameLevel+"TutorialDone")){
			runtime.goToLayout("Level"+runtime.globalVars.GameLevel)
			}
			else{
			runtime.goToLayout("Level"+runtime.globalVars.GameLevel+"_Tutorial");
			}
			
		},

		async Elevel1_Event70_Act4(runtime, localVars)
		{
			let data = JSON.parse(localStorage.getItem("pvq-data"));
			runtime.globalVars.RewardPoints = data.totalRewards;
			runtime.getInstanceByUid(486).setJsonDataCopy(data);
			
			
		},

		async Elevel2_Event112_Act4(runtime, localVars)
		{
			let data = JSON.parse(localStorage.getItem("pvq-data"));
			runtime.globalVars.RewardPoints = data.totalRewards;
			runtime.getInstanceByUid(486).setJsonDataCopy(data);
			
			
		},

		async Elevel3_Event104_Act4(runtime, localVars)
		{
			let data = JSON.parse(localStorage.getItem("pvq-data"));
			runtime.globalVars.RewardPoints = data.totalRewards;
			runtime.getInstanceByUid(486).setJsonDataCopy(data);
			
			
		},

		async Elevel4_Event89_Act4(runtime, localVars)
		{
			let data = JSON.parse(localStorage.getItem("pvq-data"));
			runtime.globalVars.RewardPoints = data.totalRewards;
			runtime.getInstanceByUid(486).setJsonDataCopy(data);
			
			
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
