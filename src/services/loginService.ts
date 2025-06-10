
export interface LoginResponse {
  success: boolean
  data: string | {
    id: number
    name: string
    mail: string
    username: string
    token: string
  }
}

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  const formData = new FormData()
  formData.append("token", import.meta.env.VITE_INITIAL_TOKEN)
  formData.append("device", import.meta.env.VITE_LOGIN_DEVICE)
  formData.append("username", username)
  formData.append("password", password)

  const response = await fetch(import.meta.env.VITE_API_BASE_URL, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Network error")
  }

  const data = await response.json()
  return data as LoginResponse
}
