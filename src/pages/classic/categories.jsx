import { useDispatch, useSelector } from "react-redux";
import { axiosGet } from "../../utils/myaxios";
import { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  setName,
  setTodo,
  setEditName,
  setIdx,
  setInfo,
  setModal,
  setLoading,
  setError,
} from "../../store/reducers/cotegories/categories";
import {
  Button,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Categories() {
  const dispatch = useDispatch();
  const { todo, name, editName, idx, info, modal, loading, error } = useSelector(
    (state) => state.categories
  );

  const handleToast = (message, type) => {
    if (type === "error") {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  async function getCategores() {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosGet.get(`/api/categories`);
      dispatch(setTodo(data.data));
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error fetching categories", "error");
    }
  }

  async function handleDelete(id) {
    dispatch(setLoading(true));
    try {
      await axiosGet.delete(`/api/categories?id=${id}`);
      dispatch(setLoading(false));
      getCategores();
      handleToast("Category deleted successfully", "success");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error deleting category", "error");
    }
  }

  async function handleAdd() {
    dispatch(setLoading(true));
    const newCategory = { name };
    try {
      await axiosGet.post(`/api/categories`, newCategory);
      dispatch(setLoading(false));
      getCategores();
      dispatch(setName(""));
      handleToast("Category added successfully", "success");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error adding category", "error");
    }
  }

  function editUser(el) {
    dispatch(setEditName(el.name));
    dispatch(setIdx(el.id));
  }

  async function handleEdit() {
    dispatch(setLoading(true));
    const updatedCategory = {
      id: idx,
      name: editName,
    };

    try {
      await axiosGet.put(`/api/categories`, updatedCategory);
      dispatch(setLoading(false));
      getCategores();
      dispatch(setEditName(""));
      dispatch(setIdx(null));
      handleToast("Category updated successfully", "success");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error editing category", "error");
    }
  }

  async function handleInfo(id) {
    dispatch(setLoading(true));
    dispatch(setModal(true));
    try {
      let { data } = await axiosGet.get(`/api/categories/${id}`);
      dispatch(setLoading(false));
      dispatch(setInfo(data.data));
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error fetching category info", "error");
    }
  }

  useEffect(() => {
    getCategores();
  }, []);

  return (
    <>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>JOTAIcategories</h1>

      {/* Add Category Section */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          variant="outlined"
          fullWidth
        />
        <Button
          onClick={handleAdd}
          variant="contained"
          sx={{ padding: "10px 20px", fontSize: "16px" }}
        >
          <AddBoxIcon/>
        </Button>
      </Box>

      {/* Edit Category Section */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField
          label="Edit Category Name"
          value={editName}
          onChange={(e) => dispatch(setEditName(e.target.value))}
          variant="outlined"
          fullWidth
        />
        <Button
          onClick={handleEdit}
          variant="contained"
          sx={{ padding: "10px 20px", fontSize: "16px" }}
        >
          <SaveAltIcon/>
        </Button>
      </Box>

      {/* Categories List */}
      <Box>
        {todo.length === 0 ? (
          <Typography variant="h6" color="gray" align="center">
            No categories available
          </Typography>
        ) : (
          todo.map((el) => (
            <Box
              key={el.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <Box>
                <Typography variant="body1">
                  <strong>ID:</strong> {el.id}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {el.name}
                </Typography>
              </Box>

              <Box>
                <Button
                  onClick={() => handleDelete(el.id)}
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ marginRight: 1 }}
                >
                  <DeleteIcon/>
                </Button>
                <Button
                  onClick={() => editUser(el)}
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ marginRight: 1 }}
                >
                  <EditIcon/>
                </Button>
                <Button
                  onClick={() => handleInfo(el.id)}
                  variant="outlined"
                  color="info"
                  size="small"
                >
                  <InfoOutlineIcon/>
                </Button>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Loading Spinner */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Typography variant="h5" color="error" align="center" sx={{ marginTop: 4 }}>
          Something went wrong. Please try again later.
        </Typography>
      )}

      {/* Info Dialog */}
      <Dialog open={modal} onClose={() => dispatch(setModal(false))}>
        <DialogTitle>Category Info</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>ID:</strong> {info?.id}
          </Typography>
          <Typography variant="body1">
            <strong>Name:</strong> {info?.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setModal(false))} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}
