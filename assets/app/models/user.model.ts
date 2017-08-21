// This is the client side model for the user Object
// email: The email address for this user
// password: The password that the user chose for authentication
// firstName: Optional, the user's first name
// lastName: Optional, the user's last name

export class User {

	constructor(public email: string, 
				public password: string,
				public firstName?: string,
				public lastName?: string) {}
}