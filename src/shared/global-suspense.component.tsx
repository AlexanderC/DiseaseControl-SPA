import React, { PropsWithChildren } from "react";

const suspenseFallback = (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{ height: "100vh" }}
  >
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export function GlobalSuspense(props: PropsWithChildren<{}>) {
  return (
    <React.Suspense fallback={suspenseFallback}>
      {props.children}
    </React.Suspense>
  );
}
