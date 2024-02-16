function calculateBMI() {
    
    var height = parseFloat(document.getElementById('id_height').value);
    var weight = parseFloat(document.getElementById('id_weight').value);


    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Please enter valid numerical values for height and weight.');
        return;
    }

    var bmi = weight / (height * height);

    document.getElementById('id_bmiResult').innerHTML = 'Your BMI: ' + bmi.toFixed(2);

    var category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 24.9) {
        category = 'Normal Weight';
    } else if (bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    var bmiCategoryElement = document.getElementById('id_bmiCategory');
    bmiCategoryElement.innerHTML = category;
    

    switch(category) {
        case 'Underweight':
            bmiCategoryElement.style.color = '#f0d434';
            break;
        case 'Normal Weight':
            bmiCategoryElement.style.color = '#229159'; 
            break;
        case 'Overweight':
            bmiCategoryElement.style.color = '#d89126'; 
            break;
        case 'Obese':
            bmiCategoryElement.style.color = '#c42e2b'; 
            break;
        default:
            bmiCategoryElement.style.color = '#333'; 
    }


    document.getElementById('id_resultContainer').style.display = 'block';
}


function resetForm() {
    document.getElementById('id_resultContainer').style.display = 'none';
}