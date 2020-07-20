const getFunctions = require("../trello-callbacks.js");

const printCard = (card) => console.log(card);

const getWholeCardById = (lists) => {
  lists.forEach((list) => getFunctions.getCards(list.id, printCard));
};

const getCardById = (lists) => {
  const cardToPrint = { qwsa221: true, jwkh245: true };
  lists.forEach((list) => {
    if (cardToPrint[list.id]) getFunctions.getCards(list.id, printCard);
  });
};

const cardForListqwsa221 = () => getFunctions.getCards("qwsa221", printCard);

const printLists = (lists) => {
  console.log("+++++++++++++++++printing lists+++++++++++++");
  console.log(lists);
  console.log("++++++++++++fetching cards for single id++++++++++++");
  cardForListqwsa221();
  console.log("++++++++++++fetching cards for two id++++++++++++");

  getCardById(lists);
  console.log("++++++++++++fetching cards for all ids++++++++++++");
  getWholeCardById(lists);
};

const getListById = (id) => getFunctions.getLists(id, printLists);

const getIdFromBoard = (board) => getListById(board.id);

const main = () => getFunctions.getBoard(getIdFromBoard);

main();
