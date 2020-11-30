import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Todo = ({ id, title, onPress }) => {
    return (
        <View style={styles.todo}>
            <Text style={{ fontSize: 21, flex: 1 }}>{title}</Text>
            <TouchableOpacity onPress={() => onPress(id)}>
                <Text style={{ fontSize: 21 }}>❌</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Todo;

const styles = StyleSheet.create({
    todo: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 51,
        backgroundColor: '#EEE',
        justifyContent: "center",
        marginHorizontal: 7,
        marginVertical: 5,
        padding: 7,
        shadowColor: 'grey',
        borderColor: 'orange',
        borderWidth: 1,
        borderRadius: 11,
    }
})
