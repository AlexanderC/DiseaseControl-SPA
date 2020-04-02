import React, { FunctionComponent } from "react";
import { Button } from "reactstrap";
import { useFormatMessage } from "../../i18n/i18n.service";

type ConfirmationProps = {
  onAccept: any;
  onDecline: any;
};

export const Confirmation: FunctionComponent<ConfirmationProps> = (props) => {
  const l10n = useFormatMessage();

  return (
    <div className="text-center py-4">
      <Button color="primary" className="w-25 mr-4" onClick={props.onAccept}>
        {l10n("confirm.yes")}
      </Button>
      <Button color="danger" className="w-25" onClick={props.onDecline}>
        {l10n("confirm.no")}
      </Button>
    </div>
  );
};
