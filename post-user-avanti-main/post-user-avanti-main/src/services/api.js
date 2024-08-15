import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export const getAllPosts = async () => {
    const response = await api.get("/posts");
    return response.data;
}

export const deletePost = async (id) => {
    const response = await api.delete(`/post/${id}`);
    return response.data;
}

export const savePost = async (data, token) => {
    const formData = new FormData();
    console.log(data)
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image);
    formData.append("userId", data.userId);

    const response = await api.post("/post", formData, {
        headers: {"Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        },
        
    });
    return response.data;
}

export const updatePost = async (post) => {
    const response = await api.put(`/post/${post.id}`, post);
    return response.data;
}

export const auth = async (email, password) => {
    const response = await api.post(`/login`, {email, password});
    return response.data;
}