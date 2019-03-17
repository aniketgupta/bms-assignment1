let existingArray = [];

// Predefining numbers inside array
for (let i = 7000; i < 7006; i++) {
  existingArray.push(i);
}

let inputText = document.getElementById('text_input');

/**
 * Removes extra whitespaces from an array
 * @author Aniket Gupta
 * @param {Array} arr Array to remove whitespaces from
 * @returns {Array} Returns array with whitespaces removed from it.
 */
function trimArray(arr) {
  for(i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }
  return arr;
}

/**
 * Submits the input values and displays duplicate and final updated array values
 * @author Aniket Gupta
 */
function submitValues() {
  //splitting by ','
  const arr = inputText.value.split(',');
  const trimmedArray = trimArray(arr);

  trimmedArray.forEach(a => {
    //splitting by '-'
    if(a.includes('-')) {
      const b = a.split('-');
      if(parseInt(b[0]) > parseInt(b[1])) {
        alert('Please enter correct range, ' + b[0] + ' is greater than ' + b[1] );
        return;
      };
      for (let i = Number(b[0]); i <= Number(b[1]); i++) {
        trimmedArray.push(i);
      }
    }
  });

  // Converting all array values to number
  const arrayOfNumbers = trimmedArray.map(Number);

  //Filtering array and removing NaN values
  const filteredArray = arrayOfNumbers.filter( value => !Number.isNaN(value) );

  // Pushing all the values in filteredArray to existingAraay
  for (let i = 0; i < filteredArray.length; i++) {
    existingArray.push(filteredArray[i]);
  }

  /**
   * Displays the duplicate values in existingArray
   * @author Aniket Gupta
   * @param {Array} data The existing array data
   * @returns {Array} Returns duplicate values array.
   */
  function displayDuplicates(data) {
    let object = {};
    let result = [];

    // Create a object with array values and insert 1 for that property if it is single else increase the count with 1
    data.forEach(function (item) {
      if(!object[item])
          object[item] = 0;
        object[item] += 1;
    });

    // Check for duplicates, if object key has 1 value then that property is not duplicated, 
    // if it is more than or equal to 2 then push that property to result array and return.
    for (var prop in object) {
     if(object[prop] >= 2) {
        result.push(prop);
      }
    }
    return result;
  }

  // Displaying duplicates
  document.getElementById('duplicates').innerHTML = displayDuplicates(existingArray);

  // Removing duplicates
  const result = [...new Set(existingArray)];
  existingArray = result;

  /**
   * Sorts the final updated array in ascending order
   * @author Aniket Gupta
   * @param {Array} data The final updated array
   * @returns {Array} Returns data in ascending order.
   */
  function sortArray(data) {
    data.sort(function(a, b){return a - b});
    return data;
  }

  document.getElementById('answer').innerHTML = sortArray(result);
}