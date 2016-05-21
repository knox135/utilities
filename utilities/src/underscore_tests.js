/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    var newArr = [];
    if(n === undefined) {
      return array[0];
    }
    else if(n === 0) {
      return [];
    }
    else if(n > array.length) {
      return array;
    }

    for(var i = 0; i < n; i++) {
      newArr.push(array[i]);
    }
    return newArr;
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var newArr = [];
    if(n === undefined) {
      return array[array.length - 1];
    }
    else if(n > array.length) {
      return array;
    }

    for(var i = array.length - n; i < array.length; i++) {
      newArr.push(array[i]);
    }
    return newArr;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
      for(var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    else if(collection instanceof Object) {
      for(var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for(var i = 0; i < array.length; i++) {
      if(target === array[i]){
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var newArr = [];
    for(var i = 0; i < collection.length; i++) {
      if(iterator(i) !== true) {
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var newArr = [];
    for(var i = 0; i < collection.length; i++) {
      if(iterator(i) === true) {
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArr = [];
    for(var i = 0; i < array.length; i++) {
      if(_.indexOf(newArr, array[i]) === -1) {
        newArr.push(array[i]);
      }
    }
    return newArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    for(var i = 0; i < array.length; i++) {
      array[i] = iterator(array[i]);
    }
    return array;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var newArr = [];
    for(var i = 0; i < array.length; i++) {
      newArr.push(array[i][propertyName]);
    }
    return newArr;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if(typeof methodName === 'string') {
      for(var i = 0; i < list.length; i++) {
        list[i] = list[i][methodName]();
      }
      return list;
    }
    else {
      var methodNameStr = methodName.toString();
      var indexOfParen = methodNameStr.indexOf('(');
      methodNameStr = methodNameStr.slice(9,indexOfParen);
      for(var j = 0; j < list.length; j++) {
        list[j] = list[j][methodNameStr]();
      }
      return list;
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    if(initialValue === undefined) {
      initialValue = 0;
    }
    for(var i = 0; i < collection.length; i++) {
      initialValue = iterator(initialValue, collection[i]);
    }
    return initialValue;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    if(Array.isArray(collection)) {
      if(collection.indexOf(target) > -1) {
        return true;
      }
      return false;
    }
    else if(collection instanceof Object) {
      for(var key in collection) {
        if(collection[key] === target) {
          return true;
        }
      }
      return false;
    }
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    for(var i = 0; i < collection.length; i++) {
      if(arguments[1] === undefined) {
        return true;
      }
      else if(!(iterator(collection[i]))) {
        return false;
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if(arguments[1] === undefined) {
      for(var i = 0; i < collection.length; i++) {
        if(collection[i]) {
          return true;
        }
      }
    }
    else {
      for(var j = 0; j < collection.length; j++) {
        if(iterator(collection[j])) {
          return true;
        }
      }
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    var extendedObj = {};
    function check(argObj) {
      for(var key in argObj) {
        extendedObj[key] = argObj[key];
      }
    }
    for(var i = 0; i < arguments.length; i++) {
      check(arguments[i]);
    }
    return extendedObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var extendedObj = {};
    function check(argObj) {
      for(var key in argObj) {
        if(!(extendedObj.hasOwnProperty(key))) {
          extendedObj[key] = argObj[key];
        }
      }
    }
    for(var i = 0; i < arguments.length; i++) {
      check(arguments[i]);
    }
    return extendedObj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var called = false;

    return function() {
      if(called === false){
        called = true;
        return func();
      }
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var storedVals = {};

    return function(arg) {
      if(!(storedVals.hasOwnProperty(arg))) {
        storedVals[arg] = func(arg);
      }
      return storedVals[arg];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, a, b) {
    var fn = function(){
      return func(a,b);
    };
    setTimeout(fn, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var newArr = [];
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    for(var i = array.length - 1; i > -1; i--) {
      newArr.push(array[getRandomInt(0, array.length)]);
    }
    return newArr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if(typeof iterator === 'string') {
      var swapped;
      do {
        swapped = false;
        for (var i = 0; i < collection.length - 1; i++) {
          if (collection[i][iterator] > collection[i + 1][iterator]) {
            var temp = collection[i];
            collection[i] = collection[i + 1];
            collection[i + 1] = temp;
            swapped = true;
          }
        }
      } while (swapped);
    }
    else {
      var swpped;
      do {
        swpped = false;
        for (var j = 0; j < collection.length - 1; j++) {
          if (iterator(collection[j]) > iterator(collection[j + 1]) || (iterator(collection[j]) === undefined && iterator(collection[j + 1]) !== undefined)) {
            var tmp = collection[j];
            collection[j] = collection[j + 1];
            collection[j + 1] = tmp;
            swpped = true;
          }
        }
      } while (swpped);
    }
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var argLen = arguments.length;
    var mainArr = [];
    var numOfArrays = 0;
    for(var i = 0; i < arguments.length; i++) {
      if(arguments[i].length > numOfArrays) {
        numOfArrays = arguments[i].length;
      }
    }

    for(i = 0; i < numOfArrays; i++) {
      mainArr.push([]);
    }

    for(i = 0; i < argLen; i++) {
      for(var j = 0; j < numOfArrays; j++) {
        if(arguments[i][j] !== undefined) {
          mainArr[j].push(arguments[i][j]);
        }
        else{
          mainArr[j].push(undefined);
        }
      }
    }

    return mainArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var arr = [];

    function isArr(el) {
      if(Array.isArray(el)) {
        el.forEach(function(e) {
          if(isArr(e)) {
            arr.push(isArr(e));
          }
        });
      }
      else {
        return el;
      }
    }

    isArr(nestedArray);
    return arr;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var count = {};
    var arr = [];
    for(var i = 0; i < arguments.length; i++) {
      arguments[i].forEach(function(el) {
        if(!(count.hasOwnProperty(el))) {
          count[el] = 1;
        }
        else {
          count[el]++;
        }
      });
    }
    for(var key in count) {
      if(count[key] < arguments.length) {
        delete count[key];
      }
    }
    for(var prop in count) {
      arr.push(prop);
    }
    return arr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var count = {};
    var arr = [];
    for(var i = 0; i < array.length; i++) {
      if(!(count.hasOwnProperty(array[i]))) {
        count[array[i]] = 1;
      }
      else {
        count[array[i]]++;
      }
    }

    for(var j = 1; j < arguments.length; j++) {
      console.log(arguments[j]);
      arguments[j].forEach(function(el){
        if(count.hasOwnProperty(el)) {
          count[el]++;
        }
      });
    }

    for(var prop in count) {
      if(count[prop] > 1) {
        delete count[prop];
      }
    }
    for(var key in count) {
      arr.push(key);
    }
    return arr;
  };

}).call(this);
