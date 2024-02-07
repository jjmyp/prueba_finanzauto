export const isValidName = (name: string): boolean => {
    // Verifica si el nombre tiene al menos un carácter
    return name.trim().length > 0;
};

export const isValidEmail = (email_: string): boolean => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email_);
};
