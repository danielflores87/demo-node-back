import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app.context";
import { PageComponent } from "../../componets/content";
import { ButtonComponent } from "../../componets/button.component";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FormComponent } from "../../componets/form";
import { IoSearch } from "react-icons/io5";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../hooks/form-validator.hook";
import * as yup from "yup";
import { Table } from "antd";
import { EResponseCodes } from "../../helpers/api-response";
import ModalMessageComponent, {
  IMessage,
} from "../../componets/modal-message.component";
import { useUserTaskService } from "../../hooks/user-task-service.hook";
import { IUserTask, IUserTaskFilter } from "../../interfaces/task.interfaces";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const formShema = yup.object({
  description: yup.string().optional(),
});

function SearchTaskPage() {
  // Servicios
  const { getPaginatedUserTasks, deleteUserTask } = useUserTaskService();
  const navigate = useNavigate();
  const form = useForm<IUserTaskFilter>({
    resolver: useYupValidationResolver(formShema),
  });

  const pageSize = 5;

  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [taskList, setTaskList] = useState<IUserTask[]>([]);
  const [message, setMessage] = useState<IMessage | null>(null);

  // Metodo que se comunica con la api
  async function onSearch(
    page: number,
    PerPage: number,
    data: IUserTaskFilter
  ) {
    setLoading(true);
    const res = await getPaginatedUserTasks({
      ...data,
      page: page,
      perPage: PerPage,
    });

    if (res.operation.code === EResponseCodes.OK) {
      setTaskList(res.data);
      setTotal(res.total ?? 0);
    } else {
      setMessage({
        type: res.operation.code,
        title: `Consultar Tarea`,
        description: res.operation.message,
        onOk() {
          setMessage(null);
        },
      });
    }

    setLoading(false);
  }

  // Metodo ejecuta la busqueda
  const onSubmitSearch = form.handleSubmit(async (data) => {
    await onSearch(1, pageSize, data);
  });

  // Metodo que verifica la eliminacion
  async function confirmDelete(id: number) {
    setMessage({
      type: EResponseCodes.ASK,
      title: "Esta seguro de eliminar este registro?",
      description: "Esta accion es irreversible",
      okTitle: `Si`,
      cancelTitle: "No",
      onCancel() {
        setMessage(null);
      },
      onOk() {
        deleteUserTask(id).then((res) => {
          if (res.operation.code == EResponseCodes.OK) {
            const values = form.getValues();
            onSearch(1, pageSize, values);
          } else {
            setMessage({
              type: res.operation.code,
              title: `Eliminar Tarea`,
              description: res.operation.message,
              onOk() {
                setMessage(null);
              },
            });
          }
        });
      },
    });
  }

  return (
    <>
      <PageComponent>
        <PageComponent.ContentCard
          title="Consultar Tareas"
          headOptions={
            <ButtonComponent
              value="Crear Tarea"
              buttonStyle="Tetriary"
              icon={<IoIosAddCircleOutline />}
              action={() => navigate("/tasks/create")}
              disabled={loading}
            />
          }
        >
          <PageComponent.ContentCard>
            <FormComponent onSubmit={onSubmitSearch}>
              <PageComponent.GridCard>
                <FormComponent.Input
                  idInput={"description"}
                  typeInput={"text"}
                  register={form.register}
                  label={"Descripción"}
                  errors={form.formState.errors}
                  disabled={loading}
                />
              </PageComponent.GridCard>
              <PageComponent.ButtonsCard>
                <FormComponent.Button
                  icon={<IoSearch />}
                  buttonStyle="Primary"
                  value={"Buscar"}
                  type="submit"
                  loading={loading}
                />
              </PageComponent.ButtonsCard>
            </FormComponent>
          </PageComponent.ContentCard>
        </PageComponent.ContentCard>

        <PageComponent.ContentCard>
          <Table
            columns={[
              {
                title: "Usuario",
                dataIndex: "userId",
                key: "userId",
              },
              {
                title: "Descripcion",
                dataIndex: "description",
                key: "description",
              },
              {
                title: "Fecha Ejecucion",
                dataIndex: "dateOfExecution",
                key: "dateOfExecution",
              },
              {
                title: "Acciones",
                dataIndex: "id",
                key: "index",
                width: 220,
                render: (_, record) => (
                  <div className="flex justify-between gap-1 w-56">
                    <ButtonComponent
                      icon={<FaEdit />}
                      value="Editar"
                      buttonStyle="Tetriary"
                      action={() => navigate(`/tasks/edit/${record.id}`)}
                    />

                    <ButtonComponent
                      icon={<FaDeleteLeft />}
                      value="Eliminar"
                      buttonStyle="Tetriary"
                      action={() => confirmDelete(record.id)}
                    />
                  </div>
                ),
              },
            ]}
            dataSource={taskList.map((i) => {
              return { ...i, key: i.id };
            })}
            pagination={{
              total: total,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                const values = form.getValues();
                onSearch(page, pageSize, values);
              },
            }}
          />
        </PageComponent.ContentCard>
      </PageComponent>
      <ModalMessageComponent
        message={message}
        clearMessage={() => setMessage(null)}
      />
    </>
  );
}

export default React.memo(SearchTaskPage);
