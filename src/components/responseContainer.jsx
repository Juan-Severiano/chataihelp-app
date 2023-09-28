import { Component } from "react";
import { Text, View } from "react-native";

export default class ResponseContainer extends Component {
    render() {
        return (
        <View style={[{
            width: '60%',
            backgroundColor: '#151515',
            marginTop: 20,
            marginHorizontal: 10,
            padding: 15,
            borderRadius: 25,
          }, this.props.userMsg ? {
            marginLeft: 150,
          } : null]}>
            <Text style={{ color: '#fff' }}>
              {this.props.msg}
            </Text>
        </View>
        )
    }
}