import React, { useState, useEffect } from 'react';
import { 
  Alert, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen() {
  // Dummy data for available leave types and their balances
  const dummyLeaveBalances = [
    { type: 'Annual Leave', days: 14 },
    { type: 'Sick Leave', days: 7 },
    { type: 'Personal Leave', days: 3 },
  ];

  // Dummy data for leave history
  const dummyLeaveHistory = [
    {
      id: 1,
      leaveType: 'Annual Leave',
      startDate: '2024-03-01',
      endDate: '2024-03-05',
      days: 5,
      status: 'Approved',
      reason: 'Family vacation',
      appliedDate: '2024-02-20'
    },
    {
      id: 2,
      leaveType: 'Sick Leave',
      startDate: '2024-03-15',
      endDate: '2024-03-16',
      days: 2,
      status: 'Pending',
      reason: 'Medical appointment',
      appliedDate: '2024-03-10'
    },
    {
      id: 3,
      leaveType: 'Personal Leave',
      startDate: '2024-02-20',
      endDate: '2024-02-21',
      days: 2,
      status: 'Rejected',
      reason: 'Personal matters',
      appliedDate: '2024-02-15'
    }
  ];

  const [leaveBalances] = useState(dummyLeaveBalances);
  const [leaveHistory] = useState(dummyLeaveHistory);
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!selectedLeaveType || !startDate || !endDate || !reason) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Simple date validation
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    if (start < today) {
      Alert.alert('Error', 'Start date cannot be in the past');
      return;
    }

    if (end < start) {
      Alert.alert('Error', 'End date must be after start date');
      return;
    }

    // Calculate requested days (excluding weekends)
    const days = calculateBusinessDays(start, end);
    
    // Check if enough leave balance is available
    const selectedLeaveBalance = leaveBalances.find(leave => leave.type === selectedLeaveType);
    if (days > selectedLeaveBalance.days) {
      Alert.alert('Error', `Insufficient leave balance. You only have ${selectedLeaveBalance.days} days available.`);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Leave request submitted successfully');
      // Reset form
      setSelectedLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');
    }, 1000);
  };

  const calculateBusinessDays = (start, end) => {
    let count = 0;
    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

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
      {/* Leave Balances Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leave Balances</Text>
        <View style={styles.balancesContainer}>
          {leaveBalances.map((leave, index) => (
            <View key={index} style={styles.balanceCard}>
              <Text style={styles.balanceType}>{leave.type}</Text>
              <Text style={styles.balanceDays}>{leave.days} days</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Leave Application Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apply for Leave</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLeaveType}
            onValueChange={setSelectedLeaveType}
            style={styles.picker}
          >
            <Picker.Item label="Select Leave Type" value="" />
            {leaveBalances.map((leave, index) => (
              <Picker.Item key={index} label={leave.type} value={leave.type} />
            ))}
          </Picker>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Start Date (YYYY-MM-DD)"
          value={startDate}
          onChangeText={setStartDate}
        />
        <TextInput
          style={styles.input}
          placeholder="End Date (YYYY-MM-DD)"
          value={endDate}
          onChangeText={setEndDate}
        />
        <TextInput
          style={[styles.input, styles.reasonInput]}
          placeholder="Reason for Leave"
          value={reason}
          onChangeText={setReason}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Leave History Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leave History</Text>
        {leaveHistory.map((leave) => (
          <View key={leave.id} style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyType}>{leave.leaveType}</Text>
              <Text style={[styles.historyStatus, { color: getStatusColor(leave.status) }]}>
                {leave.status}
              </Text>
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyDates}>
                {leave.startDate} to {leave.endDate} ({leave.days} days)
              </Text>
              <Text style={styles.historyReason}>{leave.reason}</Text>
              <Text style={styles.historyAppliedDate}>Applied on: {leave.appliedDate}</Text>
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
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  balancesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  balanceCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  balanceType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  balanceDays: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  picker: {
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  reasonInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#a5d6a7',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  historyStatus: {
    fontWeight: '500',
  },
  historyDetails: {
    gap: 4,
  },
  historyDates: {
    fontSize: 14,
    color: '#666',
  },
  historyReason: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  historyAppliedDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});