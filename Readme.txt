1️⃣ What this service does

This AuthService is responsible for handling authentication in your Angular app. Its main jobs are:
Storing and tracking the user token
It keeps the JWT token in a reactive signal (this.token) so the app can react when login/logout happens.
It also stores the decoded payload (this.payload) which contains the user info like role, email, and token expiry.
Decoding JWTs
It can take a JWT and extract the user information from it (decodeJwt).
This allows your app to know who is logged in and what their role is.
Checking token validity
It can check if the token has expired (isTokenExpired).
This prevents using old tokens and keeps your app secure.
Login / mock authentication
For now, it simulates login by checking hard-coded credentials and generating a fake JWT.
Later it can be replaced with a real API call to your backend.
Logou
Clears the token and payload signals and removes the token from localStorage.
Redirects the user to the login page.
Reactive state
Using Angular signals and computed, components can automatically react to changes:
currentUserRole → always knows the role of the current user.
isLoggedIn → automatically updates when the token expires or the user logs out.
Persistence with localStorage
The token is automatically saved in localStorage and loaded on startup, so the user doesn’t have to log in every time they refresh the page.