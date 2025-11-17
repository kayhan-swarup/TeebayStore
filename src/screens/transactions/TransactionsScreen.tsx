import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useAuthStore } from '../../store/authStore';
import { useTransactionStore } from '../../store/transactionStore';
import ProductCard from '../../components/products/ProductCard';

const TransactionsScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [routes] = useState([
    { key: 'bought', title: 'BOUGHT' },
    { key: 'sold', title: 'SOLD' },
    { key: 'borrowed', title: 'BORROW' },
    { key: 'lent', title: 'LENT' },
  ]);
  const { user } = useAuthStore();
  const {
    purchases,
    myPurchases,
    soldItems,
    myRentals,
    lentItems,
    borrowed,
    lent,
    fetchAllTransactions,
  } = useTransactionStore();

  const EmptyState = ({ message }: { message: string }) => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyTitle}>No Transactions</Text>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAllTransactions();
    setRefreshing(false);
  };

  const BoughtRoute = () => (
    <FlatList
      data={myPurchases}
      renderItem={({ item }) => {
        return <ProductCard product={item} />;
      }}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.emptyList}
      ListEmptyComponent={
        <EmptyState message="You haven't purchased any products yet" />
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#6200EE']}
        />
      }
    />
  );
  const SoldRoute = () => (
    <FlatList
      data={soldItems}
      renderItem={({ item }) => {
        return <ProductCard product={item} />;
      }}
      keyExtractor={item => item.id.toString() + Math.random().toString()}
      contentContainerStyle={styles.emptyList}
      ListEmptyComponent={
        <EmptyState message="You haven't sold any products yet" />
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#6200EE']}
        />
      }
    />
  );
  const BorrowedRoute = () => (
    <FlatList
      data={myRentals}
      renderItem={({ item }) => {
        return <ProductCard product={item} rental="Borrowed" />;
      }}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.emptyList}
      ListEmptyComponent={
        <EmptyState message="You haven't rented any products yet" />
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#6200EE']}
        />
      }
    />
  );
  const LentRoute = () => (
    <FlatList
      data={lentItems}
      renderItem={({ item }) => {
        return <ProductCard product={item} />;
      }}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.emptyList}
      ListEmptyComponent={
        <EmptyState message="You haven't lent any products yet" />
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#6200EE']}
        />
      }
    />
  );
  const renderScene = SceneMap({
    bought: BoughtRoute,
    sold: SoldRoute,
    borrowed: BorrowedRoute,
    lent: LentRoute,
  });

  const loadAllTransactions = async () => {
    if (user?.id) fetchAllTransactions(user.id);
  };

  useEffect(() => {
    loadAllTransactions();
  }, []);
  useEffect(() => {
    console.log('Updated purchases:', myPurchases);
  }, [myPurchases]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#6200EE"
      inactiveColor="#666666"
      scrollEnabled={false}
      tabStyle={styles.tabStyle}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  tabIndicator: {
    backgroundColor: '#6200EE',
    height: 3,
  },
  tabStyle: {
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
