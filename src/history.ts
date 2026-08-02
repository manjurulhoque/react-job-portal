import { UNSAFE_createBrowserHistory } from "react-router";

// v5Compat: true is required so that history.push()/replace() notify the
// HistoryRouter's listener. Without it, the URL changes but the router state
// never updates and the page does not re-render.
const history = UNSAFE_createBrowserHistory({ v5Compat: true });

export default history;
