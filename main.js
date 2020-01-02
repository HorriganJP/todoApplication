const rollDice = function () {
    let min = 1
    let max = 6
    return Math.floor(Math.random()*max)+min;
  }
  // enter number of dice rolling
  let num = 8
  let array = []
  
  for (let count = 0; count < num; count++) {
    array.push(rollDice());
    array.sort();
    };
  
  let onesArray = [];
  let findOnes = function(){
      for (let index = 0; index < array.length; index++) {
        if (array[index] === 1) {
        onesArray.push(array[index]);
        array.shift()
        }
    };
  };
  
  let reRollOnes = function () {
    for (let n = 0; n < onesArray.length; n++){
      let newDice = rollDice();
      if (newDice != 1) {
        array.push(newDice);
        array.sort();
      }
    }
    return array;
  }
  
  let numPossibleWounds = [];
  const toHit = function (hitValue) {
    for (let index = 0; index < array.length; index++) {
      if (array[index] < hitValue) {
        array.shift();
        index = index - 1;
      };
    };
    numPossibleWounds.push(array.length);
    return numPossibleWounds;
  };
  
  
  let woundArray = [];
  const toWound = function () {
    for (let index = 0; index < numPossibleWounds; index++) {
    woundArray.push(rollDice());
    };
    return woundArray.sort();
  };
  
  const woundCalc = function (strength, toughness) {
      if (strength*2 < toughness) {
        for (let index = 0; index < woundArray.length; index++) {
          if (woundArray[index] < 6) {
          woundArray.shift();
          index = index - 1;
        };
      };
      } else if (strength < toughness) {
        for (let index = 0; index < woundArray.length; index++) {
          if (woundArray[index] < 5) {      
            woundArray.shift();
            index = index - 1;
          };  
        };
      } else if (strength === toughness) {
        for (let index = 0; index < woundArray.length; index++) {    
          if (woundArray[index] < 4) {        
            woundArray.shift();        
            index = index - 1;
          };
        };
      } else if (strength*2 >= toughness) {
        for (let index = 0; index < woundArray.length; index++) {      
          if (woundArray[index] < 2) {
            woundArray.shift();
            index = index - 1;
          };
        };
      } else if (strength > toughness) {
        for (let index = 0; index < woundArray.length; index++) {      
          if (woundArray[index] < 3) {
            woundArray.shift();
            index = index - 1;
          };
        };
      };
      return woundArray; 
  };
  
  
  // prints original array
  console.log('You rolled the following to hit:')
  console.log(array);
  // created array of ones
  // removes ones from original array
  console.log('After 1\'s are removed:')
  array.findIndex(findOnes);
  // prints new array
  console.log(array);
  // rerolls ones from ones array
  // adds them to orignal array
  console.log('Rerolled Ones:');
  console.log(reRollOnes());
  
  toHit(2);
  console.log(`You have ${array.length} hits!`)
  console.log("---------------")
  console.log('You rolled the following to wound:')
  console.log(toWound());
  woundCalc(5,4);
  console.log(`You wounded ${woundArray.length} times. Your successful wounds were: ${woundArray}`);
  