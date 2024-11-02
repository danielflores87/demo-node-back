import { PageComponent } from "../../componets/content";
import React from "react";
import { GrDocumentUser } from "react-icons/gr";
import UserTaskFormComponet from "./componets/user-task-form.componet";
import { useParams } from "react-router-dom";

function EditTaskPage() {
  const { id } = useParams();

  return (
    <PageComponent>
      <PageComponent.ContentCard title="Editar Tarea" icon={<GrDocumentUser />}>
        <UserTaskFormComponet type="Edit" id={Number(id)} />
      </PageComponent.ContentCard>
    </PageComponent>
  );
}

export default React.memo(EditTaskPage);
