import React from "react";
import { Badge } from "reactstrap";
import { useFormatMessage } from "../i18n/i18n.service";

export function Footer() {
  const l10n = useFormatMessage();
  return (
    <section className="mt-auto p-4 text-center bg-light">
      <Badge tag="a" color="warning" href="https://c19.md" target="_blank" rel="noopener noreferrer" className="mr-2">
        c19.md
      </Badge>
      Instrument open-source în contextul pandemiei Covid-19 realizat cu ❤ de Moldoveni p-tru Moldoveni. Cod sursa{" "}
      <Badge
        tag="a"
        color="info"
        href="https://github.com/AlexanderC/DiseaseControl"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-1"
      >
        &lt; aici /&gt;
      </Badge>{" "}
      si{" "}
      <Badge
        tag="a"
        color="info"
        href="https://github.com/AlexanderC/DiseaseControl-SPA"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-1"
      >
        &lt; aici /&gt;
      </Badge>
    </section>
  );
}
