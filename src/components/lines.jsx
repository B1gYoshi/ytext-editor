import React, { Component } from 'react';
import Line from './line';
import './lines.css';
import './fonts.css';
import lyoshi from './lyoshi.png'
import ryoshi from './ryoshi.png'
import wow from './yoshi-wooh.mp3'
import wah from './yoshi-waaah.mp3'

class Lines extends Component {
    
    state = { 
        cursor: 0,
        lines: ["\n"],
        mouseDown: false
    } 

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

    headerStyle = {
        height:'30px',
        width:'96%',
        fontFamily: "Gentium Book Plus",
        display: 'inline-block'
    }

    playWow = () => {
        new Audio(wow).play();
    }

    playWah = () => {
        new Audio(wah).play();
    }

    handleNewLine = (index, caretPos) => {
        this.playWow();
        let newLines = [...this.state.lines]
        newLines.splice(index+1, 0, "")
        const newCursor = this.state.cursor+1
        let originalLine = this.state.lines[index]
        newLines[index] = originalLine.substring(0,caretPos)
        newLines[index+1] = originalLine.substring(caretPos, originalLine.length)
        this.setState({lines:newLines, cursor: newCursor})
    }

    handleChange = (e, index) => {

        const change = e.target.value
        var updatedLines = [...this.state.lines]

        //roundabout solution to the double space -> period problem for mac honestly but i don't know/couldn't find a better solution 
        if (change.length > this.state.lines[index].length && change.substring(change.length-1, change.length) === " ") {
            updatedLines[index] += " "
        } else {
            updatedLines[index] = change
        }

        this.setState({lines: updatedLines})
    }

    handleUp = (index) => {
        if (index <= 0) return;
        const newCursor = this.state.cursor -1;
        this.setState({cursor:newCursor})

    }

    handleDown = (index) => {
        if (index >= this.state.lines.length - 1) return;
        const currentCursor = this.state.cursor + 1;
        this.setState({cursor:currentCursor})
    }
    
    handleMouseDown = (index) => {
        this.setState({cursor: index, mouseDown:true})
    }

    handleMouseUp = (index) => {
        this.setState({mouseDown: false}) 
    }

    handleTab = (index, caretPos) => {
        var updatedLines = [...this.state.lines]
        let originalLine = updatedLines[index]
        updatedLines[index] = originalLine.substring(0, caretPos) + "    " + originalLine.substring(caretPos, originalLine.length)
        this.setState({lines: updatedLines})
    }

    handleDeleteLine = (index) => {
        this.playWah()
        const deletedLine = this.state.lines[index]
        var updatedLines = [...this.state.lines]
        updatedLines.splice(index, 1)
        updatedLines[index-1] += deletedLine + " "
        this.setState({lines:updatedLines, cursor:index-1})
        
    }

    render() { 
        let keyCount = 0;
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