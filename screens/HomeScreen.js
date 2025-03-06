import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const leaveData = [
    {
      type: 'Annual Leave',
      total: 14,
      used: 5,
      icon: 'beach',
      color: '#4CAF50'
    },
    {
      type: 'Sick Leave',
      total: 7,
      used: 2,
      icon: 'medical-bag',
      color: '#F44336'
    },
    {
      type: 'Personal Leave',
      total: 3,
      used: 1,
      icon: 'account',
      color: '#2196F3'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Here's your leave summary</Text>
      </View>

      <View style={styles.cardsContainer}>
        {leaveData.map((leave, index) => (
          <View key={index} style={[styles.card, { borderLeftColor: leave.color }]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name={leave.icon} size={24} color={leave.color} />
              <Text style={styles.cardTitle}>{leave.type}</Text>
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{leave.total - leave.used}</Text>
                  <Text style={styles.statLabel}>Available</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{leave.used}</Text>
                  <Text style={styles.statLabel}>Used</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>{leave.total}</Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${(leave.used / leave.total) * 100}%`,
                      backgroundColor: leave.color
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardContent: {
    gap: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
}); 