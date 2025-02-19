// Prices for different coffee and add-ons
const coffeePrices = {
    cappuccino: 3.5,
    latte: 4.0
  };
  
  const addonPrices = {
    extraShot: 1.0,
    whippedCream: 0.5,
    vanillaSyrup: 0.75
  };
  
  // Variables to track order details
  let coffeeCount = {
    cappuccino: 0,
    latte: 0
  };
  
  let addons = {
    extraShot: 0,
    whippedCream: 0,
    vanillaSyrup: 0
  };
  
  // Update total based on the coffee and add-on selections
  function updateTotal() {
    coffeeCount.cappuccino = parseInt(document.getElementById('coffee1').value) || 0;
    coffeeCount.latte = parseInt(document.getElementById('coffee2').value) || 0;
  
    addons.extraShot = document.getElementById('addon1').checked ? 1 : 0;
    addons.whippedCream = document.getElementById('addon2').checked ? 1 : 0;
    addons.extraShotLatte = document.getElementById('addon3').checked ? 1 : 0;
    addons.vanillaSyrup = document.getElementById('addon4').checked ? 1 : 0;
  
    let subtotal = 0;
  
    // Calculate subtotal for each coffee
    subtotal += coffeeCount.cappuccino * coffeePrices.cappuccino;
    subtotal += coffeeCount.latte * coffeePrices.latte;
  
    // Add the cost for add-ons
    subtotal += (addons.extraShot * addonPrices.extraShot);
    subtotal += (addons.whippedCream * addonPrices.whippedCream);
    subtotal += (addons.extraShotLatte * addonPrices.extraShot);
    subtotal += (addons.vanillaSyrup * addonPrices.vanillaSyrup);
  
    // Display subtotal and total
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    let total = subtotal; // Apply discounts or taxes here if necessary
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
  }
  
  // Generate an invoice
  function generateInvoice() {
    const invoiceDetails = document.getElementById('invoice-details');
    invoiceDetails.innerHTML = `<p>Cappuccinos: ${coffeeCount.cappuccino} x $${coffeePrices.cappuccino} = $${(coffeeCount.cappuccino * coffeePrices.cappuccino).toFixed(2)}</p>`;
    invoiceDetails.innerHTML += `<p>Lattes: ${coffeeCount.latte} x $${coffeePrices.latte} = $${(coffeeCount.latte * coffeePrices.latte).toFixed(2)}</p>`;
  
    // Add-ons
    if (addons.extraShot) invoiceDetails.innerHTML += `<p>Extra Shot: $${(addons.extraShot * addonPrices.extraShot).toFixed(2)}</p>`;
    if (addons.whippedCream) invoiceDetails.innerHTML += `<p>Whipped Cream: $${(addons.whippedCream * addonPrices.whippedCream).toFixed(2)}</p>`;
    if (addons.extraShotLatte) invoiceDetails.innerHTML += `<p>Extra Shot for Latte: $${(addons.extraShotLatte * addonPrices.extraShot).toFixed(2)}</p>`;
    if (addons.vanillaSyrup) invoiceDetails.innerHTML += `<p>Vanilla Syrup: $${(addons.vanillaSyrup * addonPrices.vanillaSyrup).toFixed(2)}</p>`;
  
    invoiceDetails.innerHTML += `<p><strong>Total: $${document.getElementById('total').textContent.slice(1)}</strong></p>`;
  
    // Show the invoice section
    document.getElementById('invoice').style.display = 'block';
  }
  
  // Print the invoice
  function printInvoice() {
    const invoiceContent = document.getElementById('invoice').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = invoiceContent;
    window.print();
    document.body.innerHTML = originalContent; // Restore original page content
  }
  