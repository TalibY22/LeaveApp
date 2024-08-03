import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

















export default function HomeScreen(){

    //State to use store the leave data
    const [leaveData, setLeaveData] = useState([]);
    
    //to use the loading animation 
    const [loading, setLoading] = useState(true);


    
  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/days'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Something aint working brother');
        }
        const data = await response.json();
        setLeaveData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

    return(

        <Text>HYYY</Text>
    )
}