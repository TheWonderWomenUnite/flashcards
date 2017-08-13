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

}	