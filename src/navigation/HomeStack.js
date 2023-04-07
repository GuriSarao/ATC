import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Edit_Expense from '../screens/Edit_Expense';
import TopTabs from '../screens/TopTabs';

const Stack = createNativeStackNavigator();

const HomeStack = ({ route }) => {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName='TopTabs'
            >
                <Stack.Screen
                    name="TopTabs"
                    component={TopTabs}
                />
                <Stack.Screen
                    name="Edit_Expense"
                    component={Edit_Expense}
                />
            </Stack.Navigator>
        </>
    );
};

export default HomeStack;
