import appBar from '../../shared/components/leading/AppBar';
import ClassItem from './components/class-item';
import Input from '../../shared/components/Input';
import Leading from '../../shared/components/leading';
import React, {useEffect, useState} from 'react';
import useDebounce from '../../shared/hooks/useDebounce';
import {COLORS} from '../../shared/utils/colors';
import {LocationData, useLocationList} from '../../shared/api/useLocationList';
import {Search} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

const ClassFloorPlanScreen = () => {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: <Leading title="Denah Kelas" />,
      }),
    );
  }, [navigation]);

  const debounceSearch = useDebounce(keyword, 500);
  const {data, refetch, isLoading} = useLocationList({
    page: 1,
    limit: 10,
    search: debounceSearch,
  });

  // Fungsi untuk handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true); // Mulai refresh
    try {
      await refetch(); // Refetch data dari API
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setIsRefreshing(false); // Akhiri refresh
    }
  };

  const renderItem = ({item}: {item: LocationData}) => {
    return <ClassItem item={item} />;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Cari kelas"
          rightIcon={<Search />}
          value={keyword}
          onChange={setKeyword}
        />
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, i) => `course_${i}`}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

export default ClassFloorPlanScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  searchContainer: {
    padding: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  listContent: {
    gap: 10,
    paddingBottom: 100,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
