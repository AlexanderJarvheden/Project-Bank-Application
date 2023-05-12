import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { ListItem, Icon, Button } from "react-native-elements";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants";

const StockMarketTab = () => {
  const apiKey = "YOUR_API_KEY";
  const popularStockSymbols = [
    "AAPL",
    "GOOGL",
    "MSFT",
    "AMZN",
    "TSLA",
    "FB",
    "BRK-B",
    "JPM",
    "JNJ",
    "V",
  ];

  const [popularStocks, setPopularStocks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [balance, setBalance] = useState(10000);
  const [portfolio, setPortfolio] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [transactionType, setTransactionType] = useState(null);

  const FONT = {
    medium: "Your-Medium-Font-Name",
    regular: "Your-Regular-Font-Name",
  };
  useEffect(() => {
    const loadBalanceAndPortfolio = async () => {
      const storedBalance = await AsyncStorage.getItem('balance');
      const storedPortfolio = await AsyncStorage.getItem('portfolio');

      if (storedBalance !== null) {
        setBalance(parseFloat(storedBalance));
      }

      if (storedPortfolio !== null) {
        setPortfolio(JSON.parse(storedPortfolio));
      }
    };

    loadBalanceAndPortfolio();
  }, []);

  // Save the balance and portfolio to AsyncStorage whenever they change
  useEffect(() => {
    const saveBalanceAndPortfolio = async () => {
      await AsyncStorage.setItem('balance', balance.toString());
      await AsyncStorage.setItem('portfolio', JSON.stringify(portfolio));
    };

    saveBalanceAndPortfolio();
  }, [balance, portfolio]);

  useEffect(() => {
    const fetchPopularStocks = async () => {
      const promises = popularStockSymbols.map((symbol) =>
        axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        )
      );

      const results = await Promise.all(promises);
      const stocks = results.map((res) => res.data["Global Quote"]);
      setPopularStocks(stocks);
    };

    fetchPopularStocks();
  }, []);

  const searchStocks = async () => {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${apiKey}`
    );

    const bestMatches = response.data.bestMatches || [];

    const pricePromises = bestMatches.map((stock) =>
      axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock["1. symbol"]}&apikey=${apiKey}`
      )
    );

    const priceResults = await Promise.all(pricePromises);

    const resultsWithPrice = bestMatches.map((stock, index) => {
      const priceData = priceResults[index].data["Global Quote"];
      return {
        ...stock,
        price: priceData ? priceData["05. price"] : "N/A",
      };
    });

    setSearchResults(resultsWithPrice);
  };

  const handleBuyStock = (symbol, price) => {
    setSelectedStock({ symbol, price });
    setTransactionType("buy");
    setModalVisible(true);
  };

  const handleSellStock = (symbol) => {
    setSelectedStock({ symbol });
    setTransactionType("sell");
    setModalVisible(true);
  };

  const buyStock = (symbol, price, quantity) => {
    const totalCost = price * quantity;
    if (balance >= totalCost) {
      setBalance((prevBalance) => prevBalance - totalCost);
      setPortfolio((prevPortfolio) => [
        ...prevPortfolio,
        { symbol: symbol, price: price, quantity: quantity },
      ]);
    } else {
      alert("Insufficient balance to buy this stock.");
    }
  };

  const sellStock = (symbol, quantity) => {
    const index = portfolio.findIndex((stock) => stock.symbol === symbol);
    if (index !== -1) {
      if (quantity > portfolio[index].quantity) {
        alert("You don't have that many stocks to sell.");
        return;
      }
      const totalCost = portfolio[index].price * quantity;
      setBalance((prevBalance) => prevBalance + totalCost);
      if (quantity === portfolio[index].quantity) {
        setPortfolio((prevPortfolio) => {
          let newPortfolio = [...prevPortfolio];
          newPortfolio.splice(index, 1);
          return newPortfolio;
        });
      } else {
        setPortfolio((prevPortfolio) => {
          let newPortfolio = [...prevPortfolio];
          newPortfolio[index].quantity -= quantity;
          return newPortfolio;
        });
      }
    } else {
      alert("You do not own this stock.");
    }
  };

  const handleTransaction = () => {
    const quantity = parseInt(inputValue);
    if (isNaN(quantity) || quantity < 1) {
      alert("Please enter a valid number of stocks.");
      return;
    }
    if (transactionType === "buy") {
      buyStock(selectedStock.symbol, selectedStock.price, quantity);
    } else if (transactionType === "sell") {
      sellStock(selectedStock.symbol, quantity);
    }
    setInputValue("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Enter the number of stocks you want to {transactionType}
            </Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={(text) => setInputValue(text)}
              value={inputValue}
              keyboardType="numeric"
            />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={handleTransaction}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      {
        <>
          <View style={styles.balanceContainer}>
            <Icon name="account-balance-wallet" type="material" />
            <Text style={styles.balanceText}>
              Balance: ${balance.toFixed(2)}
            </Text>
          </View>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={searchStocks}
            value={searchText}
            placeholder="Search for stocks"
          />
          <ScrollView>
            {searchText === "" && (
              <View>
                <Text style={styles.sectionTitle}>Popular Stocks</Text>
                {popularStocks.map(
                  (stock, index) =>
                    stock && (
                      <ListItem key={index} bottomDivider >
                        <ListItem.Content>
                          <ListItem.Title>{stock["01. symbol"]}</ListItem.Title>
                          <ListItem.Subtitle>
                            ${parseFloat(stock["05. price"]).toFixed(2)}
                          </ListItem.Subtitle>
                        </ListItem.Content>
                        <Button
                          title="Buy"
                          onPress={() =>
                            isNaN(parseFloat(stock["05. price"]))
                              ? alert("Invalid stock price")
                              : handleBuyStock(
                                  stock["01. symbol"],
                                  parseFloat(stock["05. price"])
                                )
                          }
                        />
                        <Button
                          title="Sell"
                          onPress={() => handleSellStock(stock["01. symbol"])}
                        />
                      </ListItem>
                    )
                )}
              </View>
            )}
            {searchText !== "" && (
              <View>
                <Text style={styles.sectionTitle}>Search Results</Text>
                {searchResults.map((stock, index) => (
                  <ListItem key={index} bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{stock["1. symbol"]}</ListItem.Title>
                      <ListItem.Subtitle>{stock["2. name"]}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Button
                      title="Buy"
                      onPress={() =>
                        isNaN(parseFloat(stock["2. name"]))
                          ? alert("Invalid stock price")
                          : handleBuyStock(
                              stock["1. symbol"],
                              parseFloat(stock["2. name"])
                            )
                      }
                    />
                    <Button
                      title="Sell"
                      onPress={() => handleSellStock(stock["1. symbol"])}
                    />
                  </ListItem>
                ))}
              </View>
            )}
            <View>
              <Text style={styles.sectionTitle}>My Portfolio</Text>
              {portfolio.map((stock, index) => (
                <ListItem key={index} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{stock.symbol}</ListItem.Title>
                    <ListItem.Subtitle>
                      {stock.quantity} shares @ $
                      {parseFloat(stock.price).toFixed(2)}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <Button
                    title="Sell"
                    onPress={() => handleSellStock(stock.symbol)}
                  />
                </ListItem>
              ))}
            </View>
          </ScrollView>
        </>
      }
    </View>
  );
};

