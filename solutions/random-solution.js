function fetchRandomNumbers() {
  return new Promise((resolve, reject) => {
    console.log("Fetching number...");
    setTimeout(() => {
      let randomNum = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
      console.log("Received random number:", randomNum);
      randomNum ? resolve(randomNum) : reject(new Error(`couldn't fetch random number`));
    }, (Math.floor(Math.random() * 5) + 1) * 1000);
  });
}

function fetchRandomString() {
  return new Promise((resolve, reject) => {
    console.log("Fetching string...");
    setTimeout(() => {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      console.log("Received random string:", result);
      result ? resolve(result) : reject(new Error(`couldn't fetch the string`));
    }, (Math.floor(Math.random() * 5) + 1) * 1000);
  });
}


// **Task 1**: Right now, the function fetchRandomNumbers can be used by passing a callback,
// Your task is to promisfy this function so that the following can be done:

fetchRandomNumbers()
.then((randomNum) => console.log(randomNum))
.catch((err) =>
  console.error(err)
);

//using async/await 
const fetchRandomNum = async () => {
  try {
    const randomNum = await fetchRandomNumbers();
    console.log(randomNum)
  }
  catch(err) {
    console.log(err)
  }
}
fetchRandomNum();


fetchRandomString()
.then((randomStr) => console.log(randomStr))
.catch((err) =>
  console.error(err)
);

//using async/await 
const fetchRandomStr = async () => {
  try {
    const randomStr = await fetchRandomString();
    console.log(randomStr)
  }
  catch(err) {
    console.error(err)
  }
}
fetchRandomStr();

// **Task 2**: Fetch a random number -> add it to a sum variable and print sum-> fetch another random variable
// -> add it to the same sum variable and print the sum variable.

fetchRandomNumbers((randomNum) => randomNum)
  .then((randomNum) => {
    let sum = 5;
    console.log("Sum of first random number and sum", sum + randomNum);
    return sum;
  })
  .then((sum) => {
    return fetchRandomNumbers((randomNum) => randomNum).then(
      (randomNum) => randomNum + sum
    )
    .catch(error => console.error(error));
  })
  .then((sum) => console.log("Sum of 2nd random number and sum", sum))
  .catch((err) => console.error(err));

// using async/await

const sumOfTwoRandomNum = async () => {
  try {
    let sum = 5;
    sum += await fetchRandomNumbers();
    console.log('sum of first random number and sum',sum);
    sum += await fetchRandomNumbers();
    console.log('sum of second random number and sum',sum)
  }
  catch(err){
    console.error(err)
  }
}
sumOfTwoRandomNum();

// **Task 3**: Fetch a random number and a random string simultaneously, concatenate their
// and print the concatenated string

Promise.all([fetchRandomNumbers(), fetchRandomString()])
  .then((data) => console.log(data[0] + data[1]))
  .catch((err) => console.error(err));

// using asunc/await

const concatRandomNumAndString = async () => {
  try {
    const number = await fetchRandomNumbers();
    const string = await fetchRandomString();
    console.log(number + string)
  }
  catch(err){
    console.error(err);
  }
}
concatRandomNumAndString();

// **Task 4**: Fetch 10 random numbers simultaneously -> and print their sum.

let promiseArray = [];
for (let i = 0; i < 10; i++) {
  promiseArray.push(fetchRandomNumbers());
}
let array = Promise.all(promiseArray);
array
  .then((data) => {
    const sum = data.reduce((acc, curr) => acc + curr);
    return sum;
  })
  .then((sum) => console.log(sum))
  .catch(error => console.error(error));

// using async/await
const sumOfTenRandomNum = async () => {
  try {
    let sum = 0;
    for(let i = 0; i < 10; i++){
      sum += await fetchRandomNumbers();
    }
    console.log(sum);
  }
  catch(err){
    console.error(err)
  }
}

sumOfTenRandomNum();
