import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts.css';
import './lines.css';

//The Line class holds the badge representing the line number and the line itself
class Line extends Component {

    //the styling for the line 
    lineStyle = {
        fontFamily: "Gentium Book Plus",
        color:'white',
        border: '0px',
        backgroundColor: '#A4BE5C',
        width: '98%',
    }

    //the styling for the badge
    badgeStyle = {
        width: '2%',
    }        

    //called when any key on the keyboard is pressed
    //param: [e] represents the event which holds information about the key pressed
    handleKeyDown = (e) => {
        if (e.key === "Enter") { //create new line
            this.props.newLine(this.props.lnum, this.line.selectionStart)
        } else if (e.key === "ArrowUp") { //move up a line
            this.props.upLine(this.props.curCursor)
        } else if (e.key === "ArrowDown") { //move down a line
            this.props.downLine(this.props.curCursor)
        } else if (e.key === "Tab") { //tab = four spaces
            e.preventDefault()
            let start = this.line.selectionStart
            this.props.tab(this.props.lnum, start)
            setTimeout(() => this.line.setSelectionRange(start +4, start+4), 0)
        } else if (e.key === "Backspace" && this.line.selectionStart === 0 && this.props.lnum!== 0) { //delete a line
            this.props.deleteLine(this.props.lnum)
        }
    }

    //called every time a componenet is mounted
    componentDidMount() {
        //checks if the cursor should be on this specific line
        if (this.props.curCursor === this.props.lnum) {
            this.line.focus();
        }
    }

    //called every time a component is updated
    componentDidUpdate () {
        //checks if the cursor should be on this specific line
        if (this.props.curCursor === this.props.lnum) {
            this.line.focus();
        }  
    }

    //called every time the line is focused
    handleFocus = () => {
        //this sends the caret to the end of the line
        setTimeout(() => this.line.setSelectionRange(this.line.value.length, this.line.value.length), 0) //Apparently not good practice, find a better sol
    }

    //returns a div with the badge containing the line number and the line 
    render() { 
        return( 
            <div>
                <Badge bg='dark' style={this.badgeStyle} >{this.props.lnum+1}</Badge>
                <input onFocus={this.handleFocus} onMouseDown={() => this.props.mouseDown(this.props.lnum)} onMouseUp={() => this.props.mouseUp(this.props.lnum)} ref={(input) => { this.line = input }} style={this.lineStyle} value={this.props.content} onKeyDown={this.handleKeyDown} onChange={(e) => this.props.change(e, this.props.lnum)} />
            </div>
        );
    }
}
 
export default Line;