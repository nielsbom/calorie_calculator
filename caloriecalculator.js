// Stuk tekst hier, zodat ik een pull request kan maken :-)
// // Calculate age function
// function calcAge (dob) {
//   let diffMs = Date.now() - dob.getTime();
//   let ageDt = new Date(diffMs);
//   return Math.abs(ageDt.getUTCFullYear() - 1970);
// }

// Get basic bodystats & parameters
function bodyStats (name, gender, height, weight, fatPercentage, avgTrainingTime, activityLevel) {
  this.name = name;
  this.gender = gender;
  this.height = height;
  this.weight = weight;
  this.fatPercentage = fatPercentage;
  this.avgTrainingTime = avgTrainingTime;
  this.activityLevel = activityLevel;

  function calcAge (dob) {
    let diffMs = Date.now() - dob.getTime();
    let ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }
  // Welcome message --> birthday invullen
  console.log(`Hi ${name}, you are a ${calcAge(new Date(1990, 6, 14))} year old ${gender}, ${height} centimeters tall and weigh ${weight} kilograms with a fat percentage of ${fatPercentage}%.`);
}

// Invullen v.l.n.r.: Naam, male/female, lengte (in cm), gewicht (in kg), vetpercentage, gem. duur van training in min., activiteiten niveau: inactive, slightly active, moderately active, very active.

bodyStats( 'Sjoerd', 'male', 186, 88, 15, 75, 'moderately active');

console.log(`
--- Here are your caloric statistics ---

`);

// Functions for calculations

// Fat free mass calc
function calcFFM (weight, fatPercentage) {
  let FFM = weight * (1 - fatPercentage / 100);
  return FFM.toFixed(2);
}

console.log(`Fat free mass: ${calcFFM(weight, fatPercentage)} kg`);

// Basal metabolic rate formula
function katchMcArdleBMR (weight, fatPercentage) {
  let BMR = 370 + (21.6 * (weight * (1 - fatPercentage / 100)));
  return BMR.toFixed(2);
}

console.log(`Basal metabolic rate (BMR): ${katchMcArdleBMR(weight, fatPercentage)} calories per day`);

// Energy expenditure during training sessions (depends on avgTrainingTime value from bodyStats)
function trainingEnergyExpenditure (weight, avgTrainingTime) {
  let TEE = 0.1 * avgTrainingTime * weight;
  return TEE.toFixed(2);
}

console.log(`Training energy expenditure: ${trainingEnergyExpenditure(weight, avgTrainingTime)}`);

// Thermic Effect of Food
function TEF (fatPercentage) {
  let thermicEffectFood;

  if (fatPercentage >= 25) {
    thermicEffectFood =  1.05;
  } else if (fatPercentage >= 20 && fatPercentage < 25) {
    thermicEffectFood = 1.1;
  } else if (fatPercentage >= 15 && fatPercentage < 20) {
    thermicEffectFood = 1.15;
  } else if (fatPercentage >= 10 && fatPercentage < 15) {
    thermicEffectFood = 1.20;
  } else {
    thermicEffectFood = 1.25;
  }
  return thermicEffectFood;
}
console.log(`Thermic effect of food: ${TEF(fatPercentage)}`);

// Physical Activity Factor
function physicalActivityFactor (gender, generalActivityLevel) {
 
  let pafMale = [1.0, 1.10, 1.25, 1.48];
  let pafFemale = [1.0, 1.12, 1.27, 1.45];

  if (gender === 'male' && generalActivityLevel === 'inactive') {
    return pafMale[0];
  } else if (gender === 'male' && generalActivityLevel === 'slightly active') {
    return pafMale[1];
  } else if (gender === 'male' && generalActivityLevel === 'moderately active') {
    return pafMale[2];
  } else if (gender === 'male' && generalActivityLevel === 'very active') {
    return pafMale[3];
  } else if (gender === 'female' && generalActivityLevel === 'inactive') {
    return pafFemale[0];
  } else if (gender === 'female' && generalActivityLevel === 'slightly active') {
    return pafFemale[1];
  } else if (gender === 'female' && generalActivityLevel === 'moderately active') {
    return pafFemale[2];
  } else (gender === 'female' && generalActivityLevel === 'very active')
  return pafFemale[3];
}

console.log(`General physical Activity Factor: ${physicalActivityFactor(gender, activityLevel)}`);

// Rest Day Energy Expenditure
function restdayEnergyExpenditure () {
  let bmr = katchMcArdleBMR(weight, fatPercentage);
  let paf = physicalActivityFactor(gender, activityLevel);
  let tef = TEF(fatPercentage);
  return bmr * paf * tef;
}

console.log(`Rest day energy expenditure: ${restdayEnergyExpenditure().toFixed(2)} calories`)

// Training day Energy Expenditure
function energyExpTrainingDays () {
  let bmr = katchMcArdleBMR(weight, fatPercentage);
  let paf = physicalActivityFactor(gender, activityLevel);
  let tee = parseFloat(trainingEnergyExpenditure(weight, avgTrainingTime));
  let tef = TEF(fatPercentage);

  let TDEE = (bmr * paf * tef) + tee;
  return (TDEE);
}

console.log(`Training day energy expenditure: ${energyExpTrainingDays().toFixed(2)} calories`)

// Maintenance caloric intake
function avgMaintenanceCalories (sessions) {
  let tdee = energyExpTrainingDays();
  let ree = restdayEnergyExpenditure();

  return (sessions * tdee + (7 - sessions) * ree) / 7;
}

console.log(`Average caloric intake for maintenance: ${avgMaintenanceCalories(3).toFixed(2)} calories`);

// Target intake dependant on weight gain or weight loss
function targetIntake (energyBalanceFactor) {
  let avgIntake = avgMaintenanceCalories(3);
  return avgIntake * energyBalanceFactor;
}

// 1.0 = maintenance, 1.1 = 10% surplus, 0.9 = 10% caloric shortage etc.
console.log(`Average daily target intake for weightgain or weightloss, based on energy balance factor: ${targetIntake(1.0).toFixed(2)} calories

Your weekly total intake is ${targetIntake(1.0).toFixed() * 7} calories.`);
