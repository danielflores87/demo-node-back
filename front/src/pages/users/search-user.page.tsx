import { useNavigate } from "react-router-dom";
import { PageComponent } from "../../componets/content";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FormComponent } from "../../componets/form";
import { IoSearch } from "react-icons/io5";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../hooks/form-validator.hook";
import * as yup from "yup";
import { Table } from "antd";
import { useUserService } from "../../hooks/user-service.hook";
import { EResponseCodes } from "../../helpers/api-response";
import ModalMessageComponent, {
  IMessage,
} from "../../componets/modal-message.component";
import { ButtonComponent } from "../../componets/button.component";
import { IUserFilter, IUser } from "../../interfaces/user.interfaces";

const formShema = yup.object({
  name: yup.string().optional(),
  email: yup.string().optional(),
});

function SearchUserPage() {
  // Servicios
  const { getPaginatedUsers, deleteUser } = useUserService();
  const navigate = useNavigate();
  const form = useForm<IUserFilter>({
    resolver: useYupValidationResolver(formShema),
  });

  const pageSize = 5;

  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [message, setMessage] = useState<IMessage | null>(null);

  // Metodo que se comunica con la api
  async function onSearch(
    page: number,
    perPage: number,
    data: IUserFilter
  ): Promise<void> {
    setLoading(true);
    const res = await getPaginatedUsers({
      ...data,
      page: page,
      perPage: perPage,
    });

    if (res.operation.code === EResponseCodes.OK) {
      setUserList(res.data);
      setTotal(res.total ?? 0);
    } else {
      setMessage({
        type: res.operation.code,
        title: `Consultar Usuarios`,
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
  async function confirmDelete(id: number): Promise<void> {
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
        deleteUser(id).then((res) => {
          if (res.operation.code == EResponseCodes.OK) {
            const values = form.getValues();
            onSearch(1, pageSize, values);
          } else {
            setMessage({
              type: res.operation.code,
              title: `Eliminar Usuario`,
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
          title="Consultar Usuarios"
          headOptions={
            <ButtonComponent
              value="Crear Usuario"
              buttonStyle="Tetriary"
              icon={<IoIosAddCircleOutline />}
              action={() => navigate("/users/create")}
              disabled={loading}
            />
          }
        >
          <PageComponent.ContentCard>
            <FormComponent onSubmit={onSubmitSearch}>
              <PageComponent.GridCard>
                <FormComponent.Input
                  idInput={"name"}
                  typeInput={"text"}
                  register={form.register}
                  label={"Nombre"}
                  errors={form.formState.errors}
                  disabled={loading}
                />

                <FormComponent.Input
                  idInput={"email"}
                  typeInput={"email"}
                  register={form.register}
                  label={"Correo Electronico"}
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
              { title: "Codigo", dataIndex: "id", key: "id" },
              { title: "Numero Documento", dataIndex: "numberDocument", key: "numberDocument" },
              { title: "Nombre", dataIndex: "name", key: "name" },
              { title: "Correo", dataIndex: "email", key: "email" },
              {
                title: "Acciones",
                dataIndex: "id",
                key: "index",
                render: (_, record) => (
                  <ButtonComponent
                    value="Eliminar"
                    buttonStyle="Tetriary"
                    action={() => confirmDelete(record.id)}
                  />
                ),
              },
            ]}
            dataSource={userList.map((i) => {
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

export default React.memo(SearchUserPage);
