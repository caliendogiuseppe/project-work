const slider = document.getElementById('slider-range');

noUiSlider.create(slider, {
    start: [20, 80],         // valori iniziali
    connect: true,           // riempi tra i due
    range: {
        'min': 0,
        'max': 100
    },
    step: 1,
    tooltips: true,          // mostra i tooltip
    format: {
        to: value => Math.round(value),
        from: value => Number(value)
    }
});

const valueDisplay = document.getElementById('slider-values');
slider.noUiSlider.on('update', (values) => {
    valueDisplay.innerText = `${values[0]} - ${values[1]}`;
});

