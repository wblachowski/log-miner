import React, { Component } from "react";
import Backdrop from "@material-ui/core/Backdrop";

class DragAndDrop extends Component {
  state = {
    drag: false,
  };
  dropRef = React.createRef();
  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };
  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };
  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  render() {
    return (
      <div
        onDragEnter={this.handleDragIn}
        onDragLeave={this.handleDragOut}
        onDragOver={this.handleDrag}
        onDrop={this.handleDrop}
        draggable="true"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          position: "absolute",
        }}
        ref={this.dropRef}
      >
        {this.state.drag && (
          <Backdrop open={this.state.drag} style={{ zIndex: 9999 }}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                left: 0,
                textAlign: "center",
                color: "white",
              }}
            >
              <div>drop a log file</div>
            </div>
          </Backdrop>
        )}
        {this.props.children}
      </div>
    );
  }
}
export default DragAndDrop;
