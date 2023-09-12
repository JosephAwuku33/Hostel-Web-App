import axios from "axios";

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

const API_URL: string = "http://localhost:4000/users/";

// Register user
const register = async (userData: UserData): Promise<ApiResponse | null> => {
  try {
    const response = await axios.post(
      "http://localhost:4000/users/signup",
      userData
    );

    console.log(response);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data || null;
  } catch (error) {
    // Handle errors here
    console.log("Error registering user:", error);
    return null;
  }
};

// Login user
const login = async (userData: UserData): Promise<ApiResponse | null> => {
  try {
    const response = await axios.post<ApiResponse>(
      API_URL + "login",
      userData
    );

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data || null;
  } catch (error) {
    // Handle errors here
    console.error("Error logging in user:", error);
    return null;
  }
};

// Logout user
const logout = (): void => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
