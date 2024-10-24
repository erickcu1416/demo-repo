import { ERROR_CODES } from "../constants/error_codes.constant";

export const FIREBASE_MAPPER = {
    'auth/email-already-exists': ERROR_CODES.A001.code_error,
}


export const getStatusErrorWithOutPrefix = code => {
	const errorCodeTras = FIREBASE_MAPPER[code];
    if (errorCodeTras) {
        return ERROR_CODES[errorCodeTras]   
    }
    
    return ERROR_CODES.unknown
    
};
