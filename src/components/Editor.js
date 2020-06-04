import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify'; 

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>';
}

DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if ('target' in node) {
      node.setAttribute('target', '_blank');
    }
    if (
      !node.hasAttribute('target') &&
      (node.hasAttribute('xlink:href') || node.hasAttribute('href'))
    ) {
      node.setAttribute('xlink:show', 'new');
    }
});

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
                        + "[GitHub Repo](https://github.com/betich/markdown-previewer \"GitHub Repo\")\r\n\n"
                        + "\n----\n![Random Image](https://images.pexels.com/photos/4321944/pexels-photo-4321944.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260 \"Random Image\")\r\n\n"
                        + "## Markdown quick reference\r\n\n"
                        + "*emphasis*\r\r\n"
                        + "**strong**\r\r\n"
                        + "# heading 1\r\n\n"
                        + "## heading 2\r\n\n"
                        + "### heading 3\r\n\n"
                        + "#### heading 4\r\n\n"
                        + "##### heading 5\r\n\n"
                        + "###### heading 6\r\n\n"
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
                <Preview html={DOMPurify.sanitize(
                    marked(this.state.input, { renderer: renderer, breaks: true})
                )} />
            </div>
        );
    }
}

export default MarkdownPanels;