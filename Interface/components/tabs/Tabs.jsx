import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './tabs.style';
import { SafeAreaView } from 'react-native';

const TabButton = ({name, activeTab, onHandleSearchType}) => (
  <TouchableOpacity style={styles.btn(name, activeTab)}
    onPress={onHandleSearchType}
    >
    <Text style={styles.btnText(name, activeTab)} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
  </TouchableOpacity>
)

/*
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.stickyContainer}>
      <View style={styles.container}>
        {tabs.map((item, index) => (
          <TabButton
            key={index}
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        ))}
      </View>
    </View>
  )
}
*/

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <SafeAreaView style={styles.container}>
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          name={tab}
          activeTab={activeTab}
          onHandleSearchType={() => setActiveTab(tab)}
        />
      ))}
    </SafeAreaView>
  )
}

export default Tabs