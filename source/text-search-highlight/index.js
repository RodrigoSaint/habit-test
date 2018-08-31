import React from "react";

export default class TextSearchHighlight extends React.Component {
  render() {
    if (!this.props.search) return <p>{this.props.text}</p>;
    const pattern = new RegExp(`(${this.props.search})`, "gi");
    const splitedText = this.props.text.split(pattern);
    return (
      <p>
        {splitedText.map(
          (text, index) =>
            text.toLowerCase() != this.props.search.toLowerCase() ? (
              <span key={text + index}>{text}</span>
            ) : (
              <span key={text + index} className="text-highlight">
                {text}
              </span>
            )
        )}
      </p>
    );
  }
}
