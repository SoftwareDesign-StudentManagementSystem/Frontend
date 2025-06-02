import "intersection-observer";
import ReactDOM from "react-dom/client";
import App from "./App";
import CommonStyles, {
  DatePickerOverride,
} from "./resources/styles/CommonStyles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <DatePickerOverride />

    <CommonStyles />
    <App />
  </>,
);
