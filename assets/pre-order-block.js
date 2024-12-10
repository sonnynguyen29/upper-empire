/*
    example test case 

    const testData = {
        correct: [
            {
                name: "Alice Johnson",
                email: "alice.johnson@example.com",
                phone: "+1 (234) 567-8901"  // Correct phone format with +1 country code
            },
            {
                name: "Bob Smith",
                email: "bob.smith@example.com",
                phone: "+1 (345) 678-9012"  // Correct phone format with +1 country code
            },
            {
                name: "Charlie Brown",
                email: "charlie.brown@example.com",
                phone: "+1 (456) 789-0123"  // Correct phone format with +1 country code
            },
            {
                name: "Diana Prince",
                email: "diana.prince@example.com",
                phone: "+1 (567) 890-1234"  // Correct phone format with +1 country code
            },
            {
                name: "Ethan Hunt",
                email: "ethan.hunt@example.com",
                phone: "+1 (678) 901-2345"  // Correct phone format with +1 country code
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



    dummy payload

   { 
        "body":  {
        "toEmail": "dat.nguyennguyenthanh@lovepopcards.com",
        "templateData": {
            "customer": {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "phone": "+1234567890",
                "additional_information": "Please deliver between 9 AM and 12 PM."
            },
            "product": {
                "title": "Premium Leather Wallet",
                "url": "https://example.com/products/premium-leather-wallet",
                "image": "https://upperempire.com/cdn/shop/files/CAD64B9D-6249-45B1-9A90-3FC2CA7537F8.jpg?v=1704783732",
                "handle": "premium-leather-wallet"
            }
        }
    }
   }
}
*/

class PreOrderForm extends HTMLElement {
    constructor() {
        super();

        this.preOrderFormFields = this.querySelectorAll('.form-field');

        const formData = Array.from(this.preOrderFormFields).reduce((acc, formField) => {
            const { errorMessage, validation, name, isRequired } = formField.dataset;

            const field = {
                [name]: {
                    value: '',
                    required: isRequired === 'true',
                    error: false, // Default no error
                    errorMessage: errorMessage || '',
                    validation: validation || ''
                }
            };

            return Object.assign(acc, field);
        }, {});

        console.log(formData);

        this.state = {
            isFormValid: false,
            isFormSubmitted: false,
            formData
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
        const fields = { ...this.state.formData };

        if (!fields[name]) {
            // If the field is not defined, return true (valid by default)
            return true;
        }

        const { validation } = fields[name];

        if (!validation) {
            // If no validation is provided, return true (valid by default)
            return true;
        }

        // Convert the validation string into a RegExp object
        const regex = new RegExp(validation.slice(1, -1)); // Remove the leading and trailing slashes
        return regex.test(value);
    };

    onFieldChanged(formField) {
        const input = formField.querySelector('textarea') || formField.querySelector('input');
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
                errorMessage = value === '' && formData[name].required ? `This field is required` : this.INVALID_ERROR_MESSAGE[name];
            }

            formData[name] = {
                ...formData[name],
                value,
                error: !isValid,
                errorMessage,
            }

            console.log('formData', formData)

            this.setFieldError(name, errorMessage);
            this.updateFormData({ ...formData });
        });
    }

    setFieldError(name, errorMessage = false) {
        const fieldEl = this.querySelector(`#form-field-${name}`);
        const input = fieldEl.querySelector('textarea') || fieldEl.querySelector('input');
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

    createUTCTimeNow() {
        const options = {
            timeZone: 'America/New_York',
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23',
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(new Date());

        const formattedDate = `${parts.find(p => p.type === 'weekday').value}, ${parts.find(p => p.type === 'day').value} ${parts.find(p => p.type === 'month').value} ${parts.find(p => p.type === 'year').value} ${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}:${parts.find(p => p.type === 'second').value}`;
        return formattedDate;
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
            const {
                productName,
                productHandle,
                productImage,
                productPrice,
                productSku
            } = this.dataset;
            const data = {
                "customer": {
                    "name": formData.name.value || '-',
                    "email": formData.email.value || '-',
                    "phone": formData.phone.value || '-',
                    "additional_information": formData.required.value || '-',
                    "order_at": this.createUTCTimeNow()
                },
                "product": {
                    "title": productName || '-',
                    "url": window.location.href || '-',
                    "image": productImage.replace('//upperempire.com/cdn/shop/files/', 'https://upperempire.com/cdn/shop/files/') || '-',
                    "handle": productHandle || '-',
                    "price": productPrice || '-',
                    "sku": productSku || '-',
                }
            }

            this.sendDynamicTemplateEmail(data);
        })
    }

    async sendDynamicTemplateEmail(emailData) {
        const url = 'https://oxzzlu2of8.execute-api.us-east-1.amazonaws.com/upper-empire/preorder-notification';

        const data = {
            body: JSON.stringify({
                "templateData": {
                    ...emailData
                }
            })
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            document.querySelector('pre-order-container .form').classList.add('hidden');
            if (response.ok) {
                console.log('Submit email success', response.statusText);
                document.querySelector('.success-notification').classList.remove('hidden');
            } else {
                console.error('Error sending email:', response.statusText);
                document.querySelector('.failed-notification').classList.remove('hidden');
            }
        } catch (error) {
            console.error('Request failed:', error);
            document.querySelector('pre-order-container .form').classList.add('hidden');
            document.querySelector('.failed-notification').classList.remove('hidden');
        }
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
        document.querySelector('.failed-notification').classList.add('hidden');

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
        this.preOrderLayout = this.querySelector('pre-order-layout');
        this.btnClose = this.querySelector('button.btn-close.form-close');
        this.preOrderContainer = this.querySelector('pre-order-container');
    }

    // preOrderClicked() {
    //     document.querySelector('button.pre-order-button').addEventListener('click', () => {
    //         this.preOrderLayout.classList.add('active');
    //         this.state = {
    //             isFormOpened: true,
    //         }
    //     });
    // }

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
        // this.preOrderClicked();
        this.onClickOutSideContainer();
        this.onCloseBtnClicked();
    }

    connectedCallback() {
        // this.preOrderBtn = document.querySelector('button.pre-order-button');

        this.initialEvent();
    }
}

customElements.define('pre-order-block', PreOrderBlock);

