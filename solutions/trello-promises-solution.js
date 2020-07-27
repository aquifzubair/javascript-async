const { getBoard, getLists, getCards } = require("../trello-promises");

getBoard((data) => data)
  .then((data) => getLists(data.id))
  .then((data) => {
    let array = [];
    let promiseArray = [];

    promiseArray.push(getCards("qwsa221"));

    for (let i = 0; i < data.length; i++) {
      let cardToPoint = {
        qwsa221: true,
        jwkh245: true,
      };
      if (cardToPoint[data[i].id]) {
        promiseArray.push(getCards(data[i].id));
      }
    }

    for (let i = 0; i < data.length; i++) {
      promiseArray.push(getCards(data[i].id));
    }
    array = Promise.all(promiseArray);
    return array;
  })
  .then((data) => {
    let [card1, card2, card3, ...allCards] = data;

    console.log("================First Card==============");
    console.log(card1);

    console.log("==========First & second Card===========");
    console.log(card2, card3);

    console.log("=================All Cards==============");
    console.log(allCards);
    return data;
  })
  .catch((err) => console.error("Something wrong happened ", err));
