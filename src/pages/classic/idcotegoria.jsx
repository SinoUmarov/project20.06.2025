import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosGet } from "../../utils/myaxios";
import { Box, CircularProgress, Typography, Paper, Divider } from "@mui/material";

export default function Idcotegoria() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  async function get() {
    try {
      let { data } = await axiosGet.get(`/api/to-dos/${id}`);
      setTodo(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    get();
  }, [id]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Page Info User By Id: {id}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : todo ? (
        <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            <strong>Name:</strong> {todo?.name}
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1">
            <strong>Description:</strong> {todo?.description}
          </Typography>
        </Paper>
      ) : (
        <Typography variant="h6" color="error" align="center">
          No data found for this ID.
        </Typography>
      )}
    </Box>
  );
}
