import { createStackNavigator, } from '@react-navigation/stack';
import Users from '../screen/Users';
import UserDetails from '../screen/UserDetails';
import * as React from 'react';
import { type } from 'os';


export type RouteParams = {
    Users: undefined,
    UserDetails: { userid: string | null, isNew: boolean }
}

export const RootStack = createStackNavigator();


export const MainStack = () => (
    <RootStack.Navigator initialRouteName='Users'>
        <RootStack.Screen name='Users' component={Users} options={{ headerShown: false }} />
        <RootStack.Screen name='UserDetails' component={UserDetails} options={{ headerShown: false }} />
    </RootStack.Navigator>
)


