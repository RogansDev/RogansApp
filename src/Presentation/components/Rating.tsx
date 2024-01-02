import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Rating = ({ initialRating = 0, onRatingPress }: any) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
    if (onRatingPress) {
      onRatingPress(selectedRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const iconName = i <= rating ? 'star' : 'star-o';
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRatingPress(i)}>
          <FontAwesome name={iconName} size={16} color="#FBBC05" style={styles.star} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.ratingContainer}>
      {renderStars()}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 3,
  },
});

export default Rating;
