document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form") || document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Clear previous error messages
        errorMessage.innerText = "";

        // Determine if it's a signup or login form
        const isSignup = form.id === "signup-form";

        // Get form values
        const firstname = isSignup ? document.getElementById("firstname-input").value.trim() : null;
        const email = document.getElementById("email-input").value.trim();
        const password = document.getElementById("password-input").value.trim();
        const repeatPassword = isSignup ? document.getElementById("repeat-password-input").value.trim() : null;

        // Validate inputs
        const error = isSignup
            ? validateSignupForm(firstname, email, password, repeatPassword)
            : validateLoginForm(email, password);

        if (error) {
            errorMessage.innerText = error;
            return;
        }

        // Disable submit button and show loading text
        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;
        submitButton.innerText = "Loading...";

        // Submit the form data to the server
        try {
            const endpoint = isSignup ? "http://localhost:5000/api/users/register" : "http://localhost:5000/api/users/login";
            const body = isSignup
                ? { firstname, email, password }
                : { email, password };

            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect based on the form type
                window.location.href = isSignup ? "/login.html" : "/dashboard.html";
            } else {
                // Display server-provided error message or fallback
                errorMessage.innerText = data.message || "An error occurred. Please try again.";
            }
        } catch (err) {
            // Log the error for debugging
            console.error("Error during form submission:", err);
            errorMessage.innerText = "Unable to connect to the server. Please check your internet connection.";
        } finally {
            submitButton.disabled = false;
            submitButton.innerText = isSignup ? "Create Account" : "Login";
        }
    });

    // Validation for signup form
    function validateSignupForm(firstname, email, password, repeatPassword) {
        if (!firstname) return "Firstname is required.";
        if (!isValidEmail(email)) return "Invalid email format.";
        if (password.length < 8) return "Password must be at least 8 characters long.";
        if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
        if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
        if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
        if (!/[!@#$%^&*?]/.test(password)) return "Password must contain at least one special character.";
        if (password !== repeatPassword) return "Passwords do not match.";
        return null; // No errors
    }

    // Validation for login form
    function validateLoginForm(email, password) {
        if (!isValidEmail(email)) return "Invalid email format.";
        if (!password) return "Password is required.";
        return null; // No errors
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});