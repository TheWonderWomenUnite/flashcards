export class UtilsService {
// Shared utility functions

	randomString(strlen: number) {
	    // Given a string length strlen, generate and return a random string 
	    // of length strlen

	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    if (strlen < 1) return null;
	    
	    for (let i = 0; i < strlen; i++)
	      text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
  	}

	progressBarPic(progress:Number) {

		var retStr: String = '';

	    if (progress < 20) {
	      retStr = "../img/progressbarstart.png";
	    }
	    else if (progress < 40) {
	      retStr = "../img/progressbar20.png";
	    }
	    else if (progress < 60) {
	      retStr = "../img/progressbar40.png";
	    }
	    else if (progress < 80) {
	      retStr = "../img/progressbar60.png";
	    }
	    else if (progress < 100) {
	      retStr = "../img/progressbar80.png";
	    }
	    else {
	      retStr = "../img/progressbar100.png"; 
	    }

	    return retStr;

  	}
	
	heartPic(favorite:Boolean) {

		var retStr: String = '';

    	retStr = (favorite) ? 
      		"../img/heart_filled.png" : 
      		"../img/heart_unfilled.png";
      	return retStr;
	}

}	