import { FaRegSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { PageComponent } from "../../../componets/content";
import React, { useEffect, useState } from "react";
import useYupValidationResolver from "../../../hooks/form-validator.hook";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormComponent } from "../../../componets/form";
import { ApiResponse, EResponseCodes } from "../../../helpers/api-response";
import ModalMessageComponent, {
  IMessage,
} from "../../../componets/modal-message.component";
import { useUserService } from "../../../hooks/user-service.hook";
import { useUserTaskService } from "../../../hooks/user-task-service.hook";
import { IUser } from "../../../interfaces/user.interfaces";
import { IUserTask, IUserTaskForm } from "../../../interfaces/task.interfaces";

const formShema = yup.object({
  dateOfExecution: yup.string().required("Valor requerido."),
  description: yup.string().required("Valor requerido."),
  userId: yup.number().required("Valor requerido."),
});

function UserTaskFormComponent(props: {
  type: "Create" | "Edit";
  id?: number;
}): React.ReactElement {
  //Servicios
  const { createUserTask, updateUserTask, getUserTaskById } =
    useUserTaskService();
  const { getAllUsers } = useUserService();
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(formShema);
  const form = useForm<IUserTaskForm>({ resolver });

  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<IMessage | null>(null);
  const [userList, setUserList] = useState<IUser[]>([]);

  // Effect que carga los datos a editar
  useEffect(() => {
    if (props.id)
      getUserTaskById(props.id).then((res) => {
        if (res.operation.code == EResponseCodes.OK)
          form.reset({
            dateOfExecution: res.data.dateOfExecution,
            userId: res.data.userId,
            description: res.data.description,
          });
      });
  }, [props.id]);

  // Effect que carga los listados
  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.operation.code == EResponseCodes.OK) {
        setUserList(res.data);
      }
    });
  }, []);

  // Metodo que genera el submit del formulario
  const onSubmitForm = form.handleSubmit(async (data) => {
    setLoading(true);
    let res: ApiResponse<IUserTask>;
    if (props.type == "Edit") {
      res = await updateUserTask(data, props.id!);
    } else {
      res = await createUserTask(data);
    }

    setMessage({
      type: res.operation.code,
      title: `Tarea de Usuario`,
      description: res.operation.message,
      onOk() {
        setMessage(null);
        if (res.operation.code == EResponseCodes.OK) navigate("/tasks");
      },
    });

    setLoading(false);
  });

  if (
    props.type === "Edit" &&
    !form.getValues("userId") &&
    userList.length == 0
  ) {
    <h3>Cargando datos ...</h3>;
  }

  return (
    <>
      <PageComponent.ContentCard>
        <FormComponent id="taskForm" onSubmit={onSubmitForm}>
          <PageComponent.GridCard>
            <FormComponent.Select
              idSelect="userId"
              register={form.register}
              defaultValue="Seleccione..."
              label="Usuario *"
              options={userList.map((e) => {
                return { value: e.id, label: e.name };
              })}
              disabled={loading}
              errors={form.formState.errors}
            />

            <FormComponent.Input
              idInput={"dateOfExecution"}
              typeInput={"date"}
              register={form.register}
              label={"Fecha de Ejecucion *"}
              disabled={loading}
              errors={form.formState.errors}
            />

            <FormComponent.Input
              idInput={"description"}
              typeInput={"text"}
              register={form.register}
              label={"Descripción *"}
              max={50}
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
              navigate("/tasks");
            }}
          />
          <FormComponent.Button
            buttonStyle="Primary"
            form="taskForm"
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

export default React.memo(UserTaskFormComponent);
