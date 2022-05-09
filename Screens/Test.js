import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
 
import DropDown from 'react-native-multi-level-selector';
 
const Test = () => {
  const optionss = [
    {
      value: 'Department',
      nested: [
        {value: 'Customer Relations'},
        {value: 'IT'},
        {value: 'Human Resources'},
        {value: 'Managerial'},
      ],
    },
    {
      value: 'Location',
      nested: [
        {
          value: 'Bangalore',
          nested: [
            {
              value: 'Whitefield',
              nested: [
                {
                  value: 'ITPL',
                },
              ],
            },
            {
              value: 'Jayanagar',
            },
            {
              value: 'Majestic',
            },
          ],
        },
        {
          value: 'New York',
          nested: [
            {
              value: "Hell's Kitchen",
            },
            {
              value: 'Harlem',
            },
          ],
        },
        {value: 'Birmingham'},
      ],
    },
    {
      value: 'Role',
      nested: [
        {
          value: 'SDE 1',
          nested: [
            {
              value: 'Trainee',
            },
            {
              value: 'Associate',
            },
          ],
        },
        {value: 'SDE 2'},
        {value: 'SDE 3'},
      ],
    },
  ];
 
  return (
    <View>
      <DropDown placeholder="Filter" onChange={el => {}}  options={optionss} />
      <Text style={styles.content}>Your Content Goes Here</Text>
    </View>
  );
};
 
const styles = StyleSheet.create({
  content: {textAlign: 'center', fontSize: 20, marginVertical: 20},
});
 
export default Test;
 