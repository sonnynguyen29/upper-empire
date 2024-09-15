/*
    example test case 

    const testData = {
        correct: [
            {
                name: "John McLean",
                email: "john.mclean@example.com",
                phone: "+1 (123) 456-7890"  // Correct phone format with +1 country code
            }
        ],
        incorrect: [
            {
                name: "john",  // Incorrect: only first letter capitalized
                email: "john.mclean@example",  // Incorrect: missing top-level domain
                phone: "12345-67890"  // Incorrect: too many digits in the first group
            },
            {
                name: "J",  // Incorrect: too short
                email: "john..mclean@example.com",  // Incorrect: double dots in the local part
                phone: "(12) 345-6789"  // Incorrect: area code must have 3 digits
            },
            {
                name: "John McLean-Smith",  // Incorrect: hyphenated last name not supported by regex
                email: "john.mclean@@example.com",  // Incorrect: double '@' symbols
                phone: "+12 123-456-7890"  // Incorrect: wrong country code
            }
        ]
    };
*/

class PreOrderForm extends HTMLElement {
    constructor() {
        super();

        this.state = {
            isFormValid: false,
            isFormSubmitted: false,
            formData: {
                name: {
                    value: '',
                    required: true,
                    error: false,
                    errorMessage: 'Please enter your name',
                },
                email: {
                    value: '',
                    required: true,
                    error: false,
                    errorMessage: 'Please enter your email',
                },
                phone: {
                    value: '',
                    required: true,
                    error: false,
                    errorMessage: 'Please enter your phone',
                },
                required: {
                    value: '',
                    required: false,
                    error: false,
                    errorMessage: '',
                },
            },
        }

        this.INVALID_ERROR_MESSAGE = {
            name: 'Invalid Name: The name should start with a capital letter, contain only letters and spaces, and have no special characters or numbers.',
            email: `Invalid Email: Please enter a valid email address in the format 'example@domain.com'.`,
            phone: `Invalid Phone Number: The phone number should be a valid US number in formats like '123-456-7890', '(123) 456-7890', or '+1 123-456-7890'.`,
        }
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    updateFormData(data) {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                ...data
            }
        })
    }

    validationField(name, value) {
        const nameRegex = /^[A-Z][a-z]+(?: [A-Z][a-zA-Z]+)*$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:\+1[- ]?)?(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;

        switch (name) {
            case 'name':
                return nameRegex.test(value);
            case 'email':
                return emailRegex.test(value);
            case 'phone':
                return phoneRegex.test(value);
            default:
                return true;
        }
    }

    onFieldChanged(formField) {
        const input = formField.querySelector('input');
        const label = formField.querySelector('label');
        const errorMessageEl = formField.querySelector('.error-message');

        input.addEventListener('keydown', () => {
            input.classList.remove('error');
            errorMessageEl.textContent = '';
            errorMessageEl.classList.remove('block');
        })

        input.addEventListener('change', (event) => {
            let errorMessage = '';
            const { name, value } = event.target;
            const formData = { ...this.state.formData };
            const isValid = this.validationField(name, value);

            if (value !== '') {
                label.classList.add('filled');
            } else {
                label.classList.remove('filled');
            }

            if (!isValid) {
                errorMessage = !isValid ? this.INVALID_ERROR_MESSAGE[name] : formData[name].errorMessage;

                this.setFieldError(name, errorMessage);
            }

            formData[name] = {
                ...formData[name],
                value,
                error: !isValid,
                errorMessage,
            }

            this.updateFormData({ ...formData });
        });
    }

    setFieldError(name, errorMessage = false) {
        const fieldEl = this.querySelector(`#form-field-${name}`);
        const input = fieldEl.querySelector('input');
        const errorMessageEl = fieldEl.querySelector('.error-message');

        if (errorMessage) {
            input.classList.add('error');
            errorMessageEl.classList.add('block');
            errorMessageEl.textContent = errorMessage;
        } else {
            input.classList.remove('error');
            errorMessageEl.classList.remove('block');
            errorMessageEl.textContent = '';
        }
    }

    onSubmitClicked() {
        const formData = { ...this.state.formData };
        let isValid = true;

        for (const field in formData) {
            const isEmptyField = formData[field].value === '';
            const isRequiredField = formData[field].required;

            if (isEmptyField && isRequiredField) {
                this.setFieldError(field, `This field is required`);
                isValid = false;
                break;
            } else if (formData[field].error) {
                this.setFieldError(field, formData[field].errorMessage);
                isValid = false;
                break;
            }
        }

        if (isValid) {
            this.setState({
                isFormValid: true,
                isFormSubmitted: true,
            });

        } else {
            this.setState({
                isFormValid: false,
                isFormSubmitted: false,
            });

            return;
        }
        const button = this.querySelector('.btn-submit');

        button.classList.add('disabled');

        console.log({
            name: formData.name.value,
            email: formData.email.value,
            phone: formData.phone.value,
            required: formData.required.value,
            productName: this.dataset.productName,
            productSKU: this.dataset.productSku,
            productURl: window.location.href,
            productHandle: this.dataset.productHandle
        })

        window.Shopify.captcha.protect(this, () => {
            // EmailJS send function
            emailjs.send('service_qyf9904', 'template_ajdcxgc', {
                name: formData.name.value,
                email: formData.email.value,
                phone: formData.phone.value,
                required: formData.required.value,
                productName: this.dataset.productName,
                productSKU: this.dataset.productSKU,
                productURl: window.location.href,
                productHandle: this.dataset.productHandle
            })
                .then(response => {
                    console.log('Success:', response);
                    // alert('Email sent successfully!');

                    this.classList.add('hidden');
                    document.querySelector('.success-notification').classList.remove('hidden');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to send email.');
                });
        })
    }

    initialEventFormField() {
        this.formFields.forEach((formField) => {
            this.onFieldChanged(formField);
        })
    }

    initialEventSubmitted() {
        const button = this.querySelector('.btn-submit');

        button.addEventListener('click', (event) => {
            event.preventDefault();
            this.onSubmitClicked();
        });
    }

    initialEvent() {
        this.initialEventFormField();
        this.initialEventSubmitted();
    }

    connectedCallback() {
        this.classList.remove('hidden');
        document.querySelector('.success-notification').classList.add('hidden');

        emailjs.init({
            publicKey: '7s0KFRTTMnl9wwpBV',
        });
        this.formFields = this.querySelectorAll('.form-field');
        this.initialEvent();
    }
}

