
export interface UserData {
  // Define the structure of your user data here
  // For example:
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

export interface ApiResponse {
  // Define the structure of the API response data here
  // For example, if the response returns a user object, it might look like this:
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;
  };
}


export interface UserInfo {
  token?: string | null,
  isAuthenticated : boolean
  first_name: string | null;
  last_name: string | null;
}