/* Add the following styles to your styles object for the modal */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: COLORS.red, // Updated background color
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10, // Updated border radius to 5 pixels
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.90,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10, // Updated border radius to 5 pixels
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 15,
    paddingHorizontal: 10,
    borderRadius: 5, // Updated border radius to 5 pixels
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: COLORS.tertiary,
    paddingVertical: 5, // Updated padding for vertical spacing
    borderRadius: 5, // Updated border radius to 5 pixels
  },
  balanceText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5, // Updated border radius to 5 pixels
  },
  sectionContainer: {
    backgroundColor: COLORS.red, // Cerise color for the box
    paddingHorizontal: 10,
    paddingVertical: 20, // Updated padding for vertical spacing
    borderRadius: 5, // Added border radius for the box
    marginBottom: 10, // Added margin bottom for separation
  },
  sectionTitle: {
    fontSize: 25, // Updated font size to make it larger
    fontWeight: "bold",
    textAlign: "center", // Centered text
    color: "black", // Text color
  },
  listItemContainer: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 5, // Updated border radius to 5 pixels
    marginVertical: 4,
  },
  stockTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  stockSubtitle: {
    color: "#666",
    fontSize: 14,
  },
  buyButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5, // Updated border radius to 5 pixels
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  sellButton: {
    backgroundColor: "#FF4438",
    borderRadius: 5, // Updated border radius to 5 pixels
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  buttonTitle: {
    fontSize: 14,
  },
});

export default StockMarketTab;