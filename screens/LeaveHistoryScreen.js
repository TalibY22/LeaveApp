import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LeaveHistoryScreen() {
  const leaveHistory = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2024-03-01',
      endDate: '2024-03-05',
      days: 5,
      status: 'Approved',
      reason: 'Family vacation',
      appliedDate: '2024-02-20',
      icon: 'beach',
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2024-03-15',
      endDate: '2024-03-16',
      days: 2,
      status: 'Pending',
      reason: 'Medical appointment',
      appliedDate: '2024-03-10',
      icon: 'medical-bag',
    },
    {
      id: 3,
      type: 'Personal Leave',
      startDate: '2024-02-20',
      endDate: '2024-02-21',
      days: 2,
      status: 'Rejected',
      reason: 'Personal matters',
      appliedDate: '2024-02-15',
      icon: 'account',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return '#4CAF50';
      case 'rejected': return '#F44336';
      case 'pending': return '#FFC107';
      default: return '#757575';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="history" size={32} color="#4CAF50" />
        <Text style={styles.headerText}>Leave History</Text>
      </View>

      <View style={styles.historyContainer}>
        {leaveHistory.map((leave) => (
          <View key={leave.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.typeContainer}>
                <MaterialCommunityIcons 
                  name={leave.icon} 
                  size={24} 
                  color="#4CAF50" 
                />
                <Text style={styles.leaveType}>{leave.type}</Text>
              </View>
              <Text style={[styles.status, { color: getStatusColor(leave.status) }]}>
                {leave.status}
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.dates}>
                {leave.startDate} to {leave.endDate} ({leave.days} days)
              </Text>
              <Text style={styles.reason}>{leave.reason}</Text>
              <Text style={styles.appliedDate}>Applied on: {leave.appliedDate}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  historyContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leaveType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  status: {
    fontWeight: '500',
  },
  cardContent: {
    gap: 8,
  },
  dates: {
    fontSize: 14,
    color: '#666',
  },
  reason: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  appliedDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
}); 