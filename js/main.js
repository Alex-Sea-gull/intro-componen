// Посилання на поле вводу
const form = document.getElementById("order-form");

// Поля вводу
const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email-address')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')

// Повідомлення про помилки
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

// Змінна для валідації емейла
const emailSuccess = document.getElementById('email-success');
const passwordSuccess = document.getElementById('password-success');

// Регулярний вираз для перевірки емейл та пароля
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;



// Иконки глаз
const passwordEyeIcon = document.getElementById("password-eye-icon");
const confirmPasswordEyeIcon = document.getElementById("confirm-password-eye-icon");

// Обработчик клика по иконке для пароля
document.getElementById("toggle-password").addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        passwordEyeIcon.src = "./images/icon-close-eye.svg";
    } else {
        password.type = "password";
        passwordEyeIcon.src = "./images/icon-open-eye.svg";
    }
});

// Обработчик клика по иконке для подтверждения пароля
document.getElementById("confirm-toggle-password").addEventListener("click", function () {
    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
        confirmPasswordEyeIcon.src = "./images/icon-close-eye.svg";
    } else {
        confirmPassword.type = "password";
        confirmPasswordEyeIcon.src = "./images/icon-open-eye.svg";
    }
});


// Валідація
function validateFirstName() {
    const firstNameValue = firstName.value.trim();
    if (firstNameValue === '') {
        firstName.classList.add('invalid');
        firstNameError.textContent = 'Must be filled';
        firstNameError.classList.remove('hidden');
    } else {
        firstName.classList.remove('invalid');
        firstName.classList.add('valid');
        firstNameError.classList.add('hidden');
    }
}

function validateLastName() {
    const lastNameValue = lastName.value.trim();
    if (lastNameValue === '') {
        lastName.classList.add('invalid');
        lastNameError.textContent = 'Must be filled';
        lastNameError.classList.remove('hidden');
    } else {
        lastName.classList.remove('invalid');
        lastName.classList.add('valid');
        lastNameError.classList.add('hidden');
    }
}

function validateEmail() {
    const emailValue = email.value.trim();
    if (emailValue === '') {
        email.classList.add('invalid');
        emailError.textContent = 'Email is required';
        emailError.classList.remove('hidden');
    } else if (!emailValue.match(emailRegex)) {
        email.classList.add('invalid');
        emailError.textContent = 'Please enter a valid email';
        emailError.classList.remove('hidden');
    } else {
        email.classList.remove('invalid');
        email.classList.add('valid');
        emailError.classList.add('hidden');
    }
}

function validatePassword() {
    const passwordValue = password.value.trim();
    if (passwordValue === '') {
        password.classList.add('invalid');
        passwordError.textContent = 'Password is required';
        passwordError.classList.remove('hidden');
        passwordSuccess.classList.add('hidden');
    } else if (!passwordValue.match(passwordRegex)) {
        password.classList.add('invalid');
        passwordError.textContent = 'Password must be at least 8 characters, include at least one uppercase letter and one number';
        passwordError.classList.remove('hidden');
        passwordSuccess.classList.add('hidden');
    } else {
        password.classList.remove('invalid');
        password.classList.add('valid');
        passwordError.classList.add('hidden');
        passwordSuccess.classList.remove('hidden');
    }
}

// Перевірка совпадіння паролю
function validateConfirmPassword() {
    const confirmPasswordValue = confirmPassword.value.trim();
    if (confirmPasswordValue === '') {
        confirmPassword.classList.add('invalid');
        confirmPasswordError.textContent = 'Confirm Password is required';
        confirmPasswordError.classList.remove('hidden');
    } else if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('invalid');
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordError.classList.remove('hidden');
    } else {
        confirmPassword.classList.remove('invalid');
        confirmPassword.classList.add('valid');
        confirmPasswordError.classList.add('hidden');
    }
}

// Обробники на полях введення. Отримання помилок тільки при введенні
firstName.addEventListener('input', function () {
    validateFirstName();
});
lastName.addEventListener('input', function () {
    validateLastName();
});
email.addEventListener('input', function () {
    validateEmail();
});
password.addEventListener('input', function () {
    validatePassword();
    validateConfirmPassword();
});
confirmPassword.addEventListener('input', function () {
    validateConfirmPassword();
})

// Відправлення форми
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Перевірка полів перед відправкою
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    let isValid = true;

    // Якщо поля валідни відправляємо форму та зберігаємо в локальному сховищі
    if (
        !firstName.classList.contains('valid') ||
        !lastName.classList.contains('valid') ||
        !email.classList.contains('valid') ||
        !password.classList.contains('valid') ||
        !confirmPassword.classList.contains('valid')
    ) {
        isValid = false;
    }

    if (isValid) {
        localStorage.setItem('first-name', firstName.value);
        localStorage.setItem('last-name', lastName.value);
        localStorage.setItem('email-address', email.value);
        localStorage.setItem('password', password.value);

        console.log('Form submitted successfully');
        form.reset();
    } else {
        console.log('Please fill all fields correctly');
    }
});

