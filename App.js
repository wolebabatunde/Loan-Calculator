// Listen for Submit

document.querySelector('#loan-form').addEventListener('submit', calculateResults);

// Calculate Results

function calculateResults(e) {
    // console.log('calculating...');

    // GET UI 

    const amount = document.getElementById('amount');

    const interest = document.getElementById('interest');

    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');

    const totalPayment = document.getElementById('total-payment');

    const totalInterest = document.getElementById('total-interest');

    // END OF UI

    // We'll create principle that we'll use to get the value and run it through "PARSEFLOAT (Decimal)"

    const principle = parseFloat(amount.value);

    const calculatedInterest = parseFloat(interest.value) / 100 / 12;

    const calculatedPayment = parseFloat(years.value * 12);

    // COMPUTE MONTHLY

    const x = Math.pow(1 + calculatedInterest, calculatedPayment);

    const monthly = (principle * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);

        totalPayment.value = (monthly * calculatedPayment).toFixed(2);

        totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed(2);
    } else {
        // GET DOMELEMENT OBJECT TO DISPLAY ERROR

        showError('please check your numbers');
    }

    e.preventDefault();
}


function showError(error) {

    // Create Div Elements
    const errorDiv = document.createElement('div');

    // Add Bootsrap className

    errorDiv.className = 'alert alert-danger';

    // Add Text Node and append to Div

    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Insert the Error div above heading

    card.insertBefore(errorDiv, heading);

    // CLEAR ERROR AFTER 3 SECONDS

    setTimeout(clearError, 3000);
}

// CLEAR ERROR

function clearError() {
    document.querySelector('.alert').remove();
}