import { PageComponent } from "../../componets/content";
import React from "react";
import { GrDocumentUser } from "react-icons/gr";
import UserTaskFormComponet from "./componets/user-task-form.componet";

function CreateTaskPage() {
  return (
    <PageComponent>
      <PageComponent.ContentCard title="Crear Tarea" icon={<GrDocumentUser />}>
        <UserTaskFormComponet type="Create" />
      </PageComponent.ContentCard>
    </PageComponent>
  );
}

export default React.memo(CreateTaskPage);
