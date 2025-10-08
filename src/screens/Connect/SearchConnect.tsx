import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  TextInput,
  Image
} from 'react-native';
// import { ScrollView, NativeViewGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import {
  ActivityIndicator,
  Divider,
  List,
  Modal,
  Portal,
  RadioButton,
} from 'react-native-paper';
// import 'react-native-gesture-handler';
import { Event, Highlight } from '../../components/home';
import { Footer } from '../../components/shared';
import FilterSvg from '../../components/svgs/filter';
import { useGetConnectQuery, useGetProfileQuery } from '../../hooks/query/user-query';
import { useEventStore } from '../../store/events-store';
import { filterData } from '../../utils/helper';
import { useProfileStore } from '../../store/profile-store';
import { Button } from '../../components/form';

export const SearchConnect = ({ route }) => {
  const email = useProfileStore(state => state.email);
  const { data: ProfileData, isLoading, refetch } = useGetProfileQuery(route.params.id, email);

  const Profile = ProfileData?.profile

  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const navigation = useNavigation();
  const [value, setValue] = useState('');

  const [categories, setCategories] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);

  const [filterCategory, setFilterCategory] = useState('');
  const [filterDay, setFilterDay] = useState<string[]>(['1', '2']);
  const [filterVenue, setFilterVenue] = useState('');

  const onGoingEvents = useEventStore(state => state.onGoing);
  const upcommingEvents = useEventStore(state => state.upcoming);
  const completedEvents = useEventStore(state => state.completed);
  const setOnGoingEvents = useEventStore(state => state.setOnGoing);
  const setUpcommingEvents = useEventStore(state => state.setUpcoming);
  const setCompletedEvents = useEventStore(state => state.setCompleted);

  const handleTextChange = (text: string) => {
    setValue(text)
  }

  const handleFilter = () => {
    setFilterCategory(value)
    setFilterDay(['1', '2']);
    setFilterVenue('');
  }

//   useEffect(() => {
//     const timeNow = new Date();
//     EventData?.data?.other.forEach(item => {
//       if (!categories.includes(item.category)) {
//         setCategories([...categories, item.category]);
//       }
//       if (!days.includes(item.day)) {
//         setDays([...days, item.day]);
//       }
//       if (!venues.includes(item.venue)) {
//         setVenues([...venues, item.venue]);
//       }

//       if (
//         new Date(item.startTime) < timeNow &&
//         new Date(item.endTime) > timeNow
//       ) {
//         setOnGoingEvents(item);
//       } else if (new Date(item.startTime) > timeNow) {
//         setUpcommingEvents(item);
//       } else if (new Date(item.endTime) < timeNow) {
//         setCompletedEvents(item);
//       }
//     });

