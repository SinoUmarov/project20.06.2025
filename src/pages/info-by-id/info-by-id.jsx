import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setTodo } from "../../store/reducers/info-by-id/info-by-id";
import { axiosGet } from "../../utils/myaxios";
import { useEffect } from "react";

import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Chip,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InfoById() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { todo } = useSelector((state) => state.info);

  async function fetchInfoById() {
    try {
      let { data } = await axiosGet.get(`/api/to-dos/${id}`);
      dispatch(setTodo(data.data));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load todo information");
    }
  }

  useEffect(() => {
    fetchInfoById();
  }, [id]);

  return (
    <Container sx={{ mt: 5 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Go Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Todo Details (ID: {id})
      </Typography>

      {todo?.id ? (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <strong>Name:</strong> {todo.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Description:</strong> {todo.description}
          </Typography>
          <Chip
            label={todo.isCompleted ? "Active" : "Inactive"}
            color={todo.isCompleted ? "success" : "error"}
          />

          {todo.images?.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Images:
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {todo.images.map((img) => (
                  <img
                    key={img.id}
                    src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                    alt={img.imageName}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No data found for this ID.
        </Typography>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}
