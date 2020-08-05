import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { ColorConstant } from '../constant/Constant';
import { User } from '../dto/User';
import UserItem from '../component/UserItem';
import { Header } from 'react-native-elements';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import UserDao from '../store/database/UserDao';
import { RouteParams } from '../navigation/Navigation';
import { ScrollView } from 'react-native-gesture-handler';
//import { StackNavigationProp } from '@react-navigation/stack';
// Properties for Users Screen Component
export interface UsersProps {
    headerTitle: string,
    navigation: NavigationProp<RouteParams, "Users">;
}

// Users Screen Component
const Users: React.FC<UsersProps> = (props) => {

    const [users, setUsers] = useState<User[]>([]);
    const userDao:UserDao = new UserDao();

    useEffect(() => {
        userDao.getAllUsers().then((users: User[]) => {
            setUsers(users);
        })
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            userDao.getAllUsers().then((users: User[]) => {
                setUsers(users);
            })
        }, [])
    );

    const onItemSelect = (user: User, index: number) => {
        props.navigation.navigate('UserDetails', { isNew: false, userid: user.id });
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar barStyle='light-content' backgroundColor={ColorConstant.primaryDarkColor} />
            <Header
                placement="left"
                backgroundColor={ColorConstant.primaryColor}
                centerComponent={{ text: 'Contacts', style: { color: ColorConstant.white, fontSize: 18, fontWeight: 'bold' } }}
                rightComponent={{
                    icon: 'add', size: 24, color: ColorConstant.white, style: { padding: 4 }, onPress: () => {
                        props.navigation.navigate('UserDetails', { isNew: true, userid: null });
                    }
                }}
            />
            <ScrollView>
            {
                users.map((item: User, index: number) => {
                    return (
                        <UserItem
                            index={index}
                            key={item.id}
                            user={item}
                            onItemSelect={onItemSelect}
                        />
                    )
                })
            }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Users;

// Style for Users Screen 
const style = StyleSheet.create({
    root: {
        backgroundColor: ColorConstant.primaryColor
    }
})