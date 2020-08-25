import React from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
      query: "",
    };
  }
  printpdf(e) {
    const doc = new jsPDF();
    let str = "";
    for (let i = 0; i < e.target.id.length; i++) {
      if (i % 72 === 0 && i !== 0) {
        str += `\n`;
      } else {
        str += e.target.id[i];
      }
    }
    doc.text(str, 10, 10);
    doc.save("e-mailTrigger.pdf");
  }
  async componentWillMount() {
    let data = await axios.post("/list", { query: "" });
    this.setState({ messages: data.data.threads });
  }
  search = (e) => {
    this.setState({ query: e.target.value });
  };
  searchEmails = async (e) => {
    e.preventDefault();
    let data = await axios.post("/list", { query: this.state.query });
    this.setState({ messages: data.data.threads });
  };
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand">E-mail Trigger</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={this.search}
            />
            <button onClick={this.searchEmails.bind(this)}>Search</button>
          </form>
        </nav>
        {this.state.messages ? (
          this.state.messages.map((element, index) => {
            return (
              <div>
                <p>{element.snippet}</p>
                <button id={element.snippet} onClick={this.printpdf.bind(this)}>
                  PDF
                </button>
                <hr />
              </div>
            );
          })
        ) : (
          <p>Loading Emails ..</p>
        )}
      </div>
    );
  }
}
export default Email;
