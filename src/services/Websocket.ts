let openConnections: any = {};

const wsCloseAll = () => {
  Object.values(openConnections).forEach(
    (socket: any) => socket && socket._close()
  );
};

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
  if (!multiple && openConnections[uri]) {
    openConnections[uri]._close();
  }

  return new Promise((resolve, reject) => {
    let skipClose = false;
    const socket = new WebSocket(uri);

    const ws = {
      send: (data: any) => socket.send(JSON.stringify(data)),
      close: () => {
        delete openConnections[uri];
        socket.close();
        resolve();
      },
      _close() {
        skipClose = true;
        delete openConnections[uri];
        socket.close();
      },
    };

    if (!multiple) {
      openConnections[uri] = ws;
    }

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
      skipClose = true;
      delete openConnections[uri];
      socket.close();
      reject(data);
    });

    // handle close on no error
    socket.addEventListener("close", () => {
      if (skipClose) {
        return;
      }

      delete openConnections[uri];
      close();
      resolve();
    });
  });
};

export { ws, wsCloseAll };