customElements.define('pre-order-form', PreOrderForm);

class PreOrderBlock extends HTMLElement {
    constructor() {
        super();

        this.state = {
            isFormOpened: false,
        }
    }

    preOrderClicked() {
        this.preOrderBtn.addEventListener('click', () => {
            this.preOrderLayout.classList.add('active');
            this.state = {
                isFormOpened: true,
            }
        });
    }

    onCloseForm() {
        this.state = {
            isFormOpened: false,
        }
        this.preOrderLayout.classList.remove('active');
    }

    onClickOutSideContainer() {
        document.addEventListener('click', (event) => {
            if (!this.preOrderContainer.contains(event.target) &&
                !event.target.matches('.pre-order-button.btn.add-to-cart--secondary')) {
                this.preOrderLayout.classList.remove('active');
            }
        });
    }

    onCloseBtnClicked() {
        this.btnClose.addEventListener('click', () => {
            this.onCloseForm();
        });
    }

    initialEvent() {
        this.preOrderClicked();
        this.onClickOutSideContainer();
        this.onCloseBtnClicked();
    }
    connectedCallback() {
        this.preOrderBtn = this.querySelector('button.pre-order-button');
        this.preOrderLayout = this.querySelector('pre-order-layout');
        this.preOrderContainer = this.querySelector('pre-order-container');
        this.btnClose = this.querySelector('button.btn-close.form-close');

        this.initialEvent();
    }
}

customElements.define('pre-order-block', PreOrderBlock);