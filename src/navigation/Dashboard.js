import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import ExpenseTypes from '../screens/ExpenseTypes';
import GRBasedExpense from '../screens/GRBasedExpense';
import ExpenseList from '../screens/ExpenseList'

const Stack = createNativeStackNavigator();

const DashboardStack = ({ route }) => {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName='ExpenseList'
            >
                <Stack.Screen
                    name="ExpenseList"
                    component={ExpenseList}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                />
                <Stack.Screen
                    name="ExpenseTypes"
                    component={ExpenseTypes}
                />
                <Stack.Screen
                    name="GRBasedExpense"
                    component={GRBasedExpense}
                />
            </Stack.Navigator>
        </>
    );
};

export default DashboardStack;
