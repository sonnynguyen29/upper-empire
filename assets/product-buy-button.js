//onVariantChange 

function onVariantChange(event) {
    const CheckOutButton = document.querySelector('button#CheckOut');
    const wrapper = document.querySelector('.paymentButtonsWrapper');

    const { swatchOptionAvailable } = this.dataset;
    const swatchOptionAvailableBool = swatchOptionAvailable === 'true';

    if (swatchOptionAvailableBool) {
        CheckOutButton.style.display = 'flex';
        wrapper.style.gridTemplateColumns = '1fr 1fr';
    } else {
        CheckOutButton.style.display = 'none';
        wrapper.style.gridTemplateColumns = '1fr';
    }
};


document.addEventListener('DOMContentLoaded', function () {
    const swatchEl = document.querySelectorAll('.swatch-element');

    swatchEl.forEach((swatch) => {
        swatch.addEventListener('click', onVariantChange);
    });
});