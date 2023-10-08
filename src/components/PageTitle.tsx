import { Typography } from "@mui/material"

interface PageTitleProps{
    title: String
}
export default function PageTitle({title}:PageTitleProps) {
  return (
    <Typography variant="h4">
        {title}
    </Typography>
  )
}
