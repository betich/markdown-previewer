import React from 'react';
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
}

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="sidecontainer">
                <div className="topbar">
                    <label htmlFor="preview">Preview</label>
                </div>
                <div id="preview-container">
                    <div id="preview" dangerouslySetInnerHTML={{__html: this.props.html}}></div>
                </div>
            </div>
        );
    }
}

class MarkdownPanels extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        let placeholder = "# Markdown Previewer\r\n\n" 
                        + "[My GitHub](https://www.github.com/betich \"My GitHub\")\r\n\n"
                        + "![Random Image](https://images.pexels.com/photos/4321944/pexels-photo-4321944.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260 \"Random Image\")"
                        + "\n----\n## Markdown quick reference\r\n\n"
                        + "# headers\r\n\n"
                        + "*emphasis*\r\r\n"
                        + "**strong**\r\r\n"
                        + "* list\n* list\r\n\n1. list\n2. list\r\n\n"
                        + ">blockquote\r\r\n"
                        + "```\nfor var(i=0; i<10; i++) {\r\n"
                        + "\tconsole.log(i);\r\n"
                        + "}\n```\r\n\n"
                        + "Inline `code` (backticks)\r\n\n"
                        + "[links](https://wikipedia.org)";
        this.state = {
            input: placeholder
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    render() {
        return(
            <div>
                <div className="sidecontainer">
                    <div className="topbar">
                        <label htmlFor="editor">Markdown</label>
                    </div>
                    <textarea id="editor" value={this.state.input} onChange={this.handleChange} placeholder="Markdown Input"></textarea>
                </div>
                <Preview html={marked(this.state.input, { renderer: renderer, breaks: true})} />
            </div>
        );
    }
}

export default MarkdownPanels;