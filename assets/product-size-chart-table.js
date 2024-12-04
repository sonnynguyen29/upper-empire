class SizeChartTable extends HTMLElement {
    constructor() {
        super();
    }

    init() {
        const switchButton = this.querySelectorAll('button');

        switchButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                if (!button.classList.contains('active')) {
                    switchButton.forEach((btn) => {
                        btn.classList.remove('active');
                    });

                    const table = button.dataset.controlTable;

                    this.querySelectorAll('.size-chart-table').forEach((item) => {
                        item.classList.remove('visible');

                        if (item.dataset.table === table) {
                            item.classList.add('visible');
                        }
                    });

                    button.classList.add('active');
                }
            });
        });
    }

    connectedCallback() {
        this.init();
    }
}

customElements.define('size-chart-table', SizeChartTable);