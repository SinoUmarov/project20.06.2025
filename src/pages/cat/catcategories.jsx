import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setName,
  setTodo,
  setEditName,
  setIdx,
  setInfo,
  setModal,
  setLoading,
  setError,
} from "../../store/reducers/catcategories/catcategories";
import { axiosGet } from "../../utils/myaxios";

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Add, Edit, Delete, Info } from "@mui/icons-material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Categories() {
  const dispatch = useDispatch();
  const { todo, name, editName, idx, info, modal, loading, error } = useSelector(
    (state) => state.catcategories
  );

  const fetchCategories = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosGet.get("/api/categories");
      dispatch(setTodo(data.data));
    } catch (error) {
      console.error(error)
      dispatch(setError(true));
      toast.error("eror update");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;
    dispatch(setLoading(true));
    try {
      await axiosGet.post("/api/categories", { name });
      dispatch(setName(""));
      fetchCategories();
      toast.success("add categories");
    } catch (error) {
      console.error(error)
      dispatch(setError(true));
      toast.error("eror add");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEdit = async () => {
    if (!editName.trim()) return;
    dispatch(setLoading(true));
    try {
      await axiosGet.put("/api/categories", { id: idx, name: editName });
      dispatch(setEditName(""));
      dispatch(setIdx(null));
      fetchCategories();
      toast.info("update categories");
    } catch (error) {
        console.error(error)
      dispatch(setError(true));
      toast.error("eror update");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async (id) => {
    dispatch(setLoading(true));
    try {
      await axiosGet.delete(`/api/categories?id=${id}`);
      fetchCategories();
      toast.warn("delete categories");
    } catch (error) {
        console.error(error)
      dispatch(setError(true));
      toast.error("eror delete");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInfo = async (id) => {
    dispatch(setModal(true));
    dispatch(setLoading(true));
    try {
      const { data } = await axiosGet.get(`/api/categories/${id}`);
      dispatch(setInfo(data.data));
    } catch (error) {
        console.error(error)
      dispatch(setError(true));
      toast.error("eror data");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    < >
    
      <Box sx={{ p: 4 }} >
        <Typography variant="h4" gutterBottom color="primary">
        page create async-thunk-categories
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>Добавить категорию</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <TextField
              label="new categories"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              fullWidth
            />
            <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
            +add
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>edit categories</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <TextField
              label="name categories"
              value={editName}
              onChange={(e) => dispatch(setEditName(e.target.value))}
              fullWidth
            />
            <Button variant="outlined" startIcon={<Edit />} onClick={handleEdit}>
              save
            </Button>
          </Stack>
        </Paper>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>name</strong></TableCell>
                <TableCell align="right"><strong>events</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todo.map((el) => (
                <TableRow key={el.id} hover>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.name}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="info">
                      <IconButton onClick={() => handleInfo(el.id)} color="primary">
                        <Info />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="edit">
                      <IconButton
                        onClick={() => {
                          dispatch(setEditName(el.name));
                          dispatch(setIdx(el.id));
                        }}
                        color="info"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="delete">
                      <IconButton onClick={() => handleDelete(el.id)} color="error">
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={modal} onClose={() => dispatch(setModal(false))}>
          <DialogTitle>info categories</DialogTitle>
          <DialogContent dividers>
            <Typography><strong>ID:</strong> {info?.id}</Typography>
            <Typography><strong>name:</strong> {info?.name}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(setModal(false))}>close</Button>
          </DialogActions>
        </Dialog>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 4 }}>
  eror data
          </Alert>
        )}
      </Box>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
