import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Alert, Image as RImage } from 'react-native';
import { ColorConstant } from '../constant/Constant';
import { User } from '../dto/User';
import { Header, Avatar } from 'react-native-elements';
import {  NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import Utility from '../utility/Utility';
import { Input, Icon } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import UserDao from '../store/database/UserDao';
import { RouteParams } from '../navigation/Navigation';

export interface UserDetailsProps {
    headerTitle: string,
    navigation: NavigationProp<RouteParams,"UserDetails">;
}

const UserDetails: React.FC<UserDetailsProps> = (props) => {

    const [userName, setUserName] = useState<string>("");
    const [mobileNumber, setMobieNumber] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [imagePath, setImagePath] = useState<string>("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const route = useRoute<RouteProp<RouteParams,'UserDetails'>>();
    const userDao = new UserDao();
    const [userId,setUserId] = useState<string|null>(null);
    const [isUpdate,setIsUpdate] = useState<boolean>(false);


    useEffect(() => {
        let isUpdate = !route.params.isNew
        let userId = route.params.userid
        if(isUpdate && userId){
            userDao.getUser(userId).then((user:User)=>{
                setUserName(user.name);
                setMobieNumber(user.mobileNumber);
                setDateOfBirth(user.dob);
                setImagePath(user.imageUrl);
            })
        }
        setUserId(userId);
        setIsUpdate(isUpdate)
    }, [])

    const onChangeUserName = (text: string) => {
        setUserName(text)
    }

    const onChangeUserMobileNumber = (text: string) => {
        setMobieNumber(text)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        hideDatePicker();
        setDateOfBirth(Utility.getFormattedDateForUserItem(Utility.getFormattedDate(date)));
    }

    const onSave = () => {
        if(userName.length<=2){
            return;
        }
        if(mobileNumber.length!=10){
            return;
        }
        if(!dateOfBirth){
            return;
        }
        if(!imagePath){
            return;
        }

        if(isUpdate && userId){
            userDao.updateUser(userId,new User(userId,userName,imagePath,dateOfBirth,mobileNumber)).then(()=>{
                props.navigation.goBack();
            })
        }else {
            userDao.insertUser(new User(Utility.getNewUid(),userName,imagePath,dateOfBirth,mobileNumber)).then(()=>{
                props.navigation.goBack();
            })
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar barStyle='light-content' backgroundColor={ColorConstant.primaryDarkColor} />
            <Header
                placement="left"
                leftComponent={{
                    icon: 'arrow-back', size: 24, color: ColorConstant.white, style: { padding: 4 }, onPress: () => {
                        props.navigation.goBack();
                    }
                }}
                backgroundColor={ColorConstant.primaryColor}
                centerComponent={{ text: 'User Details', style: { color: ColorConstant.white, fontSize: 18, fontWeight: 'bold' } }}
                rightComponent={{
                    icon: 'check', size: 24, color: ColorConstant.white, style: { padding: 4 }, onPress: () => {
                       onSave();
                    }
                }}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: ColorConstant.primaryColor }}>
                <Avatar
                    rounded
                    size={'xlarge'}
                    source={
                        imagePath ? { uri: imagePath } : require('../assets/profile.png')
                    }
                    avatarStyle={imagePath ? styles.avtarStyleWithoutTint : styles.avtarStyleWithTint}
                />
                <Icon
                    containerStyle={styles.editProfileImageContainer}
                    raised
                    name='camera-alt'
                    type='MaterialIcons'
                    color={ColorConstant.primaryColor}
                    onPress={() => {
                        const buttons = [
                            {
                                text: 'Camera', onPress: () => {
                                    ImagePicker.openCamera({
                                        width: 300,
                                        height: 300,
                                        cropping: true
                                    }).then((image) => {
                                        setImagePath(image.path)
                                    }).catch ( err => {
                                        //console.log(err.message);
                                        
                                    })
                                }
                            },
                            {
                                text: 'Gallary', onPress: () => {
                                    ImagePicker.openPicker({
                                        width: 300,
                                        height: 300,
                                        cropping: true
                                    }).then(image => {
                                        setImagePath(image.path)
                                    }).catch ( err => {
                                        //console.log(err.message);
                                    })
                                }
                            },
                            { text: 'Cancel', type: 'cancel' },
                        ];
                        Alert.alert('Select Profile', 'Please choose image source', buttons);
                    }} />
            </View>
            <View style={{ paddingRight: 8, paddingLeft: 8, paddingTop: 16, paddingBottom: 16 }}>
                <Input
                    placeholder="Name"
                    value={userName}
                    numberOfLines={1}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    autoCompleteType={'name'}
                    autoFocus={false}
                    keyboardType={'default'}
                    returnKeyType={'next'}
                    leftIcon={{ type: 'MaterialIcons', name: 'person', size: 24, color: ColorConstant.textBlackish }}
                    onChangeText={onChangeUserName}
                />
                <Input
                    placeholder="Mobile Number"
                    numberOfLines={1}
                    value={mobileNumber}
                    placeholderTextColor={ColorConstant.textGrey}
                    maxLength={10}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    autoCompleteType={'tel'}
                    autoFocus={false}
                    keyboardType={'phone-pad'}
                    returnKeyType={'done'}
                    leftIcon={{ type: 'MaterialIcons', name: 'contact-phone', size: 24, color: ColorConstant.textBlackish }}
                    onChangeText={onChangeUserMobileNumber}
                />

                <TouchableOpacity onPressIn={showDatePicker}>
                    <Input
                        placeholder="Date of Birth"
                        editable={false}
                        numberOfLines={1}
                        value={dateOfBirth}
                        placeholderTextColor={ColorConstant.textGrey}
                        inputStyle={styles.inputText}
                        autoCorrect={false}
                        autoCompleteType={'tel'}
                        pointerEvents={'none'}
                        autoFocus={false}
                        keyboardType={'phone-pad'}
                        returnKeyType={'done'}
                        leftIcon={{ type: 'MaterialIcons', name: 'event', size: 24, color: ColorConstant.textBlackish }}
                    />
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </SafeAreaView>
    )
}

export default UserDetails;

const styles = StyleSheet.create({
    inputText: {
        fontSize: 16
    },
    avtarStyleWithoutTint: {
        borderColor: ColorConstant.white,
        borderWidth: 8
    },
    avtarStyleWithTint: {
        borderColor: ColorConstant.white,
        borderWidth: 8,
        tintColor: ColorConstant.white
    },
    editProfileImageContainer: {
        position: 'absolute',
        bottom: 0,
        transform: [{ translateX: 32 }]
    }
})