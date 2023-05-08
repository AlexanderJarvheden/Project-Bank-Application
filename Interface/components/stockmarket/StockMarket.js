import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import {COLOR, FONT, SIZES} from "../../constants/theme";
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
/*
  const fetchPopularStocks = async () => {
    const fetchStock = async (symbol) => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
        return response.data['Global Quote'];
      } catch (error) {
        console.error(`Error fetching stock: ${symbol}`, error);
        return null;
      }
    };
  
    const fetchWithRetry = async (symbol, retries = 3) => {
      for (let i = 0; i < retries; i++) {
        const stock = await fetchStock(symbol);
        if (stock) return stock;
      }
      return null;
    };
  
    const promises = popularStockSymbols.map((symbol) => fetchWithRetry(symbol));
    const results = await Promise.all(promises);
    const stocks = results.filter((stock) => stock !== null);
    setPopularStocks(stocks);
  };
  */
  
 /*const fetchPopularStocks = async () => {
    const promises = popularStockSymbols.map(symbol =>
      axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`),
    );
  
    const results = await Promise.all(promises);
    const stocks = results
      .map(res => res.data['Global Quote'])
      .filter(stock => Object.keys(stock).length > 0); // Filter out stocks with missing data
    setPopularStocks(stocks);
  }*/

  /*const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const fetchPopularStocks = async () => {
    const stocks = [];
  
    for (const symbol of popularStockSymbols) {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        );
        const stockData = response.data['Global Quote'];
        if (Object.keys(stockData).length > 0) {
          stocks.push(stockData);
        }
      } catch (error) {
        console.error(`Error fetching stock data for ${symbol}:`, error);
      }
      await delay(15000); // Wait for 15 seconds between requests to stay within rate limits
    }

    setPopularStocks(stocks);
  };  */

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
              <ListItem key={index} bottomDivider containerStyle={styles.listItemContainer}>
                <ListItem.Content>
                  {/* <ListItem.Title>{stock['01. symbol']}</ListItem.Title> */}
                  <ListItem.Title style={styles.stockText}>{stock && stock['01. symbol']}</ListItem.Title>
                  <ListItem.Subtitle style={styles.stockInfo}>${stock && parseFloat(stock['05. price']).toFixed(2)}</ListItem.Subtitle>
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
        {searchText !== '' && (
          <View >
            <Text style={styles.sectionTitle}>Search Results</Text>
            {searchResults.map((stock, index) => (
              <ListItem key={index} bottomDivider containerStyle={styles.listItemContainer}>
                <ListItem.Content>
                  <ListItem.Title style={styles.stockText}>{stock['1. symbol']}</ListItem.Title>
                  <ListItem.Subtitle style={styles.stockInfo}>{stock['2. name']}</ListItem.Subtitle>
                </ListItem.Content>
                <Button
                  title="Buy"
                  onPress={() => buyStock(stock['1. symbol'], stock['2. name'])}
                />
                <Button
                  title="Sell"
                  onPress={() => sellStock(stock['1. symbol'], stock['2. name'])}
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
              <Button title="Sell" onPress={() => sellStock(stock.symbol, stock.price)} />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 5,
  },
  listItemContainer: {
    backgroundColor: 'violet'
  },
  stockText: {
    fontFamily: FONT.medium
  },
  stockInfo: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small
  }
});

export default StockMarketTab;