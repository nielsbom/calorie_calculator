// Stuk tekst hier, zodat ik een pull request kan maken :-)
// // Calculate age function
// function calcAge (dob) {
//   let diffMs = Date.now() - dob.getTime();
//   let ageDt = new Date(diffMs);
//   return Math.abs(ageDt.getUTCFullYear() - 1970);
// }

// Get basic bodystats & parameters
// Het is vaak een goed idee om een functie 1 ding te laten doen: https://en.wikipedia.org/wiki/Single_responsibility_principle
// In de functie "verwerk"/"bewerk" je eigenlijk alleen dob. Dus dan zou je het mss ook zonder de functie kunnen doen?
// Ik maak zo zelf wel een versie, met wat overwegingen.
function bodyStats (name, gender, height, weight, fatPercentage, avgTrainingTime, activityLevel) {
  // Als een functie meer dan een handjevol argumenten dan is het soms een goed idee om óf de functie op te splitsen
  // Of om een object te maken waarin je de argumenten verzameld en ook een "key" geeft
  // {name: "Sjoerd", gender: 0, heightCm: 185} etc...
  
  // Waarom gebruik je hier "this"?
  // "this" wijst hier naar het window object (in de browser)
  // Om verschillende redenen (leg ik een keer uit) is het beter om zoveel mogelijk functies "puur" te houden
  // Dus: a) de input alléén bepaalt de output
  //      b) het aanroepen van de functie zet geen variabelen *buiten* de functie (dat doe je hier met this.name wel
  // Zie hier wat meer info: https://hackernoon.com/javascript-and-functional-programming-pt-3-pure-functions-d572bb52e21c
  this.name = name;
  this.gender = gender;
  this.height = height;
  this.weight = weight;
  this.fatPercentage = fatPercentage;
  this.avgTrainingTime = avgTrainingTime;
  this.activityLevel = activityLevel;
  // Als je geen "this." gebruikt, kun je alle regels hierboven weglaten: win!

  // Je kan zeker een functie binnen een andere functie definieren.
  // Soms kan dat handig zijn.
  // Hier zou ik het buiten de functie houden.
  // Om deze functie puur te houden zou ik de functie twee argumenten geven: Date.now() en de dob.
  // De functie geeft dan de leeftijd in jaren terug.
  // De functie is dan ook veel makkelijker (geautomatiseerd) te testen. Bij dezelfde input moet je
  // altijd dezelfde output krijgen. Dat is dan dus niet afhankelijk van *wanneer* je deze code test :-)
  function calcAge (dob) {
    let diffMs = Date.now() - dob.getTime();
    let ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }
  // Welcome message --> birthday invullen
  // Omdat je hier een console.log doet is de functie niet "puur", zie boven.
  // Als je een string teruggeeft zou de functie wel puur zijn (even afgezien van aanroepen van Date.now)
  // Dat zou ik ook doen.
  console.log(`Hi ${name}, you are a ${calcAge(new Date(1990, 6, 14))} year old ${gender}, ${height} centimeters tall and weigh ${weight} kilograms with a fat percentage of ${fatPercentage}%.`);
}

// Invullen v.l.n.r.: Naam, male/female, lengte (in cm), gewicht (in kg), vetpercentage, gem. duur van training in min., activiteiten niveau: inactive, slightly active, moderately active, very active.

bodyStats( 'Sjoerd', 'male', 186, 88, 15, 75, 'moderately active');

// Als je witregels (newlines in je output wil zou ik \n gebruiken.
console.log(`
--- Here are your caloric statistics ---

`);


// Functions for calculations

// Supergoed! Enige opmerking: ik zou de functienaam voluit schrijven.
// Meer info: 
// - http://wiki.c2.com/?GoodVariableNames
// - https://blog.elpassion.com/naming-101-quick-guide-on-how-to-name-things-a9bcbfd02f02
// - https://medium.com/coding-skills/clean-code-101-meaningful-names-and-functions-bf450456d90c
// Fat free mass calc (als je de functienaam uitschrijft kun je de comment weghalen :-)
function calcFFM (weight, fatPercentage) {
  let FFM = weight * (1 - fatPercentage / 100);
  return FFM.toFixed(2);
}

// Je zou nog kunnen overwegen om de toFixed pas hier te doen omdat de waarde dan zo lang mogelijk zo precies mogelijk is.
// Als je er later dan nog wat mee wil doen, heb je de niet-afgeronde variant
console.log(`Fat free mass: ${calcFFM(weight, fatPercentage)} kg`);

// ik zou de functienaam voluit schrijven.
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

// Physical Activity Factor // comment is overbodig
function physicalActivityFactor (gender, generalActivityLevel) {
 
  // variabele namen mogen korter, binnen deze functie weten we al dat het over PAF gaat.
  let pafMale = [1.0, 1.10, 1.25, 1.48];
  let pafFemale = [1.0, 1.12, 1.27, 1.45];

  // Hier is een wat makkelijker patroon voor, ik zal het herschrijven.
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
  // Ik zou hetzelfde "patroon" als hierboven volgen en {} gebruiken.
  } else (gender === 'female' && generalActivityLevel === 'very active')
  return pafFemale[3];
}

console.log(`General physical Activity Factor: ${physicalActivityFactor(gender, activityLevel)}`);

// Rest Day Energy Expenditure
// Geen pure functie, want je gebruikt variabelen uit de global scope.
function restdayEnergyExpenditure () {
  let bmr = katchMcArdleBMR(weight, fatPercentage);
  let paf = physicalActivityFactor(gender, activityLevel);
  let tef = TEF(fatPercentage);
  return bmr * paf * tef;
}

console.log(`Rest day energy expenditure: ${restdayEnergyExpenditure().toFixed(2)} calories`)

// Training day Energy Expenditure
// Geen pure functie, want je gebruikt variabelen uit de global scope.
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
// Geen pure functie, want je gebruikt variabelen uit de global scope.
function avgMaintenanceCalories (sessions) {
  let tdee = energyExpTrainingDays();
  let ree = restdayEnergyExpenditure();

  return (sessions * tdee + (7 - sessions) * ree) / 7;
}

// toFixed hier gebruiken: 👍
console.log(`Average caloric intake for maintenance: ${avgMaintenanceCalories(3).toFixed(2)} calories`);

// Target intake dependant on weight gain or weight loss
function targetIntake (energyBalanceFactor) {
  // "magic number" wat is die 3? Ik zou daar een constante van maken met een logische naam
  // (geen idee wat daar een goeie naam voor is, dat weet jij beter :-)
  let avgIntake = avgMaintenanceCalories(3);
  return avgIntake * energyBalanceFactor;
}

// Vaak is het handig om je line-width te beperken tot 80 karakters (of 100 oid). De meeste styleguides raden dat ook aan.
// 1.0 = maintenance, 1.1 = 10% surplus, 0.9 = 10% caloric shortage etc.
console.log(`Average daily target intake for weightgain or weightloss, based on energy balance factor: ${targetIntake(1.0).toFixed(2)} calories

Your weekly total intake is ${targetIntake(1.0).toFixed() * 7} calories.`);

/*
Laatste opmerking: wat een goed patroon is voor een script als dit:

- eerst constantes definiëren
- dan functies definiëren
- dan functies aanroepen en resultaten bewaren
- als laatste resultaten tonen
*/
