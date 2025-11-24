import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import Layout from "../components/Layout";


const Home = lazy(() => import('../Pages/home'))
const Login = lazy(() => import('../Pages/login'))
const Register = lazy(() => import('../Pages/register'))
const Welcome = lazy(() => import('../Pages/welcome'))
const AdminRegister = lazy(() => import('../Pages/adminRegister'))
const Post = lazy(() => import('../Pages/Post'))
const MyPost = lazy(() => import('../Pages/MyPost'))

type RequireAuthProps = {children : ReactNode; roles?: string[]};

const RequireAuth = ({children, roles}: RequireAuthProps) => {
    // Implement authentication check logic here
    const {user, loading} = useAuth();

    if(loading) {
        return <div>User Loading...</div>;
    }

    if(!user) {
        return <Navigate to="/login" replace />;
    }

    if(roles && roles.some((role) => user.roles?.includes(role)) === false) {
      return<>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl p-6 shadow-sm w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
          <p className="text-sm text-red-600">You do not have permission to view this page.</p>
        </div>
      </div>
      </>
    }


    return <>{children}</>;
}


export default function App() {
    return (
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={ <Welcome/> } />
              
              <Route path='/register' element={ <Register/> } />
              <Route path='/login' element={ <Login/> } />

              <Route element={<RequireAuth><Layout /></RequireAuth>}>
                <Route path='/home' element={<Home/>} />
                <Route path='/post' element={ <Post/> } />
                <Route path='/myposts' element={ <RequireAuth roles={["ADMIN","AUTHOR"]}><MyPost /></RequireAuth> } />
              </Route>

              <Route path='/admin/register' element={ <AdminRegister/> } />
            </Routes>
          </Suspense>
          </BrowserRouter>
    )
}