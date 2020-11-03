// Listen for Submit

document.querySelector('#loan-form').addEventListener('submit', function (e) {
    // HIDE RESULTS
    document.getElementById('results').style.display = 'none';

    // SHOW LOADER
    document.getElementById('loading').style.display = 'block';

    // Show Results after 2secs by caliing the calculateResults function
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results

function calculateResults() {
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

        // SHOW RESULTS AFTER LOADING THE SPINNER FOR 2SECS
        document.getElementById('results').style.display = 'block';

        // HIDE SPINNER AFTER DISPLAYING RERSULTS
        document.getElementById('loading').style.display = 'none';


    } else {

        // GET DOMELEMENT OBJECT TO DISPLAY ERROR

        showError('please check your numbers');
    }

    e.preventDefault();
}

// SHOW ERROR

function showError(error) {

    // HIDE RESULTS AIF ITS SHOWING ERROR

    document.getElementById('results').style.display = 'none';

    // HIDE SPINNER AFTER DISPLAYING ERROR

    document.getElementById('loading').style.display = 'none';

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