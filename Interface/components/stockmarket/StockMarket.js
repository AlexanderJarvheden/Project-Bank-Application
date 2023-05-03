import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, Button } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import axios from 'axios';

const StockMarketTab = () => {
const apiKey = 'YOUR_API_KEY';
const popularStockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'BRK-B', 'JPM', 'JNJ', 'V'];

const [popularStocks, setPopularStocks] = useState([]);
const [searchResults, setSearchResults] = useState([]);
const [searchText, setSearchText] = useState('');
const [balance, setBalance] = useState(10000);
const [portfolio, setPortfolio] = useState([]);

  // Fetch popular stocks on component mount
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

  // Search stocks based on input
  const searchStocks = async () => {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${apiKey}`
    );
    setSearchResults(response.data.bestMatches);
  };

  // Buy stock functionality
  const buyStock = (symbol, price) => {
    // Implement your buy stock logic here
  };

  // Sell stock functionality
  const sellStock = (symbol, price) => {
    // Implement your sell stock logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Icon name="account-balance-wallet" type="material" />
        <Text style={styles.balanceText}>Balance: ${balance.toFixed(2)}</Text>
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
            {popularStocks.map((stock, index) => (
              <ListItem key={index} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{stock["01. symbol"]}</ListItem.Title>
                  <ListItem.Subtitle>
                    ${parseFloat(stock["05. price"]).toFixed(2)}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Button
                  title="Buy"
                  onPress={() =>
                    buyStock(stock["01. symbol"], stock["05. price"])
                  }
                />
                <Button
                  title="Sell"
                  onPress={() =>
                    sellStock(stock["01. symbol"], stock["05. price"])
                  }
                />
              </ListItem>
            ))}
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
                  onPress={() => buyStock(stock["1. symbol"], stock["2. name"])}
                />
                <Button
                  title="Sell"
                  onPress={() =>
                    sellStock(stock["1. symbol"], stock["2. name"])
                  }
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
                  {stock.shares} shares @ ${parseFloat(stock.price).toFixed(2)}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Button
                title="Sell"
                onPress={() => sellStock(stock.symbol, stock.price)}
              />
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 5,
  },
});
