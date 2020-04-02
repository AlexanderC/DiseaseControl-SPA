import React, { FunctionComponent, useState } from "react";
import { Button } from "reactstrap";
import { ItemFormModal } from "../../modals/ItemFormModal";
import axiosInstance from "../../services/Axios";
import { getCurrentUser } from "../../actions/DataActions";
import { useFormatMessage } from "../../i18n/i18n.service";

type AddHospitalProps = {
  onUpdate: () => any;
};

export const AddHospital: FunctionComponent<AddHospitalProps> = (props) => {
  const [blankItem, setBlankItem] = useState<any>(null);
  const user = getCurrentUser();

  const onSubmit = async (newHospital: any) => {
    await axiosInstance.post("/admin/hospital?token=" + user.token, newHospital);
    setBlankItem(null);
    props.onUpdate();
  };

  const l10n = useFormatMessage();

  return (
    <>
      <ItemFormModal
        item={blankItem}
        blankTitle={l10n("hospital.addNew")}
        onClose={() => setBlankItem(null)}
        onSubmit={onSubmit}
      />
      <Button color="primary" onClick={() => setBlankItem({ name: "", description: "" })}>
        {l10n("hospital.addNew")}
      </Button>
    </>
  );
};
