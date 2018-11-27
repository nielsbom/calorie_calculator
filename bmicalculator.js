// BMI calculator

function bmiCalc (weight, height) {
  return weight / (height * height);
}

function bmiDescription (bmi) {
  let result = 'morbidly obese';
  if (bmi < 15)
    result = 'very severely underweight';
  if (bmi >= 15 && bmi < 16)
    result = 'severely underweight';
  if (bmi >= 16 && bmi < 18.5)
    result = 'underweight';
  if (bmi >= 18.5 && bmi < 25)
    result = 'normal (healthy weight)';
  if (bmi >= 25 && bmi < 30)
    result = 'overweight';
  if (bmi >= 30 && bmi < 35)
    result = 'moderately obese';
  if (bmi >= 35 && bmi < 40)
    result = 'severely obese';
  return result;
}

(() => {
  let height = prompt('What is your height in centimeters?') / 100;
  let weight = prompt('What is your weight in kilograms?');
  let bmi = bmiCalc(weight, height);
  let description = bmiDescription(bmi);

  let bmiRounded = bmi.toFixed(2);

  document.write(`Your BMI is ${bmiRounded}. You are ${description}.`);
})();
