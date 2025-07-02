import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
          },
        }}
      />
    </>
  )
}
export default App
