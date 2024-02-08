export const isValidName = (name: string): boolean => {
    // Verifica si el nombre tiene al menos un carácter
    return name.trim().length > 0;
};

export const isValidEmail = (email_: string): boolean => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email_);
};

export const isValidPhone = (phone: string) => {
    // Expresión regular para verificar si la cadena contiene solo números
    const numbersRegex = /^[0-9]+$/;
    // Verificar si la cadena cumple con la expresión regular
    return numbersRegex.test(phone);
};

export const isValidGender = (gender: string) => {

    let result = false;
    switch (gender) {
        case 'male':
            result = true;
            break;
        case 'female':
            result = true;
            break;
        case 'masculino':
            result = true;
            break;
        case 'femenino':
            result = true;
            break;
        default:
            break;
    }
    return result;
    // if (gender === 'male' || 'female' || 'masculino' || 'femenino')

        // return  ? true : false;
};


