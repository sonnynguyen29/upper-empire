class SuggestionProducts extends HTMLElement {
    constructor() {
        super();
    }

    generateSuggestionItem() {

    }

    getSuggestionList() {
        const productEls = document.querySelectorAll('script#ProductJson');
        const products = [];
        productEls.forEach((productEl) => {
            products.push(JSON.parse(productEl.innerHTML));
        });

        console.log(products);
    }

    generateSuggestionList() {
    }

    render() {
        this.getSuggestionList();
        this.innerHTML = ''
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('suggestion-products', SuggestionProducts);