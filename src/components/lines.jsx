import React, { Component } from 'react';
import Line from './line';
import './lines.css';
import './fonts.css';
import lyoshi from './lyoshi.png'
import ryoshi from './ryoshi.png'
import wow from './yoshi-wooh.mp3'
import wah from './yoshi-waaah.mp3'

//The Lines class holds the header, images, and all the present lines in the code editor
class Lines extends Component {
    
    state = { 
        cursor: 0, //represents which line the cursor/caret should be on 
        lines: [""], //each element in this array represents the †ext-content of a line 
        mouseDown: false //checks if the mouse is down (user has clicked)
    } 

    //styling for both images of yoshi

    lImgStyle = {
        width: '2%',
        height: '30px',
        float: 'left'
    }

    rImgStyle = {
        width: '2%',
        height: '30px',
        float: 'right'
    }

    //styling for the header between the images
    headerStyle = {
        height:'30px',
        width:'96%',
        fontFamily: "Gentium Book Plus",
        display: 'inline-block'
    }

    //plays an audio clip of yoshi saying wow
    playWow = () => {
        new Audio(wow).play();
    }

    //plays an audio clip of yoshi saying wah
    playWah = () => {
        new Audio(wah).play();
    }

    //handles creation of a new line
    //param: [index] represents the line number where the new line is created
    //param: [caretPos] represents the position of the caret within the line when enter is hit
        //e.g. if `Hello World` was the line and caretPos was 6, then `World` would go on the new line
    handleNewLine = (index, caretPos) => {
        this.playWow(); //when a new line is created, the wow audio clip is played

        let newLines = [...this.state.lines]
        newLines.splice(index+1, 0, "")

        let originalLine = this.state.lines[index]
        
        newLines[index] = originalLine.substring(0,caretPos)
        newLines[index+1] = originalLine.substring(caretPos, originalLine.length)

        const newCursor = this.state.cursor+1

        this.setState({lines:newLines, cursor: newCursor})
    }

    //handles any change to a line
    //param: [e] represents the event containing information about the change
    //param: [index] represents the line number where the change occurred
    handleChange = (e, index) => {

        const change = e.target.value
        var updatedLines = [...this.state.lines]

        if (change.length > this.state.lines[index].length && change.substring(change.length-1, change.length) === " ") {
            updatedLines[index] += " "
        } else {
            updatedLines[index] = change
        }

        this.setState({lines: updatedLines})
    }

    //handles going up a line
    //param: [index] represents the current line number 
    handleUp = (index) => {
        if (index <= 0) return;
        const newCursor = this.state.cursor -1;
        this.setState({cursor:newCursor})

    }

    //handles going down a line
    //param: [index] represents the current line number
    handleDown = (index) => {
        if (index >= this.state.lines.length - 1) return;
        const currentCursor = this.state.cursor + 1;
        this.setState({cursor:currentCursor})
    }
    
    //handles mouse clicks
    //*param: [index] represents the line number that the mouse clicked
        //this is different from the other index parameters
    handleMouseDown = (index) => {
        this.setState({cursor: index, mouseDown:true})
    }

    //handles when mouse click is released
    handleMouseUp = () => {
        this.setState({mouseDown: false}) 
    }

    //handles tab click
    //param: [index] represents current line number
    //param: [caretPos] represents position of the caret within the line
    handleTab = (index, caretPos) => {
        var updatedLines = [...this.state.lines]
        let originalLine = updatedLines[index]
        updatedLines[index] = originalLine.substring(0, caretPos) + "    " + originalLine.substring(caretPos, originalLine.length)
        this.setState({lines: updatedLines})
    }

    //handles deletion of a line
    //param: [index] represents line to be deleted
    handleDeleteLine = (index) => {
        this.playWah() //plays wah audio clip when a line is deleted

        const deletedLine = this.state.lines[index]
        var updatedLines = [...this.state.lines]

        updatedLines.splice(index, 1)
        updatedLines[index-1] += deletedLine + " "

        this.setState({lines:updatedLines, cursor:index-1}) 
    }

    //renders images, header, and all the lines
    render() { 
        let keyCount = 0; //used for assigning line number
        return (
            <div className='bg'>
                <img alt="Cannot Display" style={this.lImgStyle} src={lyoshi}/>
                <h4 className = 'head' style={this.headerStyle}>Yoshi Code Editor</h4>
                <img alt="Cannot Display" style={this.rImgStyle} src={ryoshi}/>
                {this.state.lines.map(line => 
                    <Line deleteLine={this.handleDeleteLine} tab={this.handleTab} mouseDown={this.handleMouseDown} mouseUp={this.handleMouseUp} curCursor={this.state.cursor} mDown={this.state.mouseDown} upLine={this.handleUp} downLine={this.handleDown} content={line} lnum={keyCount++} newLine={this.handleNewLine} change={this.handleChange} key={keyCount}/>
                )}              
            </div>
        );
    }
}

export default Lines;