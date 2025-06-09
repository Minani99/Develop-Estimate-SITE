let currentStep = 1;

function showStep(step) {
    const steps = document.querySelectorAll('.estimate-step');
    steps.forEach((el, index) => {
        el.classList.add('hidden');
        if (index === step - 1) {
            el.classList.remove('hidden');
        }
    });

    // Update Progress Bar
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

    // Update Progress Percent
    const progressPercent = document.getElementById('progress-percent');
    const percent = Math.round(((step - 1) / (progressSteps.length - 1)) * 100);
    progressPercent.textContent = `Step ${step} of ${progressSteps.length} (${percent}%)`;

    // If Step 6 → Calculate Total
    if (step === 6) {
        calculateTotal();
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

    // Step 1: Site Type (radio)
    const siteType = document.querySelector('input[name="site-type"]:checked');
    if (siteType) {
        const price = parseInt(siteType.value);
        total += price;
        breakdownHTML += `<tr><td>Website Type</td><td>$${price}</td></tr>`;
    }

    // Step 2: Page Count
    const pageCount = parseInt(document.getElementById('page-count').value);
    const pagePrice = pageCount * 50;
    total += pagePrice;
    breakdownHTML += `<tr><td>Pages (${pageCount} pages)</td><td>$${pagePrice}</td></tr>`;

    // Step 3: Core Features
    const coreFeatures = document.querySelectorAll('#step-3 input[type="checkbox"]');
    coreFeatures.forEach(cb => {
        if (cb.checked) {
            const price = parseInt(cb.value);
            total += price;
            breakdownHTML += `<tr><td>Feature: ${cb.parentElement.textContent.trim()}</td><td>$${price}</td></tr>`;
        }
    });

    // Step 4: Design Options
    const designOptions = document.querySelectorAll('#step-4 input[type="checkbox"]');
    designOptions.forEach(cb => {
        if (cb.checked) {
            const price = parseInt(cb.value);
            total += price;
            breakdownHTML += `<tr><td>Design: ${cb.parentElement.textContent.trim()}</td><td>$${price}</td></tr>`;
        }
    });

    // Step 5: Hosting & Maintenance
    const hostingOptions = document.querySelectorAll('#step-5 input[type="checkbox"]');
    hostingOptions.forEach(cb => {
        if (cb.checked) {
            const price = parseInt(cb.value);
            total += price;
            breakdownHTML += `<tr><td>Hosting/Maintenance: ${cb.parentElement.textContent.trim()}</td><td>$${price}</td></tr>`;
        }
    });

    // Display breakdown
    const breakdownTable = document.getElementById('estimate-breakdown');
    breakdownTable.innerHTML = breakdownHTML;

    // Display total
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `$${total}`;
}

// Initialize first step on load
window.addEventListener('DOMContentLoaded', () => {
    showStep(currentStep);
});
