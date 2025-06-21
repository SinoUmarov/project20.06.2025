import { useDispatch, useSelector } from "react-redux";
import { axiosGet } from "../../utils/myaxios";
import { useEffect } from "react";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";

import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  setTodo,
  setName,
  setDescription,
  setEditName,
  setEditDesc,
  setIdx,
  setLoading,
  setError,
  setModal,
  setInfo,
  setimgid,
  setImg,
  setImgImage,
  setmodaladd,
} from "../../store/reducers/cattodo/cattodo";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Snackbar,
  CircularProgress,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Todo() {
  const dispatch = useDispatch();
  const {
    todo,
    name,
    modaladd,
    description,
    editName,
    editDesc,
    idx,
    imgid,
    loading,
    error,
    modal,
    info,
    img,
  } = useSelector((state) => state.cattodo);

  const handleToast = (message, type) => {
    if (type === "error") {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  async function getTodo() {
    dispatch(setLoading(true));
    try {
      let { data } = await axiosGet.get(`/api/to-dos`);
      dispatch(setTodo(data.data));
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error fetching todos", "error");
    }
  }

  async function handleDelete(id) {
    dispatch(setLoading(true));
    try {
      await axiosGet.delete(`/api/to-dos?id=${id}`);
      getTodo();
      dispatch(setLoading(false));
      dispatch(setError(false));
      handleToast("Todo deleted successfully", "success");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error deleting todo", "error");
    }
  }

  function handleAddImage(el) {
    dispatch(setmodaladd(true));
    dispatch(setimgid(el.id));
  }

  async function addIMAGE(e) {
    e.preventDefault();
    const formData = new FormData();
    let images = e.target["Images"].files;
    for (let i = 0; i < images.length; i++) {
      formData.append("Images", images[i]);
    }

    try {
      const res = await axiosGet.post(`/api/to-dos/${imgid}/images`, formData);
      getTodo();
      dispatch(setImgImage(null));
      dispatch(setmodaladd(false));
      dispatch(setimgid(null));
      handleToast("Image added successfully", "success");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      handleToast("Error adding image", "error");
    }
  }

  async function handleAdd() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("images", img);
    dispatch(setLoading(true));

    try {
      await axiosGet.post(`/api/to-dos`, formData);
      getTodo();
      dispatch(setLoading(false));
      dispatch(setError(false));
      dispatch(setDescription(""));
      dispatch(setName(""));
      dispatch(setImg(null));
      handleToast("Todo added successfully", "success");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error adding todo", "error");
    }
  }

  async function handleCheck(id) {
    dispatch(setLoading(true));
    try {
      await axiosGet.put(`/completed?id=${id}`);
      getTodo();
      dispatch(setLoading(false));
      dispatch(setError(false));
      handleToast("Todo marked as completed", "success");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error updating todo", "error");
    }
  }

  function handleEdit(el) {
    dispatch(setEditName(el.name));
    dispatch(setEditDesc(el.description));
    dispatch(setIdx(el.id));
  }

  async function editUser() {
    dispatch(setLoading(true));
    const newUser = {
      name: editName,
      description: editDesc,
      id: idx,
    };

    try {
      await axiosGet.put(`/api/to-dos`, newUser, {
        header: { "Content-Type": "application/json" },
      });
      getTodo();
      dispatch(setEditDesc(""));
      dispatch(setEditName(""));
      dispatch(setLoading(false));
      dispatch(setError(false));
      handleToast("Todo updated successfully", "success");
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
      handleToast("Error editing todo", "error");
    }
  }

  async function handleInfo(el) {
    dispatch(setLoading(true));
    dispatch(setModal(true));
    dispatch(setInfo(el));
    try {
      await axiosGet(`/api/to-dos/${el.id}`);
      getTodo();
      dispatch(setLoading(false));
      dispatch(setError(false));
    } catch (error) {
      console.error(error);
      dispatch(setError(true));
      dispatch(setLoading(false));
    }
  }

  async function handleDelImage(id) {
    try {
      await axios.delete(
        `https://to-dos-api.softclub.tj/api/to-dos/images/${id}`
      );
      getTodo();
      handleToast("Image deleted successfully", "success");
    } catch (error) {
      console.error(error);
      handleToast("Error deleting image", "error");
    }
  }

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <>
      <h1>pagecreate-async-thunk-todo</h1>

      {/* Add Todo Section */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          variant="outlined"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          variant="outlined"
        />
        <input
          type="file"
          onChange={(e) => dispatch(setImg(e.target.files[0]))}
          style={{ marginTop: "15px" }}
        />
        <Button onClick={handleAdd} variant="contained">
          Add Todo
        </Button>
      </Box>

      {/* Edit Todo Section */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Edit Name"
          value={editName}
          onChange={(e) => dispatch(setEditName(e.target.value))}
          variant="outlined"
        />
        <TextField
          label="Edit Description"
          value={editDesc}
          onChange={(e) => dispatch(setEditDesc(e.target.value))}
          variant="outlined"
        />
        <Button onClick={editUser} variant="contained">
          <EditIcon />
        </Button>
      </Box>

      {/* Todo Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo.map((el) => (
              <TableRow key={el.id}>
                {/*кардам ошибка дод eror 400  */}
                {/* <TableCell>
                  {todo.images?.map((image) => {
                    return (
                      <div key={image.id}>
                        src={`https://to-dos-api.softclub.tj/images/${image.imageName}`}
                      </div>
                    );
                  })}
                </TableCell> */}
                {/* дизайнш ба mui */}
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.description}</TableCell>
                <TableCell
                  sx={{
                    color: el.isCompleted ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {el.isCompleted ? "Completed" : "Inactive"}
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(el.id)}
                    color="error"
                    size="small"
                  >
                    <AutoDeleteIcon />
                  </Button>
                  <Button
                    onClick={() => handleCheck(el.id)}
                    color="primary"
                    size="small"
                  >
                    <CheckCircleOutlineIcon />
                  </Button>
                  <Button
                    onClick={() => handleEdit(el)}
                    color="secondary"
                    size="small"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => handleInfo(el)}
                    color="info"
                    size="small"
                  >
                    <InfoIcon />
                  </Button>
                  <Button onClick={() => handleAddImage(el)} size="small">
                    <ImageIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Loading Spinner */}
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
      )}

      {/* Error Message */}
      {error && <h3 style={{ textAlign: "center" }}>An error occurred!</h3>}

      {/* Modal for Info */}
      {modal && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: "0px",
            left: "0px",
          }}
        >
          <Box
            sx={{
              borderRadius: 2,
              p: 4,
              backgroundColor: "white",
              minWidth: 200,
              textAlign: "center",
            }}
          >
            <p>{info?.id}</p>
            <b>{info?.name}</b> <br />
            <b>{info?.description}</b>
            <br />
            <Button
              onClick={() => dispatch(setModal(false))}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </div>
      )}

      {/* Modal for Adding Image */}
      {modaladd && (
        <div
          style={{
            position: "absolute",
            top: "200px",
            left: "550px",
            backgroundColor: "skyblue",
            padding: "50px",
            borderRadius: "21px",
          }}
        >
          <form onSubmit={addIMAGE}>
            <input name="Images" type="file" style={{ marginBottom: "20px" }} />
            <Button type="submit" variant="contained" sx={{ marginRight: 1 }}>
              Add Image
            </Button>
            <Button
              onClick={() => dispatch(setmodaladd(false))}
              variant="outlined"
            >
              Cancel
            </Button>
          </form>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}
