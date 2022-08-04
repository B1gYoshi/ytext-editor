import React, { Component } from 'react';
import { Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts.css';
import './lines.css';

class Line extends Component {

    lineStyle = {
        fontFamily: "Gentium Book Plus",
        color:'white',
        border: '0px',
        backgroundColor: '#A4BE5C',
        width: '98%',
    }

    buttonStyle = {
        width: '2%',
    }        

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.props.newLine(this.props.lnum, this.line.selectionStart)
        } else if (e.key === "ArrowUp") {
            this.props.upLine(this.props.curCursor)
        } else if (e.key === "ArrowDown") {
            this.props.downLine(this.props.curCursor)
        } else if (e.key === "Tab") {
            e.preventDefault()
            let start = this.line.selectionStart
            this.props.tab(this.props.lnum, start)
            setTimeout(() => this.line.setSelectionRange(start +4, start+4), 0)
        } else if (e.key === "Backspace" && this.line.selectionStart === 0 && this.props.lnum!== 0) {
            this.props.deleteLine(this.props.lnum)
        }
    }

    componentDidMount() {
        if (this.props.curCursor === this.props.lnum) {
            this.line.focus();
        }
    }

    componentDidUpdate () {
        if (this.props.curCursor === this.props.lnum) {
            this.line.focus();
        }  
    }

    handleFocus = () => {
        setTimeout(() => this.line.setSelectionRange(this.line.value.length, this.line.value.length), 0) //Apparently not good practice, find a better sol
    }

    render() { 
        return( 
            <div>
                <Badge bg='dark' style={this.buttonStyle} >{this.props.lnum+1}</Badge>
                <input className='line' onFocus={this.handleFocus} onMouseDown={() => this.props.mouseDown(this.props.lnum)} onMouseUp={() => this.props.mouseUp(this.props.lnum)} ref={(input) => { this.line = input }} style={this.lineStyle} value={this.props.content} onKeyDown={this.handleKeyDown} onChange={(e) => this.props.change(e, this.props.lnum)} />
            </div>
        );
    }
}
 
export default Line;