import { SQLResultSet, SQLTransaction } from "expo-sqlite";
import { makeAutoObservable } from "mobx";
import Database from "sql";

class _CardsStore {
  cards: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  init() {
    Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, balance INT, paymentSystem TEXT, number TEXT, endDate TEXT, colorId INT);"
      );
      transaction.executeSql(
        "SELECT * FROM cards ORDER BY id DESC",
        [],
        (transaction: SQLTransaction, result: SQLResultSet) => {
          this.cards = result.rows._array;
        }
      );
    });
  }

  insert(
    initialSum: string,
    activePaymentSystem: string,
    cardNumber: string,
    endDate: string,
    activeSkin: string,
    callback: () => any
  ) {
    Database.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        "INSERT INTO cards (balance, paymentSystem, number, endDate, colorId) VALUES (?, ?, ?, ?, ?);",
        [initialSum, activePaymentSystem, cardNumber, endDate, activeSkin],
        () => {
          this.init();
          callback();
        }
      );
    });
  }
}

export default new _CardsStore();