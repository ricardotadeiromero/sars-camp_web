import { Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface PageTitleProps {
  title: string;
  variant: Variant;
}
export default function PageTitle({ title,variant }: PageTitleProps) {

  return (
      <Typography variant={variant}>{title}</Typography>
  );
}
