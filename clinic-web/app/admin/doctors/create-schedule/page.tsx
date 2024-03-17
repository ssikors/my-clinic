"use client";

import { ScheduleForm } from "@/app/components/admin/ScheduleForm";
import { Wrapper } from "@/app/components/layout/Wrapper";

export default function Page() {
  return (
    <Wrapper role="admin">
      <ScheduleForm />
    </Wrapper>
  );
}
