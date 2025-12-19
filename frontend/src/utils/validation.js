// Email validation
export const validateEmail = (email) => {
    if (!email) {
        return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }
    return null;
};

// Password validation
export const validatePassword = (password) => {
    if (!password) {
        return "Password is required";
    }
    if (password.length < 8) {
        return "Password must be at least 8 characters";
    }
    if (!/[A-Za-z]/.test(password)) {
        return "Password must contain at least one letter";
    }
    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one number";
    }
    return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
        return "Please confirm your password";
    }
    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    return null;
};

// Name validation
export const validateName = (name) => {
    if (!name) {
        return "Name is required";
    }
    if (name.length < 2) {
        return "Name must be at least 2 characters";
    }
    return null;
};

// Required field validation
export const validateRequired = (value, fieldName = "This field") => {
    if (!value || (typeof value === "string" && !value.trim())) {
        return `${fieldName} is required`;
    }
    return null;
};

// Validate login form
export const validateLoginForm = (email, password) => {
    const errors = {};

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validateRequired(password, "Password");
    if (passwordError) errors.password = passwordError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

// Validate signup form
export const validateSignupForm = (name, email, password, confirmPassword) => {
    const errors = {};

    const nameError = validateName(name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;

    const confirmError = validateConfirmPassword(password, confirmPassword);
    if (confirmError) errors.confirmPassword = confirmError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
