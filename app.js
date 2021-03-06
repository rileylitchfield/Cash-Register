function checkCashRegister(price, cash, cid) {
  var diff = cash - price;
  // roundedDown is the cash portion of the change due
  var roundedDown = Math.floor(diff);
  // To prevent answers like "0.733333339", multiply by 100, then round to nearest integer
  var change = diff - roundedDown;
  change = Math.round(change * 100);
  // changeSmall is the change portion of the change due
  var changeSmall = change / 100;
  // Change denomination array
  var valueChange = [0.25, 0.10, 0.05, 0.01];
  // Dollar denomination array
  var valueDollar = [100, 20, 10, 5, 1];
  // Initialize object status and object change
  var objChange = [];
  var objStatus = "OPEN";
  // Copy cid to new arr
  var cidArr = cid.slice();
  // Initialize cid dollar array for calculations
  var cidDollarArr = [];
  // Initialize cid change array for calculations
  var cidChangeArr = [];
  // Reverse cid array for calculations
  var reverseCidArr = cidArr.reverse();
  // Variables for calculation loops
  var testArr = [];
  var tempArr = [];
  var multiplier;
  var expArr = [];
  var runningTotalChange = changeSmall;
  var runningTotalDollar = roundedDown;

  // Split up the cid array into two arrays: one for dollar and one for change
  for (let i = 0; i < 5; i++) {
    cidDollarArr.push(reverseCidArr[i]);
  }

  for (let i = 5; i < 9; i++) {
    cidChangeArr.push(reverseCidArr[i]);
  }

  // Calculate how many of each denomination of dollar to use
  for (let i = 0; i < valueDollar.length; i++) {
    if (runningTotalDollar / valueDollar[i] >= 1 && cidDollarArr[i][1] !== 0) {
      multiplier = (Math.floor(runningTotalDollar / valueDollar[i]));
      while (multiplier > (cidDollarArr[i][1] / valueDollar[i])) {
        multiplier -= 1;
      }
      testArr.push(multiplier * valueDollar[i]);
      tempArr.push(valueDollar[i]);
      runningTotalDollar = (runningTotalDollar - (multiplier * valueDollar[i]));
      runningTotalDollar *= 100;
      runningTotalDollar = Math.round(runningTotalDollar);
      runningTotalDollar = runningTotalDollar / 100;
    }
  }

  var tempAddDollar = 0;
  for (let i = 0; i < testArr.length; i++) {
    tempAddDollar += testArr[i];
  }

  // Determine quantity of each denomination used for dollars due

  for (let i = 0; i < valueDollar.length; i++) {
    for (let j = 0; j < valueDollar.length; j++) {
      if (tempArr[j] == valueDollar[i]) {
        switch (valueDollar[i]) {
          case 100:
            expArr.push(["ONE HUNDRED", testArr[j]]);
            break;
          case 20:
            expArr.push(["TWENTY", testArr[j]]);
            break;
          case 10:
            expArr.push(["TEN", testArr[j]]);
            break;
          case 5:
            expArr.push(["FIVE", testArr[j]]);
            break;
          case 1:
            expArr.push(["ONE", testArr[j]]);
            break;
        }
      }
    }
  }

  testArr = [];
  tempArr = [];

  // Calculate how many of each denomination of change to use
  for (let i = 0; i < valueChange.length; i++) {
    if (runningTotalChange / valueChange[i] >= 1 && cidChangeArr[i][1] !== 0) {
      multiplier = (Math.floor(runningTotalChange / valueChange[i]));
      while (multiplier > (cidChangeArr[i][1] / valueChange[i])) {
        multiplier -= 1;
      }
      testArr.push(multiplier * valueChange[i]);
      tempArr.push(valueChange[i]);
      runningTotalChange = (runningTotalChange - testArr[i]);
      runningTotalChange *= 100;
      runningTotalChange = Math.round(runningTotalChange);
      runningTotalChange = runningTotalChange / 100;
    }
  }

  var tempAddChange = 0;
  for (let i = 0; i < testArr.length; i++) {
    tempAddChange += testArr[i];
  }

  // Determine quantity of each denomination used for change due
  for (let i = 0; i < valueChange.length; i++) {
    for (let j = 0; j < valueChange.length; j++) {
      if (tempArr[j] == valueChange[i]) {
        switch (valueChange[i]) {
          case 0.25:
            expArr.push(["QUARTER", testArr[j]]);
            break;
          case 0.10:
            expArr.push(["DIME", testArr[j]]);
            break;
          case 0.05:
            expArr.push(["NICKEL", testArr[j]]);
            break;
          case 0.01:
            expArr.push(["PENNY", testArr[j]]);
            break;
        }
      }
    }
  }

  // Calculate totals of both dollars and change to compare to cid to determine object status/change
  var tempReverseCidArr = 0;
  var tempExpArr = 0;
  for (let i = 0; i < reverseCidArr.length; i++) {
    tempReverseCidArr += reverseCidArr[i][1];
  }

  for (let i = 0; i < expArr.length; i++) {
    tempExpArr += expArr[i][1];
  }

  objChange = expArr;

  if (tempReverseCidArr == tempExpArr && tempAddChange >= changeSmall) {
    objStatus = "CLOSED";
    objChange = cid;
  } else if (tempAddChange < changeSmall) {
    console.log("FAIL");
    objStatus = "INSUFFICIENT_FUNDS";
    objChange = [];
  }

  // Assign values to return object
  var ansObj = { status: "", change: "" };
  ansObj["status"] = objStatus;
  ansObj["change"] = objChange;

  console.log(ansObj);

  return ansObj;
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);