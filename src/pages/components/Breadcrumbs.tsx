import React from "react";
import {
  Link,
  Breadcrumbs as Materialbreadcrumbs,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface BreadcrumbsProps {
  path: {
    label: string;
    to?: string;
  }[];
}
export default function Breadcrumbs({ path }: BreadcrumbsProps) {
  return (
    <Materialbreadcrumbs arial-label="breadcrumb">
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        Fon
      </Link>
      {path.map((item, index) =>
        item.to ? (
          <Link
            key={`item-${index}`}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={item.to || "#"}
          >
            {item.label}
          </Link>
        ) : (
          <Typography key={`item-${index}`} color="text.primary">
            {item.label}
          </Typography>
        )
      )}
    </Materialbreadcrumbs>
  );
}
