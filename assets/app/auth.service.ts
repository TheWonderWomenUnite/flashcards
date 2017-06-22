// This is the placeholder for logging in/out logic

export class AuthService {

	loggedIn = false;

	isAuthenticated() {
		const promise = new Promise(
			(resolve, reject) => {
				setTimeout(() => {
					resolve(this.loggedIn)}, 100)
			}
			);
		return promise;
	}

	login() {
		this.loggedIn = true;

	}

	logout() {
		this.loggedIn = false;
	}
}