let currentStep = 1;

function showStep(step) {
    const steps = document.querySelectorAll('.estimate-step');
    steps.forEach((el, index) => {
        el.classList.add('hidden');
        if (index === step - 1) {
            el.classList.remove('hidden');
        }
    });

    const progressBar = document.getElementById('progress-bar');
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((stepEl, index) => {
        if (index < step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });

    progressBar.style.width = `${(step - 1) / (progressSteps.length - 1) * 100}%`;

    const progressPercent = document.getElementById('progress-percent');
    const percent = Math.round(((step - 1) / (progressSteps.length - 1)) * 100);
    progressPercent.textContent = `Step ${step} of ${progressSteps.length} (${percent}%)`;

    if (step === 6) {
        calculateTotal();
        addSubmitLink();
    }
}

function nextStep() {
    if (currentStep < 6) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function calculateTotal() {
    let total = 0;
    let breakdownHTML = '';

    const siteType = document.querySelector('input[name="site-type"]:checked');
    if (siteType) {
        const price = parseInt(siteType.value);
        total += price;
        breakdownHTML += `<tr><td>Website Type</td><td>$${price}</td></tr>`;
    }

    const pageCount = parseInt(document.getElementById('page-count').value);
    const pagePrice = pageCount * 50;
    total += pagePrice;
    breakdownHTML += `<tr><td>Pages (${pageCount} pages)</td><td>$${pagePrice}</td></tr>`;

    const featureArr = [];
    document.querySelectorAll('#step-3 input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
            const label = cb.getAttribute('data-label');
            const price = parseInt(cb.value);
            total += price;
            breakdownHTML += `<tr><td>Feature: ${label}</td><td>$${price}</td></tr>`;
            featureArr.push(label);
        }
    });

    const designArr = [];
    document.querySelectorAll('#step-4 input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
            const label = cb.getAttribute('data-label');
            const price = parseInt(cb.value);
            total += price;
            breakdownHTML += `<tr><td>Design: ${label}</td><td>$${price}</td></tr>`;
            designArr.push(label);
        }
    });

    const hostingArr = [];
    document.querySelectorAll('#step-5 input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
            const label = cb.getAttribute('data-label');
            const price = parseInt(cb.value);
            total += price;
            breakdownHTML += `<tr><td>Hosting/Maintenance: ${label}</td><td>$${price}</td></tr>`;
            hostingArr.push(label);
        }
    });

    document.getElementById('estimate-breakdown').innerHTML = breakdownHTML;
    document.getElementById('result').textContent = `$${total}`;

    window.finalEstimateData = {
        site: siteType ? siteType.getAttribute('data-label') : '',
        pages: pageCount,
        features: featureArr.join(', '),
        design: designArr.join(', '),
        hosting: hostingArr.join(', '),
        total: `$${total}`
    };
}

function addSubmitLink() {
    const data = window.finalEstimateData;
    const link = document.querySelector('#step-6 a');
    const url = new URL('/pages/form.html', window.location.origin);
    url.searchParams.set('site', data.site);
    url.searchParams.set('pages', data.pages);
    url.searchParams.set('features', data.features);
    url.searchParams.set('design', data.design);
    url.searchParams.set('hosting', data.hosting);
    url.searchParams.set('total', data.total);
    link.href = url.toString();
}

window.addEventListener('DOMContentLoaded', () => {
    showStep(currentStep);
});
