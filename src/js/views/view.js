//             MAIN VIEW CLASS
import icons from "url:../../images/Spinner-icon.svg"

export default class View {
  _data;
  // _errorCheck;
  _generalOverlayEle = document.querySelector(".hours__overlay");
  _errMsgContainer = document.querySelector(".error__msg--wrap");
  _errMsgtext = document.querySelector(".error__msg--text");
  _errExitIcon = document.querySelector(".exit__icon--errmsg");

  constructor() {
    // super();
    this.exitErrorMsg();
  }

  overlay() {
    this._generalOverlayEle.classList.toggle("hours__overlay--active");
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  formatOrdinalDate(d) {
    return (
      d +
      (31 == d || 21 == d || 1 == d
        ? "st"
        : 22 == d || 2 == d
        ? "nd"
        : 23 == d || 3 == d
        ? "rd"
        : "th")
    );
  }

  gettingDate(uni) {
    const date = new Date(uni * 1000);
    // console.log(date);
    const local = navigator.language;
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    const dateSplit = new Intl.DateTimeFormat(local, options)
      .format(date)
      .split(" ");
    // console.log(dateSplit);
    return dateSplit;
  }

  uppserCaseDescription(descrip) {
    const str = descrip.split(" ");
    const finalDescrip = str
      .map((word) => {
        const upper = word[0].toUpperCase();
        return upper.concat(word.slice(1));
      })
      .join(" ");
    return finalDescrip;
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  // ERROR METHODS
  _removeExitIcon() {
    this._errMsgContainer.classList.remove("error__msg--active");
  }
  renderErrorMsg(message = this._errorMessage) {
    const errorMarkup = `<p>${message}</p>`;
    this._errMsgtext.innerHTML = "";
    this._errMsgtext.insertAdjacentHTML("afterbegin", errorMarkup);
    this._errMsgContainer.classList.add("error__msg--active");
  }
  exitErrorMsg() {
    this._errExitIcon.addEventListener(
      "click",
      this._removeExitIcon.bind(this)
    );
  }
}
