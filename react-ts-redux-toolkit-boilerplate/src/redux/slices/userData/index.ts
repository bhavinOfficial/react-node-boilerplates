import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  [key: string]: any;
}

// Define the state structure
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchData: "";
}

// create action
export const createUser = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>("createUser", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://68332fc9c3f2222a8cb536f1.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

//read action
export const showUsers = createAsyncThunk(
  "showUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://68332fc9c3f2222a8cb536f1.mockapi.io/crud"
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete action
export const deleteUser = createAsyncThunk(
  "deleteUsers",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://68332fc9c3f2222a8cb536f1.mockapi.io/crud/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update action
export const updateUser = createAsyncThunk(
  "updateUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://68332fc9c3f2222a8cb536f1.mockapi.io/crud/${data?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: "",
  } as UserState,
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builer) => {
    builer
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message ?? "Unknown error occurred";
      })
      .addCase(showUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showUsers.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message ?? "Unknown error occurred";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const { id } = action.payload;

        if (id) {
          state.users = state.users.filter((user) => user.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message ?? "Unknown error occurred";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message ?? "Unknown error occurred";
      });
  },
});

export const { searchUser } = userDetailSlice.actions;
export default userDetailSlice.reducer;
