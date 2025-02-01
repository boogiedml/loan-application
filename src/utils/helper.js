let logoutTimer = null;

// Convert Firebase error codes to readable messages
export const getFriendlyErrorMessage = (errorCode) => {
  if (errorCode.includes("too-many-requests"))
    return "Too many failed attempts. Try again later.";
  if (errorCode.includes("email-already-in-use"))
    return "Email already in use. Please sign in.";
  if (errorCode.includes("weak-password"))
    return "Password is too weak. Please try again.";
  if (errorCode.includes("invalid-credential"))
    return "Invalid credentials. Please try again.";
  return "An error occurred. Please try again.";
};

// Automatically logs out the user when the token expires
export const startAutoLogout = (timeRemaining) => {
  if (logoutTimer) clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => {
    localStorage.removeItem("user");
  }, timeRemaining);
};
