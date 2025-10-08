import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

interface IProfileSectionProps {
  name: string;
  email: string;
  image: string;
}

export const ProfileSection = (props: IProfileSectionProps) => (
 
    <View style={styles.container}>
      <Avatar.Image size={154} style={styles.image}
        source={{ uri: 'https://res.cloudinary.com/dcqw5mziu/image/upload/v1737240115/profileIcon_rsj9ln.png' }}
      // source={{ uri: props.image }} 
      />
      <View style={styles.content}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.email}>{props.email}</Text>
      </View>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    gap: 20,
  },
  // image: {
  //   shadowColor: '#4728E0', // Shadow color
  //   shadowOpacity: 0.7, // Shadow opacity (70%)
  //   shadowOffset: { width: 0, height: 0 }, // Spread shadow in all directions
  //   shadowRadius: 10, // Spread radius
  //   elevation: 50, // Android shadow
  // },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 5,
  },
  name: {
    fontSize: 24,
    fontFamily: 'ProximaBold',
    lineHeight: 24,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  email: {
    fontSize: 14,
    fontFamily: 'Proxima',
    lineHeight: 18,
    color: '#FFFFFF',
    opacity: 0.5,
    textTransform: 'lowercase',
  },
});
