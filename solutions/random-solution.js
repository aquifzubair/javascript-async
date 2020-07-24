const fetchRandomNumbers = () => {
  console.log("Fetching number...");
  return new Promise((resolve, reject) => {
    let randomNum = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    console.log("Received random number:", randomNum);
    randomNum ? resolve(randomNum) : reject();
  });
};

const fetchRandomString = () => {
  console.log("Fetching string...");
  return new Promise((resolve, reject) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("Received random string:", result);
    result ? resolve(result) : reject();
  });
};

// **Task 1**: Right now, the function fetchRandomNumbers can be used by passing a callback,
// Your task is to promisfy this function so that the following can be done:

fetchRandomNumbers((randomNum) => console.log(randomNum))
.catch((err) =>
  console.error(err)
);

fetchRandomString((randomStr) => console.log(randomStr))
.catch((err) =>
  console.error(err)
);

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

// **Task 3**: Fetch a random number and a random string simultaneously, concatenate their
// and print the concatenated string

Promise.all([fetchRandomNumbers(), fetchRandomString()])
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

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
