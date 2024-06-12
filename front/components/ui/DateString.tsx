"use client";

import { Typography } from "@mui/material";
import React from "react";
import { todayFormatDate } from "@/utils/date";

function DateString({ id }: { id: string }) {
  const nowDate = todayFormatDate();
  return (
    <Typography
      sx={{ marginInlineStart: 15, fontWeight: 2, fontSize: 13 }}
      component={"h6"}
      id={id}
    >
      {nowDate}
    </Typography>
  );
}

export default DateString;
