import { AbstractControl, ValidatorFn } from '@angular/forms';

// Валидатор ника (минимум 5, максимум 40 символов)
export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const username = control.value;
    const minLength = 5;
    const maxLength = 40;
    if (!username || username.length < minLength) {
      return {'minlength': {requiredLength: minLength, actualLength: username ? username.length : 0}};
    } else if (username.length > maxLength) {
      return {'maxlength': {requiredLength: maxLength, actualLength: username.length}};
    }
    return null;
  };
}

// Валидатор логина (минимум 10 символов)
export function loginValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const login = control.value;
    const minLength = 10;
    if (!login || login.length < minLength) {
      return {'minlength': {requiredLength: minLength, actualLength: login ? login.length : 0}};
    }
    return null;
  };
}

export function confirmPasswordValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;
    if(!control.parent)
      return null;
    const confirmControl = control.parent.get(controlName);
    if (confirmControl && value !== confirmControl.value) {
      return {'confirmPassword': true};
    }
    return null;
  };
}

// Валидатор пароля (минимум 8 символов, хотя бы 1 цифра и 1 заглавная буква)
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const password = control.value;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    if (!password || password.length < minLength) {
      return {'minlength': {requiredLength: minLength, actualLength: password ? password.length : 0}};
    } else if (!hasUppercase || !hasDigit) {
      return {'invalidPassword': true};
    }
    return null;
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const valid = emailRegex.test(value);
    return valid ? null : {'email': true};
  };
}

// Валидатор ИНН (10 или 12 цифр)
export function innValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const inn = control.value;
    const isValidLength = inn && (inn.length === 10 || inn.length === 12);
    const pattern = /^[0-9]+$/;
    const isDigitsOnly = pattern.test(inn);
    if (!isValidLength || !isDigitsOnly) {
      return {'invalidInn': true};
    }
    return null;
  };
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const valid = urlRegex.test(value);
    return valid ? null : {'url': true};
  };
}
