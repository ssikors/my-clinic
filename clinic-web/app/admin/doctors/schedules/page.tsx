"use client";

import { Wrapper } from "@/app/components/layout/Wrapper";
import { Schedules } from "@/app/components/admin/Schedules";

export default function Page() {
  return (
    <Wrapper role="admin">
      <Schedules />
    </Wrapper>
  );
}
