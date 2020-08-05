import React from 'react';
import { StyleSheet, View } from 'react-native';
import { User } from '../dto/User';
import { ColorConstant } from '../constant/Constant';
import { Avatar, Icon, Text } from 'react-native-elements';
import Utility from '../utility/Utility';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Properties of UserItem
export interface UserItemProps {
    key: string,
    index: number,
    user: User,
    onItemSelect: (user:User,index:number) => void
}

// Component UserItem
const UserItem: React.FC<UserItemProps> = (props) => {
    return (
        <View style={styles.root} key={props.user.id}>
            <TouchableOpacity style={styles.container} onPress={() => {props.onItemSelect(props.user,props.index)}}>
                <Avatar
                    title={props.user.name[0]}
                    rounded
                    size={'medium'}
                    source={{
                        uri: props.user.imageUrl
                    }}
                    activeOpacity={0.7}
                    avatarStyle={styles.avtar}
                />
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{props.user.name}</Text>
                    <View style={styles.subTitleContainer}>
                        <Text style={styles.subTitle}>{props.user.mobileNumber} | Born on {Utility.getFormattedDateForUserItem(Utility.getDateObjectFromString(props.user.dob))}</Text>
                    </View>
                </View>
                <Icon
                    name='navigate-next'
                    type='MaterialIcons'
                    color={ColorConstant.primaryDarkColor}
                />
            </TouchableOpacity>
        </View>
    )
}

export default UserItem;

// Style of UserItem
const styles = StyleSheet.create({
    root: {
        padding: 8,
        marginTop: 4,
        marginLeft:4,
        marginRight:4,
        marginBottom: 2,
        backgroundColor: ColorConstant.white,
        shadowOpacity: 0.8,
        elevation: 2,
        borderRadius:4
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    innerContainer: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8
    },
    subTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 18,
        color:ColorConstant.primaryDarkColor
    },
    subTitle: {
        fontSize: 14,
        color:ColorConstant.textGrey,
    },
    avtar:{

        //borderWidth:StyleSheet.hairlineWidth * 4,
        //borderColor:ColorConstant.textPrimaryLight,
        //backgroundColor:ColorConstant.primaryColor
    }
})