import { Component } from "react";
import { Image, StyleSheet, View } from "react-native";

export default class Header extends Component {
    render() {
        return (
            <View style={styles.headerContainer}>
                <Image style={styles.imgHeader} source={require('../../assets/chataihelp-logo.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        maxHeight: 100,
        padding: 10,
    },
    imgHeader: {
        maxHeight: 50,
        resizeMode: 'contain'
    }
})
