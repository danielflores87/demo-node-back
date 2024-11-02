import { FaRegSave, FaRegUser } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { PageComponent } from "../../componets/content";
import React, { useState } from "react";
import useYupValidationResolver from "../../hooks/form-validator.hook";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormComponent } from "../../componets/form";
import { EResponseCodes } from "../../helpers/api-response";
import ModalMessageComponent, {
  IMessage,
} from "../../componets/modal-message.component";
import { useUserService } from "../../hooks/user-service.hook";
import { IUserForm } from "../../interfaces/user.interfaces";

const formShema = yup.object({
  numberDocument: yup.number().required("Valor requerido."),
  name: yup.string().max(50).required("Valor requerido."),
  email: yup.string().email().max(50).required("Valor requerido."),
});

function UsersFormComponent(): React.ReactElement {
  //Servicios
  const { createUser } = useUserService();
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(formShema);
  const form = useForm<IUserForm>({ resolver });

  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<IMessage | null>(null);

  // Metodo que genera el submit del formulario
  const onSubmitForm = form.handleSubmit(async (data) => {
    setLoading(true);

    const res = await createUser(data);

    setMessage({
      type: res.operation.code,
      title: `Crear Usuario`,
      description: res.operation.message,
      onOk() {
        setMessage(null);
        if (res.operation.code == EResponseCodes.OK) navigate("/users");
      },
    });

    setLoading(false);
  });

  return (
    <>
      <PageComponent.ContentCard>
        <FormComponent id="userForm" onSubmit={onSubmitForm}>
          <PageComponent.GridCard>
            <FormComponent.Input
              idInput={"numberDocument"}
              typeInput={"number"}
              register={form.register}
              label={"Numero de Documento *"}
              disabled={loading}
              errors={form.formState.errors}
            />

            <FormComponent.Input
              idInput={"name"}
              typeInput={"text"}
              register={form.register}
              label={"Nombre *"}
              max={50}
              disabled={loading}
              errors={form.formState.errors}
            />

            <FormComponent.Input
              idInput={"email"}
              typeInput={"text"}
              register={form.register}
              label={"Correo Electronico *"}
              disabled={loading}
              errors={form.formState.errors}
            />
          </PageComponent.GridCard>
        </FormComponent>

        <PageComponent.ButtonsCard>
          <FormComponent.Button
            value="Cancelar"
            type="button"
            buttonStyle="Secondary"
            icon={<ImCancelCircle />}
            disabled={loading}
            action={() => {
              form.reset();
              navigate("/users");
            }}
          />
          <FormComponent.Button
            buttonStyle="Primary"
            form="userForm"
            value="Guardar"
            type="submit"
            disabled={loading}
            loading={loading}
            icon={<FaRegSave />}
          />
        </PageComponent.ButtonsCard>
      </PageComponent.ContentCard>
      <ModalMessageComponent
        message={message}
        clearMessage={() => setMessage(null)}
      />
    </>
  );
}

function CreateUserPage(): React.ReactElement {
  return (
    <PageComponent>
      <PageComponent.ContentCard title="Crear Usuario" icon={<FaRegUser />}>
        <UsersFormComponent />
      </PageComponent.ContentCard>
    </PageComponent>
  );
}

export default React.memo(CreateUserPage);