//     EventData?.data?.highlights.forEach(item => {
//       if (!categories.includes(item.category)) {
//         setCategories([...categories, item.category]);
//       }
//       if (!days.includes(item.day)) {
//         setDays([...days, item.day]);
//       }
//       if (!venues.includes(item.venue)) {
//         setVenues([...venues, item.venue]);
//       }
//     });
//   }, [EventData]);

  const handleResetModal = async () => {
    setFilterCategory('');
    setFilterDay(['1', '2']);
    setFilterVenue('');
  };

  const handleSubmit = () => {
    console.log('Submitted')
  }

  const handleDayFilter = day => {
    if (filterDay.includes(day)) {
      setFilterDay(filterDay.filter(item => item !== day));
    } else {
      setFilterDay([...filterDay, day]);
    }
  };

  return (
        <>
      <View
        // useAngle
        // angle={-128.06}
        style={styles.container}>
          {/* <Modal
            visible={visible}
            // onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <ScrollView>
              <List.Accordion
                title="Categories"
                style={styles.accordion}
                titleStyle={styles.accordionTitle}>
                <View>
                  <RadioButton.Group
                    onValueChange={newValue => setFilterCategory(newValue)}
                    value={filterCategory}>
                    {categories.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            if (filterCategory === item) {
                              setFilterCategory('');
                            } else {
                              setFilterCategory(item);
                            }
                          }}>
                          <View style={styles.itemList}>
                            <RadioButton value={item} />
                            <Text style={styles.itemText}>{item}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </RadioButton.Group>
                </View>
              </List.Accordion>

              <Divider style={styles.divider} />

              <List.Accordion
                title="Venue"
                style={styles.accordion}
                titleStyle={styles.accordionTitle}>
                <View>
                  <RadioButton.Group
                    onValueChange={newValue => setFilterVenue(newValue)}
                    value={filterVenue}>
                    {venues.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            if (filterVenue === item) {
                              setFilterVenue('');
                            } else {
                              setFilterVenue(item);
                            }
                          }}>
                          <View style={styles.itemList}>
                            <RadioButton value={item} />
                            <Text style={styles.itemText}>{item}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </RadioButton.Group>
                </View>
              </List.Accordion>
            </ScrollView>
            <View style={styles.modalFooter}>
              <Button mode="contained" onPress={handleResetModal}>
                Reset
              </Button>
              <Button mode="contained" onPress={hideModal}>
                Done
              </Button>
            </View>
          </Modal> */}
        <ScrollView
          style={[styles.container, { marginBottom: 60 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              color="#4E8FB4"
              size="large"
              style={{ marginTop: 20 }}
            />
          ) : (
            <>
            <Text style={{color: '#FFFFFF', fontSize: 20, marginLeft: 25}}>Profile Page</Text>
            <View style={styles.section}>
                {/* <View style={styles.card}> */}
                      <View>
                      {/* <Image /> */}
                      </View>
                    <Text style={{color: '#ffffff'}}>{Profile?.name}</Text>
                    <View>
                        {Profile?.interests.map((item,index) => (
                            <Text style={{color: '#ffffff'}} key={index}>{item.viewValue}</Text>
                        ))}
                    </View>
                    <View>
                        {ProfileData?.isconnected ? (
                            <Button title='Connect' onPress={handleSubmit}/>
                        ):(
                            <Button title='Disconnect' onPress={handleSubmit}/>
                        )}
                    </View>
                {/* </View> */}
            </View>
            </>
          )}
        </ScrollView>
      </View>
      {/* <View style={styles.fab}>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('1')
                ? '#46B1EE'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('1')}>
          <Text style={styles.fabButtonText}>Day 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.fabButton,
            {
              backgroundColor: filterDay.includes('2')
                ? '#46B1EE'
                : 'transparent',
            },
          ]}
          onPress={() => handleDayFilter('2')}>
          <Text style={styles.fabButtonText}>Day 2</Text>
        </TouchableOpacity>
      </View> */}
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#161616',
        // fontFamily: 'Poppins',
        color: '#FFFFFF',
        borderBottomColor: '#46B1EE',
        borderBottomWidth: 2,
        fontSize: 14,
        lineHeight: 17,
        marginTop: 2,
        padding: 0,
      },
  container: {
    height: '100%',
    backgroundColor: '#161616'
  },
  containerStyle: {
    backgroundColor: '#BBD4E2',
    width: '70%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10, 
    maxHeight: Dimensions.get('window').width,
  },
  section: {
    paddingTop: 5,
    paddingHorizontal: 24,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between'
  },
  heading: {
    // // fontFamily: 'Poppins',
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  pagerView: {
    height: 180,
  },
  events: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    justifyContent: 'center',
  },
  itemList: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  accordion: {
    backgroundColor: '#DCE9F0',
  },
  accordionTitle: {
    // // fontFamily: 'Poppins',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#141415',
  },
  divider: {
    height: 3,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  itemText: {
    // fontFamily: 'Poppins',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  fab: {
    position: 'absolute',
    right: 0,
    top: '45%',
    transform: [{ rotate: '270deg' }, { translateY: 30 }],
    flexDirection: 'row',
    backgroundColor: '#161616',
  },
  fabButton: {
    backgroundColor: '#46B1EE',
    borderColor: '#46B1EE',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderRadius: 0,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  fabButtonText: {
    color: '#FFFFFF',
    // fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  card: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    backgroundColor: '#000000',
    width: '100%',
    borderRadius: 20,
  }
});
