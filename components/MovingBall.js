import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  PanResponder,
  Animated,
  Text,
  View
} from "react-native";

export default class MovingBall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDraggable: true,
      dropZoneValues: null,
      pan: new Animated.ValueXY(),
      position: {
        x: 0,
        y: 0
      }
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          this.setState({
            showDraggable: false
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
        }
      }
    });
  }
  isDropZone(gesture) {
    var dz = this.state.dropZoneValues;

    if (gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height === true) {
      console.log("It has dropped into the right place \n");
    }
    if (
      gesture.moveY < 625 &&
      gesture.moveY > 536 &&
      gesture.moveX < 398 &&
      gesture.moveX > 0
    ) {
      alert("You have submitted an answer");
      console.log("You have put inside the circle already");
    } else {
      console.log("It has dropped into the wrong place \n");
    }

    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  setDropZoneValues(event) {
    this.setState({
      dropZoneValues: {
        x: event.nativeEvent.layout.x,
        y: event.nativeEvent.layout.y
      },
      x: event.nativeEvent.layout.x,
      y: event.nativeEvent.layout.y
    });
  }

  onLayout(event) {}

  render() {
    return (
      <View
        onLayout={this.setDropZoneValues.bind(this)}
        style={styles.draggableContainer}
      >
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.circle]}
        >
          <Text style={styles.text}>option 1</Text>
        </Animated.View>
      </View>
    );
  }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get("window");
const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#1abc9c",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
    // the styling of the circle
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff"
    // This is where the text is set
  },
  draggableContainer: {
    position: "relative",
    top: Window.height / 5 - CIRCLE_RADIUS,
    left: Window.width / 2 - CIRCLE_RADIUS
    //left: Window.width / 2 - 36
    // this is where to start the starting position
  },
  draggableContainer2: {
    position: "relative",
    top: Window.height / 5 - CIRCLE_RADIUS,
    left: 20
    // this is where to start the starting position
  },
  circle1: {
    backgroundColor: "white",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
    // This is other circle color
  }
});
