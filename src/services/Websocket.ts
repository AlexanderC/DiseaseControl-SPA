const openConnections: any = {};

const ws = (
  url: string,
  open: any,
  close: any,
  dispatch: any,
  multiple = false
) => {
  if (!window.WebSocket) {
    return null;
  }

  const uri = `${process.env.REACT_APP_API_URL}/${url}`
    .replace(/\/+/g, "/")
    .replace(/^http(s?:\/)/, "ws$1/");

  // close open connections to this uri
  if (!multiple && openConnections[url]) {
    openConnections[uri].close();
    delete openConnections[uri];
  }

  return new Promise((resolve, reject) => {
    let error = false;
    const socket = new WebSocket(uri);

    if (!multiple) {
      openConnections[uri] = socket;
    }

    const ws = {
      send: (data: any) => socket.send(JSON.stringify(data)),
      close: () => {
        delete openConnections[uri];
        socket.close();
        resolve();
      },
    };

    // fail on connection error
    socket.addEventListener("error", (error) => {
      delete openConnections[uri];
      reject(error);
    });

    // call on socket open
    socket.addEventListener("open", () => open(ws));

    // handle data
    socket.addEventListener("message", function (event) {
      let data = null;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        // failed to parse JSON
        console.warn("Failed to decode WS frame", event.data);
        return;
      }

      // data received
      if (!data.error) {
        return dispatch(data);
      }

      // error occured
      error = true;
      delete openConnections[uri];
      socket.close();
      reject(data);
    });

    // handle close on no error
    socket.addEventListener("close", () => {
      if (error) {
        return;
      }

      delete openConnections[uri];
      close();
      resolve();
    });
  });
};

export default ws;
